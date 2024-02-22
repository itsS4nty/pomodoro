import fs from 'fs';
import path from 'path';
import { Config, Pomodoro } from '../types/config';

export class Database {
    private readonly configFile: string = 'config.json';
    private readonly configPath: string = path.join(__dirname + '/data/' + this.configFile);
    private readonly pomodorosFile: string = 'pomodoros.json';
    private readonly pomodorosPath: string = path.join(__dirname + '/data/' + this.pomodorosFile);
    private readonly initialConfig: Config = {
        workPhaseSeconds: 25 * 60,
        breakPhaseSeconds: 5 * 60,
        longBreakPhaseSeconds: 10 * 60,
        counterToLongPhase: 4,
        launchAtStartup: false,
    };

    constructor() {
        this.init();
    }

    getConfig(): Config {
        try {
            const _data = fs.readFileSync(this.configPath, 'utf-8');
            if(!_data) throw new Error('No config file found');

            return JSON.parse(_data) as Config;
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    updateConfig(config: Config): boolean {
        try {
            this.createDirIfNotExists(this.configPath, this.configFile);
            this.writeFile(this.configPath, config);
            return true;
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    getPomodoros(): Pomodoro[] {
        try {
            const _data = fs.readFileSync(this.pomodorosPath, 'utf-8');
            if(!_data) return [];

            const _pomodoros = JSON.parse(_data) as Pomodoro[];
            return _pomodoros.filter(w => !w.completed);
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    addPomodoros(work: Pomodoro): boolean {
        work.id = this.generateId();
        work.completed = false;
        work.sub.map(sw => ({ ...sw, completed: false }));
        const now = new Date();
        work.createdAt = now.getTime();
        work.modifiedAt = now.getTime();
        try {
            this.createDirIfNotExists(this.pomodorosPath, this.pomodorosFile);
            const pomodoros = this.getPomodoros();
            pomodoros.push(work);
            this.writeFile(this.pomodorosPath, pomodoros);
            return true;
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    updateWork(work: Pomodoro) {
        work.modifiedAt = new Date().getTime();
        try {
            const pomodoros = this.getPomodoros();
            const indexToUpdate = pomodoros.findIndex(w => w.id === work.id);
            if(!indexToUpdate || indexToUpdate === -1) throw new Error('Work not found');
            pomodoros[indexToUpdate] = work;
            this.writeFile(this.pomodorosPath, pomodoros);
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    private init() {
        if(fs.existsSync(this.configPath)) return;

        this.createDirIfNotExists(this.configPath, this.configFile);
        this.writeFile(this.configPath, this.initialConfig);
    }

    private createDirIfNotExists(_path: string, _directory: string) {
        if(fs.existsSync(_path)) return;
        const dir = path.dirname(_directory);
        fs.mkdirSync(dir, { recursive: true });
    }

    private writeFile(_path: string, data: unknown) {
        fs.writeFileSync(_path, JSON.stringify(data));
    }

    private generateId(): number {
        return new Date().getTime() * Math.random();
    }
}
