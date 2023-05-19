// db.ts
import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { post, users } from "./schema";

// create the connection
dotenv.config();

const DATABASE_URL = `${process.env.DATABASE_URL}`;

const pool = mysql.createPool({
  uri: DATABASE_URL,
});

const db = drizzle(pool);

const testDrizzle = async () => {
  const start = new Date();
  const allUsers = await db.select().from(users);
  const end = new Date();
  const executionTime = end.getTime() - start.getTime();
  console.log(allUsers.length);
  console.log("Drizzle Execution time for get all user:", executionTime, "ms");

  // const postStart = new Date();
  // const allPost = await db.select().from(post);
  // const postEnd = new Date();
  // const executionTime1 = postEnd.getTime() - postStart.getTime();
  // console.log(allPost.length);
  // console.log("Drizzle Execution time for get all post:", executionTime1, "ms");
  // process.exit(0);
};

testDrizzle();
