export const CBSE_GUIDELINES = {
  competencyLevels: [
    'Remembering',
    'Understanding',
    'Applying',
    'Analyzing',
    'Evaluating',
    'Creating'
  ],
  
  questionTypes: [
    'Multiple Choice Questions (MCQ)',
    'Case Study Questions',
    'Competency Based Questions',
    'Short Answer Questions (2 Marks)',
    'Short Answer Questions (3 Marks)',
    'Long Answer Questions (5 Marks)'
  ],

  markDistribution: {
    knowledge: 40,
    understanding: 25,
    application: 20,
    higherOrder: 15
  }
};

export const NCF_2023_COMPETENCIES = [
  'Critical Thinking and Problem Solving',
  'Creativity and Innovation',
  'Communication and Collaboration',
  'Information, Media, and Technology Skills',
  'Life and Career Skills',
  'Social and Cross-Cultural Skills',
  'Leadership and Responsibility'
];

export const ASSESSMENT_DURATIONS = [
  '1.5 Hours',
  '2 Hours',
  '3 Hours'
] as const;

export const QUESTION_TYPE_MARKS = {
  'Multiple Choice Questions (MCQ)': 1,
  'Case Study Questions': 4,
  'Competency Based Questions': 4,
  'Short Answer Questions (2 Marks)': 2,
  'Short Answer Questions (3 Marks)': 3,
  'Long Answer Questions (5 Marks)': 5
};

export const SAMPLE_COMPETENCIES = {
  mathematics: [
    'Problem Solving',
    'Reasoning and Proof',
    'Communication',
    'Connections',
    'Representation',
    'Visualization'
  ],
  science: [
    'Scientific Inquiry',
    'Scientific Reasoning',
    'Scientific Communication',
    'Experimental Skills',
    'Data Analysis',
    'Environmental Awareness'
  ],
  social_studies: [
    'Historical Thinking',
    'Geographic Analysis',
    'Civic Understanding',
    'Economic Reasoning',
    'Cultural Awareness',
    'Research Skills'
  ]
};