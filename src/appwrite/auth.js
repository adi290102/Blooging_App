import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
// Note:: slug ek id hai jiski help se hum apni post ko database me store kar rahe hai.
// FIRST WE CREAT AN ACCOUNT.
export class AuthService {
    client = new Client();
    account;
    constructor() { // WE MAKE THIS CONSTRUCTOR BECAUSE IT RUN ONLY WHEN ANY USER CREATE OBJECT OF authservice
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }
// we use Try,catch to check already account create or not.
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method(Login method)
                return this.login({email, password});// so yahan per agar user valid hai tho login fn() call kar lia aur use direct login kara dia.
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw (error);
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);// Ye message tab ye jab app Appwrite ki service ko reach out hi ni kar paye.

        }
        return null;
    }


    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();// WE MAKE OBJECT OF AN AUTHSERVICE, and simply all methods you 
                                    // you can access like authService.logout(),authservice.login() etc.

export default authService


