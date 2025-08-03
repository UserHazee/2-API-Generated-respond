export async function createHusbandGram(prompt) {
    try {
      const promptText = `Genre: ${prompt.genre}\nQuestion: ${prompt.question}\nSpicy: ${prompt.spicy ? "Yes" : "No"}`;
      console.log("DEBUG prompt:", promptText);
  
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: promptText,
            }
          ]
        }),
      });
  
      const data = await response.json();
      console.log('Groq response:', data);
  
      if (!response.ok) {
        return `Groq API Error: ${data?.error?.message}`;
      }
  
      return data.choices?.[0]?.message?.content || "No response from Groq.";
    } catch (error) {
      console.error('Groq error:', error);
      return "Error talking to Groq.";
    }
  }
  