import mongoose from 'mongoose'

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null }
global._mongooseCache = cache

/** Cached Mongoose connection — reused across hot reloads and requests. */
export async function connectToDatabase() {
  if (cache.conn) return cache.conn

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local (see .env.example).')
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri)
  }
  cache.conn = await cache.promise
  return cache.conn
}
