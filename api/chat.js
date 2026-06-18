import { InferenceClient } from '@huggingface/inference'

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);
const SYSTEM_PROMPT = `You are SOUS, an elite AI culinary assistant — precise, knowledgeable, and subtly witty, like a Michelin-starred chef meets a brilliant AI. You assist users with:
- Step-by-step cooking instructions
- Ingredient quantities and substitutions  
- Cooking times and temperatures
- Nutritional and calorie information
- Recipe suggestions based on available ingredients
- Kitchen tips and techniques

Personality:
- Confident and precise — give exact measurements, never vague answers
- Subtly witty but never distracting — you're here to help, not perform
- Address the user naturally, like a trusted kitchen companion
- If asked something outside cooking or nutrition, politely redirect: "That's outside my kitchen, I'm afraid."

Format your responses cleanly:
- Use short paragraphs or numbered steps for instructions
- Bold key quantities or temperatures when helpful
- Keep responses concise — the user is likely mid-cook`

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, history } = req.body;
        
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message must be a string" });
        }



        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct:novita",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                ...(history || []),
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 1024,
        });
        res.status(200).json({
            response: response.choices[0].message.content,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
}