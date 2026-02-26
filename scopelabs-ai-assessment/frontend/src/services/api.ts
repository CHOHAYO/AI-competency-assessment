const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export interface UserInfo {
  name: string;
  email: string;
  affiliation?: string | null;
  job?: string | null;
  task?: string | null;
  industry?: string | null;
  age?: string | null;
  marketing?: boolean;
}

export const saveAssessment = async (data: { userInfo: UserInfo, answers: Record<string, number>, result_data: any }): Promise<{ success: boolean; session_id: string; data: any }> => {
  const response = await fetch(`${API_BASE_URL}/diagnosis/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save assessment');
  }

  return response.json();
};
