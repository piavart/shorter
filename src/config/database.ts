import mongoose from 'mongoose';

export class Database {
  private mongoUri: string;

  constructor() {
    this.mongoUri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/shorter';
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUri);
      console.log('Connected to MongoDB successfully');

      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });

      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      });
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}
