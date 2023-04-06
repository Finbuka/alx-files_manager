import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const AppController = {
  getStatus: async (req, res) => {
    try {
      const redisStatus = await redisClient.isAlive();
      const dbStatus = await redisClient.isAlive();
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getStats: async (req, res) => {
    try {
      const nUsers = await dbClient.nbUsers();
      const nFiles = await dbClient.nbFiles();
      res.status(200).json({ users: nUsers, files: nFiles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default AppController;
