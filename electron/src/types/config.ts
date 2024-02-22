export type Pomodoro = {
    id: number;
    name: string;
    sub: {
        name: string;
        completed: boolean;
    }[];
    deleteWhenFinished: boolean;
    completed: boolean;
    createdAt: number;
    modifiedAt: number;
};

export type Config = {
    workPhaseSeconds: number;
    breakPhaseSeconds: number;
    longBreakPhaseSeconds: number;
    counterToLongPhase: number;
    launchAtStartup: boolean;
};
