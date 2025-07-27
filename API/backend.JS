export default async function handler(req, res) {
  // السماح بالوصول من أي دومين
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  // لو طريقة الطلب غير POST نوقفه
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // المفتاح من Environment Variables
  const apiKey = process.env.OPENROUTER_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not found!" });
  }

  try {
    // البيانات اللي جاية من الـ Frontend
    const input = req.body;

    // الطلب لـ OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Error calling OpenRouter API", details: err.message });
  }
}