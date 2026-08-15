export const generateAITravelPlan = async (userPrompt, countryName = '') => {
  const response = await fetch('/api/ai/travel-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: userPrompt, countryName })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'AI service is unavailable.');
  return { isLive: true, content: data.content || '' };
};
