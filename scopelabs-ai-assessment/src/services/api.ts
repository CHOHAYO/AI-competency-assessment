
export interface AssessmentResult {
  userInfo: {
    name: string;
    email: string;
    affiliation?: string | null;
    job?: string | null;
    task?: string | null;
    industry?: string | null;
    age?: string | null;
    marketing?: boolean;
  };
  answers: Record<number, number>;
  categoryScores: {
    category: string;
    score: number;
    raw: number;
    fullMark: number;
  }[];
  totalScore: number;
  level: string;
  timestamp: string;
}

// Mock API service for saving assessment results
export const saveAssessmentResult = async (data: AssessmentResult): Promise<{ success: boolean; id?: string }> => {
  console.log('Saving assessment result to database...', data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real application, this would be a POST request to your backend
  // const response = await fetch('/api/assessments', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
  // return response.json();

  return { success: true, id: 'mock-id-' + Date.now() };
};
