export const getAssessmentPrompt = (data: {
  subject: string;
  grade: string;
  chapter: string;
  duration: string;
  sections: any[];
  isFullSyllabus: boolean;
  includeRubric: boolean;
  includeSolutions: boolean;
  additionalInstructions: string;
}) => `Create a complete CBSE ${data.subject} assessment for Grade ${data.grade} ${
  data.isFullSyllabus ? '(Full Syllabus)' : `covering ${data.chapter}`
}.

Assessment Structure:
Duration: ${data.duration}
${data.sections.map(section => `
Section ${section.name}: ${section.type}
- Number of questions: ${section.questionCount}
- Marks per question: ${section.marks / section.questionCount}
- Total marks: ${section.marks}
`).join('\n')}

Requirements:
1. Generate COMPLETE questions with all necessary information
2. Include competency-based questions following NCF 2023
3. Focus on real-world applications and critical thinking
4. Cover multiple cognitive levels as per CBSE guidelines
5. Ensure progressive difficulty within each section

For each question:
1. Clear, unambiguous language
2. Complete information and data
3. Proper marking scheme
4. Learning outcome being assessed
5. Competency being evaluated
${data.includeSolutions ? '6. Detailed step-by-step solution' : ''}

${data.includeRubric ? `
Include detailed rubrics with:
1. Marking criteria for each question type
2. Common errors and misconceptions
3. Alternative approaches where applicable
4. Guidelines for partial marking` : ''}

Additional Instructions:
${data.additionalInstructions}

Format the output as follows:

GENERAL INSTRUCTIONS
-------------------
[Include standard CBSE instructions]

QUESTION PAPER
-------------
[Organize questions by sections]

${data.includeRubric ? `
MARKING SCHEME
-------------
[Detailed marking scheme]

EVALUATION RUBRICS
-----------------
[Detailed evaluation criteria]
` : ''}

${data.includeSolutions ? `
COMPLETE SOLUTIONS
-----------------
[Step-by-step solutions for all questions]
` : ''}

CRITICAL: Generate actual, complete questions - NO templates or placeholders.`;