import Express from 'express';
import { IDingTalkResponse } from './interface';

const app = Express();

app.all('/', (req, res) => {
    res.send('Hello bot');
});

app.post('/bot', (req, res) => {
    console.log(req.body);
    const dingRes: IDingTalkResponse = {
        msgtype: 'text',
        text: {
            content: '我收到了！'
        },
        at: {
            atMobiles: [],
            isAtAll: false
        }
    }
    res.send(dingRes);
});

app.listen(3720, () => {
    console.log('listening...');
});