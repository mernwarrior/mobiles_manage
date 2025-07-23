import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Mobile } from "@/models/Mobile";

export async function GET() {
  await dbConnect();
  const mobiles = await Mobile.find();
  return NextResponse.json(mobiles);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const mobile = await Mobile.create(body);
  return NextResponse.json(mobile);
}
