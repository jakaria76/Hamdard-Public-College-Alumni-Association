import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Profile from '@/models/Profile'
import { auth } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// String fields
const STRING_FIELDS = [
  'fullName', 'fullNameBn', 'memberType', 'committeePosition', 'gender',
  'alternativeMobile', 'presentAddress', 'permanentAddress', 'district',
  'upazila', 'facebookLink', 'whatsAppNumber', 'bloodGroup',
  'donationEligibility', 'preferredDonationLocation', 'schoolName',
  'schoolGroup', 'collegeName', 'collegeGroup', 'universityName',
  'department', 'studentId', 'shortBio', 'whyJoined', 'futureGoals',
  'hobbies', 'facebook', 'portfolioWebsite', 'locationDms',
]

// Number fields
const NUMBER_FIELDS = [
  'schoolPassingYear', 'collegePassingYear', 'currentYear',
  'currentSemester', 'totalDonationCount', 'latitude', 'longitude',
]

// Date fields
const DATE_FIELDS = [
  'memberSince', 'dateOfBirth', 'lastDonationDate', 'nextAvailableDonationDate',
]

async function uploadImage(imageFile) {
  try {
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${imageFile.type};base64,${buffer.toString('base64')}`
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'hpcaa/profiles',
      transformation: [{ width: 400, height: 400, crop: 'fill' }],
    })
    return result.secure_url
  } catch (err) {
    console.error('Cloudinary upload error:', err)
    throw new Error('Image upload failed')
  }
}

function parseFormData(formData) {
  const data = {}

  STRING_FIELDS.forEach(field => {
    const value = formData.get(field)
    if (value !== null && value !== '' && value !== 'undefined') {
      data[field] = value
    }
  })

  NUMBER_FIELDS.forEach(field => {
    const value = formData.get(field)
    if (value !== null && value !== '' && value !== 'undefined') {
      const num = Number(value)
      if (!isNaN(num)) data[field] = num
    }
  })

  DATE_FIELDS.forEach(field => {
    const value = formData.get(field)
    if (value !== null && value !== '' && value !== 'undefined') {
      const date = new Date(value)
      if (!isNaN(date.getTime())) data[field] = date
    }
  })

  return data
}

// ── GET ──
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const profile = await Profile.findOne({ userId: session.user.id }).lean()
    return NextResponse.json({ profile }, { status: 200 })

  } catch (error) {
    console.error('GET profile error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ── POST (Create) ──
export async function POST(request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    // Already exists check
    const existing = await Profile.findOne({ userId: session.user.id })
    if (existing) {
      return NextResponse.json(
        { error: 'Profile আগেই আছে। Edit করতে যাও।' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const data = parseFormData(formData)

    // Image upload
    const imageFile = formData.get('imageFile')
    if (imageFile && imageFile.size > 0) {
      data.profileImagePath = await uploadImage(imageFile)
    }

    const profile = await Profile.create({
      userId: session.user.id,
      ...data,
    })

    return NextResponse.json(
      { message: 'Profile তৈরি সফল!', profile },
      { status: 201 }
    )

  } catch (error) {
    console.error('POST profile error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}

// ── PUT (Update) ──
export async function PUT(request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const formData = await request.formData()
    const data = parseFormData(formData)

    // Image upload
    const imageFile = formData.get('imageFile')
    if (imageFile && imageFile.size > 0) {
      data.profileImagePath = await uploadImage(imageFile)
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: session.user.id },
      { $set: data },
      { new: true, upsert: true, runValidators: false }
    )

    return NextResponse.json(
      { message: 'Profile update সফল!', profile },
      { status: 200 }
    )

  } catch (error) {
    console.error('PUT profile error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}

// ── DELETE ──
export async function DELETE() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    await Profile.findOneAndDelete({ userId: session.user.id })

    return NextResponse.json(
      { message: 'Profile delete সফল!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('DELETE profile error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}