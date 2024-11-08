import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log(req);

  return NextResponse.json({ ok: true });
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  
  return NextResponse.json(data);
};

