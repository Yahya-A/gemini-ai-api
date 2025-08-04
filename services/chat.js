import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY
});


async function Text(msg) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: msg
        })
    
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

export { Text, TextWithMedia }