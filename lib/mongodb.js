import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    return NextResponse.json({
      ok: true,
      status: 'success',
      message: 'MongoDB Connected Successfully',
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 'failed',
      message: `Failed connecting to MongoDB: ', ${error}`,
    });
  }
};

export const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect();
    return NextResponse.json({
      ok: true,
      status: 'success',
      message: 'MongoDB Disconnected Successfully',
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 'failed',
      message: `Failed disconnecting to MongoDB: ', ${error}`,
    });
  }
};
