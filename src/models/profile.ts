import mongoose, { Document, Schema } from 'mongoose';

interface IProfile extends Document {
  userId: string;
  name: string;
  email: string;
}

const ProfileSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IProfile>('Profile', ProfileSchema);