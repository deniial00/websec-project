import { Collection } from 'mongodb';
import DbAccess from './data-access';
import { password } from 'bun';

export default class AuthController {

  private userCollection: Collection;

  constructor() {
    this.userCollection = DbAccess.collection('users');
  }

  public login = async (data: { username: string, password: string}) => {
    try {
      console.log("login");
      const user = await this.userCollection.findOne({ username: data.username });
      console.log(user);
      if (user) {
        if (user.password === data.password) {
          const token = this.generateToken(data.username, data.password);
          console.log("ret");
          return { username: user.username, uuid: user.uuid, token };
        }
        else {
          console.error("Wrong password");
          throw new Error("Wrong password");
        }        
      } else {
        console.error("User does not exist");
        throw new Error("User does not exist");
      }
    } catch (error) {
      console.log("error");
      throw error; // You can handle errors more gracefully in your actual code.
    }
  }
  


  public signup = async (data: { username: string, email: string, password: string}) => {
    try {
      const duplicateUser = await this.userCollection.findOne({ username: data.username });

      const user = {
        username: data.username,
        email: data.email,
        password: data.password,
        uuid: crypto.randomUUID()
      };
      
      if(!duplicateUser){
        const result = await this.userCollection.insertOne(user);

        if (!result.acknowledged)
			    return { error: "Could not sign up user" };

        return { uuid: result.insertedId }
      }
      
      else {
        throw new Error("User does already exist");
      }
    } catch (error) {
      throw error;
    }
  }

  private generateToken = (username: string, password: string) => {
    return username+password;
  }
}