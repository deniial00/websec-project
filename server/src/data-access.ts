import { Db, MongoClient } from 'mongodb';

class DbAccess {
	private static db: Db | undefined;

	static get connection(): Db {
		if (!this.db) {
			const client: MongoClient = new MongoClient('mongodb://database:27017/');
			this.db = client.db('websec');
		}
		if (!this.db) {
			throw new Error("Database connection could not be established");
		}
		return this.db;
	}
}

export default DbAccess;