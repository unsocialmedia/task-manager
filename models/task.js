import mongoose, { Schema, models } from 'mongoose';

const taskSchema = new Schema(
  {
    order: {
        type: Number,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model('Task', taskSchema);
export default Task;
