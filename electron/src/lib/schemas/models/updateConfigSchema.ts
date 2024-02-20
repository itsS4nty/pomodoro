import { z } from 'zod';

export const updateConfigSchema = z.object({
    workPhaseSeconds: z.number().nonnegative(),
    breakPhaseSeconds: z.number().nonnegative(),
    longBreakPhaseSeconds: z.number().nonnegative(),
    counterToLongPhase: z.number().nonnegative(),
    launchAtStartup: z.boolean(),
});
