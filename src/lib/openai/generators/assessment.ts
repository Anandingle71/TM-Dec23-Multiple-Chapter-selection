import { generateContent } from './base';
import type { AssessmentFormData } from '../../../types/forms';

export async function generateAssessment(data: AssessmentFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  // Generate sections in parallel for better performance
  const [questions, rubric] = await Promise.all([
    generateContent([
      {
        role: "system",
        content: "You are an expert assessment creator following CBSE guidelines."
      },
      {
        role: "user",
        content: `Create assessment questions for:
Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Duration: ${data.duration}
Total Marks: ${data.totalMarks}
Sections: ${data.sectionTypes.join(', ')}`
      }
    ], {
      temperature: 0.7,
      maxTokens: 2000
    }),

    data.includeRubric ? generateContent([
      {
        role: "system",
        content: "Create detailed assessment rubrics following CBSE guidelines."
      },
      {
        role: "user",
        content: `Create marking rubric for:
Topic: ${data.topic}
Sections: ${data.sectionTypes.join(', ')}
Include:
1. Marking criteria
2. Common errors
3. Partial marking guidelines`
      }
    ], {
      temperature: 0.7,
      maxTokens: 1000
    }) : Promise.resolve('')
  ]);

  return [
    questions,
    data.includeRubric ? '\n\nMARKING RUBRIC\n==============\n' + rubric : ''
  ].join('\n');
}