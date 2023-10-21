import { createClient } from "redis";
import DatabaseController from "./database-controller";
export default class TicketController {
    
	constructor() {
		// this.db = new DatabaseController().client;
		// console.log(this.db);
		this.db = createClient();
		async () => {this.db.connect();}
	}

	async test()
	{
		console.log(this.db);
		this.db.set("test","value");
		return await this.db.get("test");
	}


}