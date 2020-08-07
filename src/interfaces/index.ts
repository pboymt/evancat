export * from './dingtalk-request';
export * from './dingtalk-response';

export interface IConfig {
    development: boolean;
    agent_id: string;
    app_key: string;
    app_secret: string;
    webhook: string;
    access_token: string;
    start_notice: boolean;
    outer_url: string;
    static_path: string;
}
