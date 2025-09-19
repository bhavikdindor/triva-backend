import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Vercel me Environment Variable set karna hoga
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message } = req.body;

      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      const reply = response.choices[0].message.content;
      res.status(200).json({ reply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(200).json({ message: "✅ Triva backend live hai!" });
  }
}