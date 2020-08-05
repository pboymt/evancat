import Express, { json } from 'express';
import { IDingTalkResponse, IConfig, IDingTalkRequestHeader, IDingTalkRequestBody } from './interface';
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { verify_service_factory } from './auth';
import { switch_response } from './response';

const config_path = join(__dirname, '../config.json');
if (!existsSync(config_path)) {
    console.log('没找到配置文件');
    process.exit();
}

const config: IConfig = JSON.parse(readFileSync(config_path, 'utf-8'));

const verify_request = verify_service_factory(config.app_secret);

const app = Express();

app.use(json());

app.all('/', (req, res) => {
    res.send('Hello bot');
});

app.post('/bot', async (req, res) => {
    console.log('收到消息');
    const header: IDingTalkRequestHeader = req.headers;
    // console.log(req.headers);
    if (verify_request(header.timestamp ?? '', header.sign ?? '')) {
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

app.listen(3720, () => {
    console.log('listening...');
});