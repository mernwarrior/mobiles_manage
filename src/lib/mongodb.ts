import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Define the custom mongoose cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object
declare global {
  var mongoose: MongooseCache | undefined;
}

// Use globalThis to avoid runtime conflicts
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

// Init cache object
const cached: MongooseCache = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongoose = cached;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "mobile-management",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
