export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {
const { message } = req.body || {};

if (!message) {  
  return res.status(400).json({ error: "Message is required" });  
}  

const response = await fetch("https://api.openai.com/v1/responses", {  
  method: "POST",  
  headers: {  
    "Content-Type": "application/json",  
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`  
  },  
  body: JSON.stringify({  
    model: "gpt-6-luna",  
    instructions:  
      "You are TITAN, a helpful AI voice assistant. Reply in the same language as the user. If the user speaks Bangla, reply in Bangla. If English, reply in English. Keep answers clear and concise.",  
    input: message,  
    reasoning: { effort: "low" }  
  })  
});  

const data = await response.json();  

if (!response.ok) {  
  return res.status(response.status).json({  
    error: data.error?.message || "OpenAI API error"  
  });  
}  

// The raw REST response has no `output_text` field (only the SDKs add it),  
// so collect the text from the output array ourselves.  
const reply =  
  data.output_text ||  
  (data.output || [])  
    .flatMap((item) => item.content || [])  
    .filter((part) => part.type === "output_text")  
    .map((part) => part.text)  
    .join("")  
    .trim();  

return res.status(200).json({ reply });

} catch (error) {
return res.status(500).json({ error: "Server error" });
}
}
