import { connectMongoDB, disconnectMongoDB } from '@/lib/mongodb';
import { authenticate } from '@/lib/authenticate';
import Task from '@/models/task';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(req) {
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

    const result = await connectMongoDB();

    if (!result.ok) {
      throw new Error(result);
    }

    const tasks = await Task.find().sort({ order: 1 });

    return NextResponse.json({
      ok: true,
      status: 200,
      message: 'Tasks fetched successfully.',
      data: tasks,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 500,
      message: `An error occurred while fetching tasks. ${error.message}`,
    });
  }
}

export async function POST(req) {
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

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({
        ok: false,
        status: 409,
        message: 'Missing required parameter {title}.',
      });
    }

    const result = await connectMongoDB();

    if (!result.ok) {
      throw new Error(result);
    }

    const existing = await Task.findOne({ title });

    if (existing) {
      return NextResponse.json({
        ok: false,
        status: 409,
        message: 'Task Already Exists',
      });
    }

    const count = await Task.countDocuments({});

    await Task.create({ order: count + 1, title });

    return NextResponse.json({
      ok: true,
      status: 200,
      message: 'Task created successfully.',
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 500,
      message: `An error occurred while creating task. ${error.message}`,
    });
  }
}

export async function DELETE(req) {
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        ok: false,
        status: 409,
        message: 'Missing required parameter {id}.',
      });
    }

    const result = await connectMongoDB();

    if (!result.ok) {
      throw new Error(result);
    }

    await Task.deleteOne({ _id: id });

    return NextResponse.json({
      ok: true,
      status: 200,
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 500,
      message: `An error occurred while deleting task. ${error.message}`,
    });
  }
}

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

    const { id, new_title } = await req.json();

    if (!id || !new_title) {
      let message = '';
      if (!id && !new_title) message = 'Missing required parameters.';
      if (!new_title) message = 'Missing required parameter {new_title}.';
      if (!id) message = 'Missing required parameter {id}.';
      return NextResponse.json({
        ok: false,
        status: 409,
        message: message,
      });
    }

    const result = await connectMongoDB();

    if (!result.ok) {
      throw new Error(result);
    }

    const existing = await Task.findOne({ title: new_title });

    if (existing) {
      if (id !== existing._id.toString()) {
        return NextResponse.json({
          ok: false,
          status: 409,
          message: 'Task Already Exists',
        });
      }
    }

    await Task.updateOne({ _id: id }, { title: new_title });

    return NextResponse.json({
      ok: true,
      status: 200,
      message: 'Task updated successfully.',
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: 500,
      message: `An error occurred while updating task. ${error.message}`,
    });
  }
}
