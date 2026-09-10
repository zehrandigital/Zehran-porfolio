// Creates (or updates) an admin user in MongoDB so you can log in at /admin/login.
//
// Usage:
//   npm run create-admin -- --username=zehran --password="something-long-and-random"
//
// Requires MONGODB_URI to be set in .env.local (see .env.example).

import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

function parseArgs() {
  const args = {}
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--([^=]+)=(.*)$/)
    if (match) args[match[1]] = match[2]
  }
  return args
}

async function main() {
  const args = parseArgs()
  const username = args.username || process.env.ADMIN_USERNAME
  const password = args.password || process.env.ADMIN_PASSWORD

  if (!username || !password) {
    console.error('Usage: npm run create-admin -- --username=<name> --password=<password>')
    console.error('(or set ADMIN_USERNAME / ADMIN_PASSWORD in .env.local)')
    process.exit(1)
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.')
    process.exit(1)
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to .env.local first — see .env.example.')
    process.exit(1)
  }

  const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true, trim: true, lowercase: true },
      passwordHash: { type: String, required: true },
      role: { type: String, default: 'admin' },
    },
    { timestamps: true },
  )
  const registrationLockSchema = new mongoose.Schema({ _id: { type: String, default: 'admin' } }, { _id: false, timestamps: true })

  await mongoose.connect(uri)
  const User = mongoose.models.User || mongoose.model('User', userSchema)
  const RegistrationLock = mongoose.models.RegistrationLock || mongoose.model('RegistrationLock', registrationLockSchema)

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.findOneAndUpdate(
    { username: username.toLowerCase() },
    { username: username.toLowerCase(), passwordHash, role: 'admin' },
    { upsert: true, returnDocument: 'after' },
  )
  // Keep the /admin/register lock in sync so it closes even when users are
  // created from here instead of through that endpoint.
  await RegistrationLock.updateOne({ _id: 'admin' }, { $setOnInsert: { _id: 'admin' } }, { upsert: true })

  console.log(`Admin user "${user.username}" is ready. You can log in at /admin/login.`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Failed to create admin user:', err.message)
  process.exit(1)
})
