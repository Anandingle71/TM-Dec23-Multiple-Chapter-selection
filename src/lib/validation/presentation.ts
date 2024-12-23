import { z } from 'zod';

export const presentationSchema = z.object({
  slideCount: z.number()
    .min(5, 'Minimum 5 slides required')
    .max(30, 'Maximum 30 slides allowed'),
  visualPreference: z.enum(['Text-Heavy', 'Balanced', 'Visual-Heavy']),
  includeActivities: z.boolean(),
  includeAssessment: z.boolean(),
  additionalInstructions: z.string().optional()
});