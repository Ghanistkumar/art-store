import { MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI || ''; // Ensure you set MONGODB_URI in your .env.local file

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the client is not recreated on hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, always create a new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a promise to be used by other files to access the MongoClient
export default clientPromise;
