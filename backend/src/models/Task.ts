import mongoose, { Schema, Document } from 'mongoose';
import { ITask } from '../types/index.js';

const taskSchema = new Schema<ITask>({
  firstName: { type: String, required: true },
  phone: { type: Number, required: true },
  notes: { type: String, required: true },
  agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

taskSchema.index({ agentId: 1 });

export default mongoose.model<ITask>('Task', taskSchema);