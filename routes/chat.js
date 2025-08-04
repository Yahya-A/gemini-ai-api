import {Text, TextWithMedia} from "../services/chat.js"
import express from "express"
import apiResponse from "../helpers/api-response.js";
import multer from "multer";

const chatRouter = express.Router();
const upload = multer();


chatRouter.post('/generate-text', async (req, res) => {
    const { prompt } = req.body

    if (!prompt) {
        res.status(400).json(apiResponse(null, "Prompt kosong!", false))
    }

    try {
        const response = await Text()
        
        res.json(apiResponse(response, 'Chat berhasil'))
    } catch (error) {   
        res.status(500).json(apiResponse(null, 'Chat bermasalah!', false))
    }
})

chatRouter.post('/generate-text-from-media', upload.single('file'), async (req, res) => {
    const { prompt } = req.body
    const file = req.file

    if (!prompt) {
        res.status(400).json(apiResponse(null, "Prompt kosong!", false))
    }
    if (!file) {
        res.status(400).json(apiResponse(null, "File kosong!", false))
    }

    try {
        const response = await TextWithMedia(prompt, file)
        
        res.json(apiResponse(response, 'Chat dengan media berhasil'))
    } catch (error) {   
        res.status(500).json(apiResponse(null, 'Chat dengan media bermasalah!', false))
    }
})

export default chatRouter