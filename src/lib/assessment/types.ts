export interface AssessmentSection {
  name: string;
  marks: number;
  questionTypes: string[];
  learningOutcomes: string[];
  competencyLevels: string[];
}

export interface AssessmentMetadata {
  blueprint: {
    sections: AssessmentSection[];
    totalMarks: number;
    duration: string;
  };
  learningOutcomes: string[];
  competencies: string[];
  markingScheme: Record<string, any>;
  rubrics?: Record<string, any>;
}

export interface CBSEGuidelines {
  competencyLevels: string[];
  questionTypes: string[];
  markDistribution: Record<string, number>;
}