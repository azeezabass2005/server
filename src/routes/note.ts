import express from 'express'
import { handleCreateNote, handleGetAllNotes } from '../controllers/note'
import { Request, Response, NextFunction } from 'express'

// A wrapper to catch async errors
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const router = express.Router()

// Wrap each route with asyncHandler
router.get("/", asyncHandler(handleGetAllNotes))

router.post("/", asyncHandler(handleCreateNote))

export default router
