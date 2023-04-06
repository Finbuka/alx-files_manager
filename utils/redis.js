import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return value;
    } catch (err) {
      return (`Failed to get ${key}: ${err.messsage}`);
    }
  }

  async set(key, value, duration) {
    const setValue = promisify(this.client.set).bind(this.client);
    try {
      await setValue(key, value, 'EX', duration);
    } catch (err) {
      console.log(err);
    }
  }

  isAlive() {
    return this.client.connected;
  }
}

const redisClient = new RedisClient();

export default redisClient;
