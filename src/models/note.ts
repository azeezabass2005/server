import mongoose, { Document, Schema } from 'mongoose';

interface INote extends Document {
  userId: string;
  title: string;
  content: string;
  // Add more fields as needed
}

const NoteSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  // Add more fields as needed
}, { timestamps: true });

export default mongoose.model<INote>('Note', NoteSchema);