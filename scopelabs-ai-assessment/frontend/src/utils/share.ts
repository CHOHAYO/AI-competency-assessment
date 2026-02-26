import { AssessmentState, SharedData, UserInfo } from '../context/AssessmentContext';

// Only encode necessary data to keep URL short
interface UrlData {
  n: string; // name
  a: Record<number, number>; // answers
}

export const encodeData = (userInfo: UserInfo, answers: Record<number, number>): string => {
  const data: UrlData = {
    n: userInfo.name,
    a: answers
  };

  try {
    const jsonString = JSON.stringify(data);
    // Base64 encode the URI component encoded string (handles Korean)
    const base64Data = btoa(encodeURIComponent(jsonString));
    // URL encode the Base64 string so characters like +, /, = are safe in the query string
    return encodeURIComponent(base64Data);
  } catch (e) {
    console.error('Failed to encode data', e);
    return '';
  }
};

export const decodeData = (encoded: string): SharedData | null => {
  try {
    // Decode the URL encoded Base64 string first
    const base64Data = decodeURIComponent(encoded);
    // Decode Base64 back to URI component encoded string
    const jsonString = decodeURIComponent(atob(base64Data));

    const data: UrlData = JSON.parse(jsonString);

    return {
      userInfo: {
        name: data.n,
        email: '',
        // Add default values for required fields
      } as UserInfo,
      answers: data.a
    };
  } catch (e) {
    console.error('Failed to decode data', e);
    return null;
  }
};
