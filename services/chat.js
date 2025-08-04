import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY
});


async function Text(msg, history) {
    try {
        // const response = await ai.models.generateContent({
        //     model: "gemini-2.5-flash",
        //     contents: msg
        // })

        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            history: [],
        });

        const response = await chat.sendMessage({
        message: msg,
        });
    
        return response.text
    } catch (error) {
        console.log('Err :', error);
        throw new Error("Chat bermasalah");
        
    }
}

async function TextWithMedia(msg, file) {
    try {
        const base64 = file.buffer.toString('base64')
        const body = [
            {text: msg},
            {inlineData:{ mimeType: file.mimetype, data: base64}}
        ]

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: body
        })
    
        return response.text
    } catch (error) {
        console.log('Err :', error);
        throw new Error("Chat dengan media bermasalah!");
        
    }
}

async function main() {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });
  
    const response1 = await chat.sendMessage({
      message: "I have 2 dogs in my house.",
    });
    console.log("Chat response 1:", response1.text);
  
    const response2 = await chat.sendMessage({
      message: "How many paws are in my house?",
    });
    console.log("Chat response 2:", response2.text);
  }

export { Text, TextWithMedia, main }