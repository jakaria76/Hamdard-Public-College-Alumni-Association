import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/db'
import User from '@/models/User'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password, batch, department, phone } = body

    // Validation
    if (!name || !email || !password || !batch) {
      return NextResponse.json(
        { error: 'সব required field পূরণ করো' },
        { status: 400 }
      )
    }

    await connectDB()

    // Email already exists check
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'এই email দিয়ে আগেই account আছে' },
        { status: 400 }
      )
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10)

    // Member ID generate
    const memberId = 'HPCAA-' + Date.now()

    // User তৈরি করো
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      batch,
      department,
      phone,
      memberId,
      status: 'active',  // সাথে সাথে active — সবাই login করতে পারবে
      role: 'alumni',    // Default role
    })

    return NextResponse.json(
      {
        message: 'Registration সফল! এখন login করো।',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Server error হয়েছে' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')

    const filter = {}
    if (role) filter.role = role
    if (status) filter.status = status

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(
      { users, total: users.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Server error হয়েছে' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'User ID দাও' },
        { status: 400 }
      )
    }

    if (updateData.role) {
      const allowedRoles = ['alumni', 'admin']
      if (!allowedRoles.includes(updateData.role)) {
        return NextResponse.json(
          { error: 'Invalid role' },
          { status: 400 }
        )
      }
    }

    await connectDB()

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true }
    ).select('-password')

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User পাওয়া যায়নি' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Update সফল!', user: updatedUser },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Server error হয়েছে' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'User ID দাও' },
        { status: 400 }
      )
    }

    await connectDB()

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json(
        { error: 'User পাওয়া যায়নি' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'User delete সফল!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Server error হয়েছে' },
      { status: 500 }
    )
  }
}