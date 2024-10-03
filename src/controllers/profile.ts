import { Request, Response } from 'express'

import ProfileModel from '../models/profile'

export const handleCreateProfile = async (req: Request, res: Response) => {
    try {
        const { userId, name, email } = req.body
        if(!userId || !name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: userId, name, email'
            })
        }
        const profileExists = await ProfileModel.findOne({ userId: userId })
        if(profileExists) {
            return res.status(409).json({
                success: false,
                message: 'Profile already exists'
            })
        }
        const newProfile = new ProfileModel({ userId, name, email })
        return res.status(200).json({
            success: true,
            message: 'Profile created successfully',
            payload: newProfile
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error creating profile'
        })
    }
}

export const handleGetProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query
        const userExists = await ProfileModel.findOne({ userId: userId })
        if(!userExists) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            payload: userExists
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching profile'
        })
    }
}