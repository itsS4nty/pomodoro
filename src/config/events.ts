export const eventsOn = ['get-config-response', 'get-update', 'update-config-response'] as const;
export type EventsOn = typeof eventsOn[number];

export const eventsSend = ['get-config', 'update-config'] as const;
export type EventsSend = typeof eventsSend[number];