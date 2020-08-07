import Axios from "axios";
import Express, { json } from 'express';
import { readFileSync } from "fs";
import { join } from "path";
import { verify_service_factory, webhook_sign_factory } from './auth';
import { config, init_config } from './config';
import { IDingTalkRequestBody, IDingTalkRequestHeader, IDingTalkResponse } from './interfaces';
import { switch_response } from './response';

Axios.defaults.timeout = 6000;

init_config(join(__dirname, '../config.json'));

const verify_request = verify_service_factory(config.app_secret);
const webhook_sign = webhook_sign_factory(config.app_secret);

const app = Express();

app.use(json());

app.all('/', (req, res) => {
    res.send('Hello bot');
});

app.post('/bot', async (req, res) => {
    console.log('收到消息');
    const header: IDingTalkRequestHeader = req.headers;
    // console.log(req.headers);
    if (config.development || verify_request(header.timestamp ?? '', header.sign ?? '')) {
        const body: IDingTalkRequestBody = req.body;
        console.log(`${body.senderNick} 从 ${body.conversationType === '1' ? '私信' : body.conversationTitle} 发来消息 “${body.text.content}”`)
        const dingRes: IDingTalkResponse = await switch_response(body);
        res.send(dingRes);
    } else {
        const dingRes: IDingTalkResponse = {
            msgtype: 'text',
            text: {
                content: '非法请求！'
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        }
        res.send(dingRes);
    }

});

app.use('/static', Express.static(join(__dirname, '../statics')));

app.listen(3720, () => {
    console.log('listening...');
    if (config.start_notice) {
        const url = new URL(config.webhook);
        const sign = webhook_sign();
        url.searchParams.append('timestamp', sign.timestamp.toString());
        url.searchParams.append('sign', sign.sign);
        Axios.post(url.toString(), {
            "msgtype": "markdown",
            "markdown": {
                "title": "启动通知",
                "text": readFileSync(join(__dirname, '../statics/changelogs.md'), 'utf8')
            },
            "at": {
                "atMobiles": [],
                "isAtAll": false
            }
        })
    }
});