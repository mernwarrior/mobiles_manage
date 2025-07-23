import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Mobile } from "@/models/Mobile";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const mobile = await Mobile.findById(params.id);
  return NextResponse.json(mobile);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await req.json();
  const updated = await Mobile.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  await Mobile.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
