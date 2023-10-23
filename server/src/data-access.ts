import { Db, MongoClient } from 'mongodb';
import { Collection } from 'mongodb';

export default class DbAccess {
	private static db: Db | undefined;

	static collection(input: string): Collection {
		if (!this.db) {
			const client: MongoClient = new MongoClient('mongodb://database:27017/');
			this.db = client.db('websec');
		}
		if (!this.db) {
			throw new Error("Database connection could not be established");
		}
		return this.db.collection(input);
	}
}