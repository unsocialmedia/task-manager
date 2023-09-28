import mongoose, { Schema, models } from 'mongoose';

const clientSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Client = models.Client || mongoose.model('Client', clientSchema);
export default Client;
