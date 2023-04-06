import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const dbname = process.env.DB_DATABASE || 'files_manager';
    this.mongoclient = MongoClient(`mongodb://${host}:${port}/${dbname}`, { useNewUrlParser: true, useUnifiedTopology: true });
    this.mongoclient.connect();
    this.db = this.mongoclient.db(dbname);
  }

  isAlive() {
    return this.mongoclient.topology.isConnected();
  }

  async nbUsers() {
    try {
      const users = await this.db.collection('users').countDocuments();
      return users;
    } catch (err) {
      throw new Error(`Unable to get number of users ${err.message}`);
    }
  }

  async nbFiles() {
    try {
      const files = await this.db.collection('files').countDocuments();
      return files;
    } catch (err) {
      throw new Error(`Unable to get number of files ${err.message}`);
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
