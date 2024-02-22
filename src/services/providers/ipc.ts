import { EventsOn, EventsSend, eventsOn } from '../../config/events';

export interface IIpc {
    onEventReceived?(event: EventsOn, data: unknown): void;
}

export class Ipc {
    private subscribers: IIpc[] = [];

    initIpc = () => {
        this.loadListeners();
    };

    send = (channel: EventsSend, data?: unknown) => {
        window.ipcRenderer.send(channel, data);
    };

    private loadListeners = () => {
        eventsOn.forEach(event => {
            window.ipcRenderer.on(event, (_, data: unknown) => {
                this.publishOnEventReceived(event, data);
            });
        });
    };

    subscribeToEvents = (callback: IIpc): void => {
        this.subscribers.push(callback);
    };

    unsubscribeToEvents = (callback: IIpc): void => {
        const index = this.subscribers.indexOf(callback);
        if(index !== -1) this.subscribers.splice(index, 1);
    };

    protected publishOnEventReceived = (event: EventsOn, data: unknown) => {
        this.subscribers.forEach(listener => listener.onEventReceived?.(event, data));
    };
}
