import { createClient } from "redis";

export default class DatabaseController
{
	client = undefined;

	constructor()
	{
		this.client = createClient();
		
		async () => {
			await this.client.connect();
		}
		
		console.log("init dbController", this.client);
		this.client.on('error', err => console.log('Redis Client Error', err));
	}

	get client()
	{
		return this.client; 
	}

	// Set a key-value pair in Redis
	set(key, value, callback)
	{
		this.client.set(key, value, (err, reply) => {
			if (err) {
				console.error('Redis SET Error:', err);
			}
			callback(err, reply);
		});
	}
	
	// Get the value for a given key from Redis
	get(key, callback)
	{
		this.client.get(key, (err, reply) => {
			if (err) {
				console.error('Redis GET Error:', err);
			}
			callback(err, reply);
		});
	}
	
	// Close the Redis connection
	// close()
	// {
	// 	this.client.quit();
	// }
}