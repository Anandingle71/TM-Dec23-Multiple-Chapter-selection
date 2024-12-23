import { CBSE_GUIDELINES, QUESTION_TYPE_MARKS } from './constants';
import type { AssessmentSection } from './types';

export function generateBlueprint(totalMarks: number, sectionTypes: string[]): AssessmentSection[] {
  const sections: AssessmentSection[] = [];
  let remainingMarks = totalMarks;

  // Distribute marks according to CBSE guidelines
  sectionTypes.forEach((type, index) => {
    const questionMark = QUESTION_TYPE_MARKS[type] || 1;
    const sectionMarks = index === sectionTypes.length - 1 
      ? remainingMarks 
      : Math.floor(totalMarks / sectionTypes.length);
    
    remainingMarks -= sectionMarks;

    sections.push({
      name: `Section ${String.fromCharCode(65 + index)}`,
      type,
      marks: sectionMarks,
      questionCount: Math.ceil(sectionMarks / questionMark),
      competencyLevels: CBSE_GUIDELINES.competencyLevels
    });
  });

  return sections;
}