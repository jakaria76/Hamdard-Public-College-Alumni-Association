import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const result = await cloudinary.api.ping()
    return NextResponse.json({
      status: 'ok',
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      result
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    })
  }
}