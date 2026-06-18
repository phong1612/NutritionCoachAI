import { InferenceClient } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe, but make sure to include the calorie for each ingredient you use. The recipe can include additional ingredients they didn't mention, but don't include too many extra ingredients. And make sure to provide the total calorie count for the entire recipe. Format your response in markdown to make it easier to render to a web page.`

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { ingredients } = req.body;
        
        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({ error: "Ingredients must be an array" });
        }

        const ingredientsStr = ingredients.join(", ");

        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct:novita",
            messages: [
                {role: "system", content: SYSTEM_PROMPT},
                {role: "user", content: `I have ${ingredientsStr}. Please give me a recipe you'd recommend I make!`},
            ],
            max_tokens: 1024,
        });
        res.status(200).json({
            recipe: response.choices[0].message.content,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
}