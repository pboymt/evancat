import { join } from "path";
import { resolve } from "url";
import { config } from '../../config';
export function static_file(name: string) {
    return join(__dirname, '../../../statics', name);
}

export function static_url(path: string) {
    return resolve(config.outer_url, join(config.static_path, path));
}