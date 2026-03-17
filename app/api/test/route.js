import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "MongoDB connected" });
  } catch (error) {
    console.error("DB error:", error);
    return Response.json({ error: "DB connection failed" }, { status: 500 });
  }
}