import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not set");

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const g = global as any;
g._mongoose ??= {conn: null, promise: null} as Cached;

export async function connectMongo() {
    if (g._mongoose.conn) return g._mongoose.conn;
    if (!g._mongoose.promise) g._mongoose.promise = mongoose.connect(uri);
    g._mongoose.conn = await g._mongoose.promise;
    return g._mongoose.conn;
}
