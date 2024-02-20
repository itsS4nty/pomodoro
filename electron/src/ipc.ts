import { Database } from './database/db';
import { validateSchemaSafe } from './lib/schemas';
import { Config } from './types/config';

export class Ipc {
    private ipcMain: Electron.IpcMain;
    private db: Database;

    constructor(ipcMain: Electron.IpcMain, db: Database) {
        if (!ipcMain) throw new Error('No ipcMain');
        if (!db) throw new Error('No database');

        this.ipcMain = ipcMain;
        this.db = db;
    }

    async init() {
        this.loadListeners();
    }

    private loadListeners() {
        this.ipcMain.on('get-config', e => {
            const _data = this.db.getConfig();
            e.sender.send('get-config-response', _data);
        });
        this.ipcMain.on('update-config', (e, data) => {
            const _config = validateSchemaSafe<Config>('UpdateConfig', data);
            if(!_config) {
                e.sender.send('update-config-response', false);
                return;
            }
            const _res = this.db.updateConfig(_config);
            e.sender.send('update-config-response', _res);
        });
    }
}