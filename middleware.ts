import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
    // Kecualikan static assets, favicon, dan endpoint ingestion
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api/ingest).*)"],
};

export function middleware(req: NextRequest) {
    const { nextUrl } = req;

    // Ambil info ringan saja (tanpa body; Edge tidak expose body)
    const ua = req.headers.get("user-agent") ?? "";
    const ref = req.headers.get("referer") ?? "";

    const payload = {
        action: "HTTP_REQUEST",
        message: `${req.method} ${nextUrl.pathname}`,
        meta: {
            method: req.method,
            pathname: nextUrl.pathname,
            search: nextUrl.search || "",
            ua,
            ref,
        },
    };

    // Fire-and-forget ke endpoint Node.js (jangan block respon)
    fetch(new URL("/api/ingest", req.url), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true, // agar tidak ter-cancel saat navigasi
    }).catch(() => { /* swallow */ });

    return NextResponse.next();
}
