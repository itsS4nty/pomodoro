import fs from 'fs';
import path from 'path';
import { Config } from '../types/config';

export class Database {
    private readonly configFile: string = 'config.json';
    private readonly configPath: string = path.join(__dirname + '/data/' + this.configFile);
    private readonly initialConfig: Config = {
        workPhaseSeconds: 25 * 60,
        breakPhaseSeconds: 5 * 60,
        longBreakPhaseSeconds: 10 * 60,
        counterToLongPhase: 4,
        targetPerDay: 10,
    };

    constructor() {
        this.init();
    }

    getConfig(): Config {
        try {
            const _data = fs.readFileSync(this.configPath, 'utf-8');
            if(!_data)
                throw new Error('No config file found');

            return JSON.parse(_data) as Config;
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    private init() {
        if(fs.existsSync(this.configPath))
            return;

        const _configDirectory = path.dirname(this.configPath);
        fs.mkdirSync(_configDirectory, { recursive: true });
        fs.writeFileSync(this.configPath, JSON.stringify(this.initialConfig));
    }

}
