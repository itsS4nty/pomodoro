import { Ipc } from './providers/ipc';

export class MainService {
    ipcService = new Ipc();

    constructor() {
        this.init();
    }

    init() {
        this.ipcService.initIpc();
    }
}
