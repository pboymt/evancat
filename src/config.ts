import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { IConfig } from "./interfaces";

export let config: IConfig;

export function init_config(config_path: string = join(__dirname, '../config.json')) {
    if (!existsSync(config_path)) {
        console.log('没找到配置文件');
        process.exit();
    } else {
        config = JSON.parse(readFileSync(config_path, 'utf-8'));
    }
}