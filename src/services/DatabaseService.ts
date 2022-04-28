import { Service } from 'typedi';
import mysql from "mysql2";

@Service()
export class DatabaseService {
    private con: mysql.Connection;

    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "sam",
            password: "sam",
            database: 'f1db'
        }) as mysql.Connection;
    }

    getConnection() : mysql.Connection {
        return this.con;
    }
}