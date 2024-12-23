export const SUBJECTS = ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi', 'Sanskrit'] as const;

export const GRADES = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'] as const;

export const ROLES = ['Teacher', 'Principal', 'Administrator'] as const;

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'] as const;

export const TAXONOMY_TYPES = ['Bloom\'s Taxonomy', 'Depth of Knowledge (DOK)'] as const;

export const BLOOMS_LEVELS = [
  'Remember',
  'Understand',
  'Apply',
  'Analyze',
  'Evaluate',
  'Create'
] as const;

export const DOK_LEVELS = [
  'Recall',
  'Skill/Concept',
  'Strategic Thinking',
  'Extended Thinking'
] as const;

export const LESSON_DURATIONS = [
  '30 minutes',
  '45 minutes',
  '60 minutes',
  '90 minutes'
] as const;

export const LEARNING_STYLES = {
  visual: 'Visual',
  auditory: 'Auditory',
  kinesthetic: 'Kinesthetic'
} as const;

export type Subject = typeof SUBJECTS[number];
export type Grade = typeof GRADES[number];
export type Role = typeof ROLES[number];
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];
export type TaxonomyType = typeof TAXONOMY_TYPES[number];
export type BloomsLevel = typeof BLOOMS_LEVELS[number];
export type DOKLevel = typeof DOK_LEVELS[number];
export type LessonDuration = typeof LESSON_DURATIONS[number];
export type LearningStyle = typeof LEARNING_STYLES[keyof typeof LEARNING_STYLES];