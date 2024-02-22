import fs from 'fs';
import path from 'path';
import { Config, Work } from '../types/config';

export class Database {
    private readonly configFile: string = 'config.json';
    private readonly configPath: string = path.join(__dirname + '/data/' + this.configFile);
    private readonly worksFile: string = 'works.json';
    private readonly worksPath: string = path.join(__dirname + '/data/' + this.worksFile);
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

    getWorks(): Work[] {
        try {
            const _data = fs.readFileSync(this.worksPath, 'utf-8');
            if(!_data) return [];

            const _works = JSON.parse(_data) as Work[];
            return _works.filter(w => !w.completed);
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    addWorks(work: Work): boolean {
        work.id = this.generateId();
        work.completed = false;
        work.sub.map(sw => ({ ...sw, completed: false }));
        const now = new Date();
        work.createdAt = now.getTime();
        work.modifiedAt = now.getTime();
        try {
            this.createDirIfNotExists(this.worksPath, this.worksFile);
            const works = this.getWorks();
            works.push(work);
            this.writeFile(this.worksPath, works);
            return true;
        } catch (err: unknown) {
            let msg = 'Unknown error';
            if(err instanceof Error) msg = err.message;
            throw new Error(`Error: ${msg}`);
        }
    }

    updateWork(work: Work) {
        work.modifiedAt = new Date().getTime();
        try {
            const works = this.getWorks();
            const indexToUpdate = works.findIndex(w => w.id === work.id);
            if(!indexToUpdate || indexToUpdate === -1) throw new Error('Work not found');
            works[indexToUpdate] = work;
            this.writeFile(this.worksPath, works);
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
