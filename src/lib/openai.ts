import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateAIResponse = async (prompt: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI counselor trained to provide emotional support to survivors of domestic violence. Respond with empathy, validation, and encouragement while maintaining appropriate boundaries and never giving direct advice that could put someone in danger."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || "I'm here to support you.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm here to listen and support you. Would you like to share more about how you're feeling?";
  }
};