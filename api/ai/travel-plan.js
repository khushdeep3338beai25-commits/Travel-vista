import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');

    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      error:
        'AI is not configured. Add GEMINI_API_KEY on Vercel.',
    });
  }

  const body =
    typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : req.body || {};

  const {
    prompt,
    countryName = '',
  } = body;

  if (typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({
      error: 'A travel prompt is required.',
    });
  }

  if (prompt.length > 4000) {
    return res.status(413).json({
      error: 'Prompt is too long.',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const instruction = `
You are TravelVista AI, a careful travel planning assistant.

User request: ${prompt.trim()}
${countryName ? `Focus country: ${countryName}` : ''}

Provide practical, clearly labelled itinerary ideas, food
suggestions, etiquette, transport notes, budget ranges, and
best-time guidance.

Do not invent live prices, availability, closures, or safety
conditions. Clearly identify information requiring current
verification.
    `.trim();

    const result = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: instruction,
    });

    return res.status(200).json({
      content: result.text || '',
    });
  } catch (error) {
    console.error('Gemini request failed:', error);

    return res.status(502).json({
      error: 'The AI provider could not complete the request.',
    });
  }
}