import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    budget: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export type ContactMessageDoc = InferSchemaType<typeof contactMessageSchema>

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema)
