import { Database } from './database/db';

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
    }
}
