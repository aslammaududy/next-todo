import mongoose, { Schema, InferSchemaType } from "mongoose";

const LogSchema = new Schema({
    action: { type: String, required: true },      // "CREATE_TODO", "LOGIN", dsb.
    message: { type: String },
    userId: { type: String },
    meta: { type: Schema.Types.Mixed },            // fleksibel: ip, headers, payload
}, { timestamps: true });

/** Contoh TTL index (opsional): auto-delete log >30 hari */
LogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

export type Log = InferSchemaType<typeof LogSchema>;

export const LogModel =
    mongoose.models.Log || mongoose.model("Log", LogSchema);
