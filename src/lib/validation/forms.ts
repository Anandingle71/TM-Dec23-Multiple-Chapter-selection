import { z } from 'zod';

export const lessonPlanSchema = z.object({
  duration: z.string().min(1, 'Duration is required'),
  learningStyles: z.array(z.string()).min(1, 'Select at least one learning style'),
  objectives: z.string().min(10, 'Learning objectives are required'),
  additionalInstructions: z.string().optional()
});

export const quizSchema = z.object({
  questionCount: z.number().min(1).max(50),
  difficultyLevel: z.string(),
  taxonomyType: z.string(),
  taxonomyLevels: z.array(z.string()).min(1),
  additionalInstructions: z.string().optional()
});

export const assessmentSchema = z.object({
  duration: z.string(),
  totalMarks: z.number().min(10).max(100),
  sectionTypes: z.array(z.string()).min(1),
  includeRubric: z.boolean(),
  additionalInstructions: z.string().optional()
});