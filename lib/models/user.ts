import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true },
)

export type UserDoc = InferSchemaType<typeof userSchema>

// Reuse the compiled model across hot reloads instead of redefining it.
export const User = mongoose.models.User || mongoose.model('User', userSchema)
