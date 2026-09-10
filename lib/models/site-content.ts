import mongoose, { Schema } from 'mongoose'

/** Singleton document (_id: 'main') holding the entire editable site content blob. */
const siteContentSchema = new Schema(
  {
    _id: { type: String, default: 'main' },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true, _id: false },
)

export const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema)
