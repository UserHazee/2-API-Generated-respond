export async function createHusbandGram(prompt) {
    try {
        // Create a better system prompt that removes meta-commentary
        const systemPrompt = `You are a creative writer creating intimate voice messages for a wife from her husband. 

RULES:
- Never include meta-commentary or explanations about the genre or prompt
- Never use words like "blushed" or actions in asterisks or brackets
- Write in first person as the husband speaking directly to his wife
- Be natural, conversational, and emotionally authentic
- Match the requested genre and spice level
- Keep responses under 200 words for voice delivery

Generate a ${prompt.spicy ? "flirty and romantic" : "sweet and loving"} ${prompt.genre} message about: ${prompt.question}`;

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
                        role: "system",
                        content: "You are a husband writing intimate voice messages to your wife. Write naturally and emotionally, never include meta-commentary, explanations, or stage directions. Always write in first person as the husband speaking."
                    },
                    {
                        role: "user",
                        content: systemPrompt
                    }
                ],
                temperature: 0.8, // Add some creativity
                max_tokens: 300   // Limit length for voice
            }),
        });

        const data = await response.json();
        console.log('Groq response:', data);

        if (!response.ok) {
            return `Groq API Error: ${data?.error?.message}`;
        }

        let content = data.choices?.[0]?.message?.content || "No response from Groq.";
        
        // Clean up any remaining unwanted elements
        content = content
            .replace(/\*[^*]*\*/g, '') // Remove anything in asterisks
            .replace(/\([^)]*\)/g, '')  // Remove anything in parentheses
            .replace(/\[[^\]]*\]/g, '') // Remove anything in brackets
            .replace(/It seems like.*?However,?\s*/gi, '') // Remove meta-commentary
            .replace(/The question.*?genre\.?\s*/gi, '')
            .replace(/\*\*.*?\*\*/g, '') // Remove bold markdown
            .trim();

        return content;
    } catch (error) {
        console.error('Groq error:', error);
        return "Error talking to Groq.";
    }
}
export async function speakWithElevenLabs(text) {
    try {
        console.log('Starting TTS request...');
        const startTime = Date.now();

        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
            method: 'POST',
            headers: {
                'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'audio/mpeg'
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_flash_v2_5',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                },
                optimize_streaming_latency: 4  // Try max optimization
            })
        });

        const fetchTime = Date.now();
        console.log(`Fetch completed in: ${fetchTime - startTime}ms`);

        if (!response.ok) {
            console.error('ElevenLabs response failed:', await response.text());
            return;
        }

        const blob = await response.blob();
        const blobTime = Date.now();
        console.log(`Blob created in: ${blobTime - fetchTime}ms`);

        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        
        audio.addEventListener('canplaythrough', () => {
            const readyTime = Date.now();
            console.log(`Audio ready in: ${readyTime - blobTime}ms`);
            console.log(`Total time: ${readyTime - startTime}ms`);
        });
        
        audio.play();
    } catch (error) {
        console.error('ElevenLabs error:', error);
    }
    
}

