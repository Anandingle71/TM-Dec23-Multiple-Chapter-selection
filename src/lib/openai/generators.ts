// Previous imports remain the same...

export async function generateAssessment(data: AssessmentFormData & {
  topic: string;
  subject: string;
  grade: string;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an expert assessment creator who follows CBSE and NCERT guidelines meticulously. You understand:
- CBSE's assessment framework and learning outcomes
- Bloom's Taxonomy and its application in question design
- Different cognitive levels and question types
- NCERT's subject-specific guidelines and sample papers`
      },
      {
        role: "user",
        content: `Create a comprehensive assessment following CBSE guidelines for:

Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Duration: ${data.duration}
Total Marks: ${data.totalMarks}
Section Types: ${data.sectionTypes.join(', ')}

Structure the assessment as follows:

1. General Instructions:
   - Time allowed and maximum marks
   - Section-wise breakdown
   - Important instructions for students

2. For each section:
   - Clear section heading with marks allocation
   - Mix of questions covering different cognitive levels
   - Progressive difficulty within each section
   - Questions aligned with NCERT learning outcomes

3. Question Design:
   - Clear, unambiguous language
   - Proper marking scheme for each question
   - Mix of objective and subjective questions
   - Application-based and HOTS questions as per CBSE pattern

${data.includeRubric ? `4. Detailed Marking Scheme:
   - Step-wise marks allocation
   - Alternative answers where applicable
   - Common errors and their penalty
   - Scoring rubric for subjective questions` : ''}

Additional Instructions: ${data.additionalInstructions}

Follow CBSE's latest assessment pattern and ensure questions test conceptual understanding, not just recall.`
      }
    ],
    temperature: 0.7,
    max_tokens: 2500
  });

  return response.choices[0].message.content;
}

// Other generator functions remain the same...