import { Request, Response } from 'express'
import NoteModel from '../models/note'

export const handleCreateNote = async (req: Request, res: Response) => {
    try {
        const { userId, title, content } = req.body
        if(!userId || !title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: userId, title, content'
            })
        }
        const newNote = await NoteModel.create({ userId, title, content })
        return res.status(200).json({
            success: true,
            message: 'Note created successfully',
            payload: newNote
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error creating note'
        })
    }
}

export const handleGetAllNotes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const notes = await NoteModel.find({ userId: userId })
        return res.status(200).json({
            success: true,
            message: 'All notes fetched successfully',
            payload: notes
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error fetching all notes'
        })
    }
}