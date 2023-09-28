import { connectMongoDB, disconnectMongoDB } from './mongodb';
import Client from '@/models/client';
import { NextResponse } from 'next/server';

export const authenticate = async (basicAuth) => {
  try {
    if (!basicAuth) {
      return NextResponse.json({
        ok: false,
        status: 401,
        message: 'Unauthorized',
      });
    }

    const creds = new Buffer.from(basicAuth.split(' ')[1], 'base64')
      .toString()
      .split(':');
    const user = creds[0];
    const pass = creds[1];

    const result = await connectMongoDB();

    if (!result.ok) {
      throw new Error(result);
    }

    const client = await Client.findOne({ username: user });

    if (client && client.username == user && client.password == pass) {
      return NextResponse.json({
        ok: true,
        status: 200,
        message: 'Authentication Successful',
      });
    }
    return NextResponse.json({
      ok: false,
      status: 401,
      message: 'Unauthorized',
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 500,
      message: `An error occurred while fetching tasks. ${error.message}`,
    });
  }
};
