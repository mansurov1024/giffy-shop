import dotenv from "dotenv";
import { createClient, RedisClientType } from 'redis';


class Redis {
  client?: RedisClientType;
  
  constructor() {
    if (!this.client) {
      this.init();
    }
  }

  async init() {
    dotenv.config();
    
    const url = process.env.REDIS_URL;
    if (!url) throw Error('Need to specify redis url!');

    this.client = createClient({
      url,
    });
    this.client.on('error', (err: any) => console.log('Redis Client Error', err));
    await this.client.connect();
  }
}

export default new Redis();
