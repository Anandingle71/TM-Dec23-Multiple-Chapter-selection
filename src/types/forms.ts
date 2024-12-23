export interface LessonPlanFormData {
  duration: string;
  learningStyles: string[];
  objectives: string;
  additionalInstructions: string;
}

export interface QuizFormData {
  questionCount: number;
  difficultyLevel: string;
  taxonomyType: string;
  taxonomyLevels: string[];
  additionalInstructions: string;
}

export interface WorksheetFormData {
  questionTypes: string[];
  difficultyLevel: string;
  includeAnswerKey: boolean;
  additionalInstructions: string;
}

export interface PresentationFormData {
  slideCount: number;
  visualPreference: string;
  includeActivities: boolean;
  includeAssessment: boolean;
  additionalInstructions: string;
}

export interface AssessmentFormData {
  duration: string;
  totalMarks: number;
  sectionTypes: string[];
  includeRubric: boolean;
  additionalInstructions: string;
}