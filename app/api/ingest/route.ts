import {NextResponse} from "next/server";
import {connectMongo} from "@/lib/mongodb";
import {LogModel} from "@/models/Log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const body = await req.json(); // { action, message, userId?, meta? }
    if (!body?.action) return NextResponse.json({error: "action required"}, {status: 400});

    await connectMongo();
    await LogModel.create(body);
    return NextResponse.json({ok: true}, {status: 201});
}
