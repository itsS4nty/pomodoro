export const eventsOn = ['get-config-response', 'get-update'] as const;
export type EventsOn = typeof eventsOn[number];

export const eventsSend = ['get-config'] as const;
export type EventsSend = typeof eventsSend[number];