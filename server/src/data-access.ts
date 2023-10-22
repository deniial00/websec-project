// import { RedisClientType, createClient } from 'redis';

// class RedisClient {

//     private client: RedisClientType;
//     private host: string;
//     private port: number;

//     constructor(host: string, port: number) {
//         this.client = null;
//         this.host = host;
//         this.port = port;
//     }

//     async connection(): Promise<RedisClientType>{
//         if (this.client === null) {
//             this.client = createClient({ this.host, this.port });
//         }

//         await this.client.connect();

//         return client;
//     }
// }

// // export const client: RedisClientType = createClient({
// //     url: 'redis://websec-db:6379'
// // });

// export default new RedisClient();