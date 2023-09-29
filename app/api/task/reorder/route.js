import { connectMongoDB } from '@/lib/mongodb';
import { authenticate } from '@/lib/authenticate';
import Task from '@/models/task';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function PUT(req) {
  try {
    // Authenticate
    const headersInstance = headers();
    const authorization = headersInstance.get('authorization');
    const checkAuth = await authenticate(authorization);
    const authRes = await checkAuth.json();
    if (!authRes.ok) {
      return NextResponse.json(authRes);
    }
    // End Auth

    const { newOrder } = await req.json();

    const result = await connectMongoDB();

    if (!result.ok) {
      throw new Error(result);
    }

    const bulkOps = [];

    for (const key in newOrder) {
      bulkOps.push({
        updateOne: {
          filter: { _id: newOrder[key]._id },
          update: { $set: { order: +key + 1 } }, 
        },
      });
      // await Task.updateOne({ _id: newOrder[key]._id }, { order: +key + 1 });
    }
    Task.bulkWrite(bulkOps);

    return NextResponse.json({
      ok: true,
      status: 200,
      message: 'Tasks reordered successfully.',
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 500,
      message: `An error occurred while reordering tasks. ${error.message}`,
    });
  }
}

export async function GET(req) {
  //   try {
  //     const headersInstance = headers();
  //     const authorization = headersInstance.get('authorization');
  //     const checkAuth = await authenticate(authorization);
  //     const authRes = await checkAuth.json();
  //     if (!authRes.ok) {
  //       return NextResponse.json(authRes);
  //     }
  //     return NextResponse.json({
  //       ok: true,
  //       status: 200,
  //       message: 'User Authenticated',
  //     });
  //   } catch (error) {
  //     return NextResponse.json({
  //       ok: false,
  //       status: 500,
  //       message: `An error occurred while reordering tasks. ${error.message}`,
  //     });
  //   }
}
