import { generateContent } from './base';
import type { QuizFormData } from '../../../types/forms';

export async function generateQuiz(data: QuizFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  const messages = [
    {
      role: "system" as const,
      content: "You are an expert teacher creating educational quizzes following NCERT guidelines and NCF2023."
    },
    {
      role: "user" as const,
      content: `Create a quiz with:
Topic: ${data.topic}
Subject: ${data.subject}
Grade: ${data.grade}
Questions: ${data.questionCount}
Difficulty: ${data.difficultyLevel}
Taxonomy: ${data.taxonomyType}
Levels: ${data.taxonomyLevels.join(', ')}

Format:
1. Clear questions
2. Four options (A-D)
3. Correct answer
4. Brief explanation
5. Taxonomy level`
    }
  ];

  return generateContent(messages, {
    temperature: 0.7,
    maxTokens: 2000
  });
}