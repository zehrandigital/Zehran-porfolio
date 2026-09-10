import mongoose, { Schema } from 'mongoose'

/**
 * A single document whose _id uniqueness is used as an atomic lock: only
 * one concurrent request can ever successfully insert it, which is what
 * makes the one-time registration endpoint race-proof (a plain
 * count-then-create check could let two simultaneous requests both pass).
 */
const registrationLockSchema = new Schema({ _id: { type: String, default: 'admin' } }, { _id: false, timestamps: true })

export const RegistrationLock = mongoose.models.RegistrationLock || mongoose.model('RegistrationLock', registrationLockSchema)
