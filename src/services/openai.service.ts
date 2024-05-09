import * as openai from 'openai';
import axios from 'axios';

const openaiClient = new openai.OpenAiApi('OPENAI_API_KEY');

export async function analyzeEmailContent(emailContent: string): Promise<string>  {
  try {
    const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
            prompt: emailContent,
            max_tokens: 100,
            temperature: 0.7,
            top_p: 1,
            stop: ['\n', 'Email:', 'Subject:', '>'] // Stop tokens to end the completion
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        }
    );
    return response.data.choices[0].text.trim();
} catch (error) {
    console.error('Error analyzing email content:', error);
    return '';
}
}

export async function generateReplies(emailContent: string):Promise<string[]> {
  const replies: string[] = [];
  for (const email of emails) {
      const reply = await analyzeEmailContent(email);
      replies.push(reply);
  }
  return replies;
}
