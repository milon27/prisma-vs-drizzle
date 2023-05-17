import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 256 }).primaryKey(),
  fullName: text("full_name"),
  email: varchar("email", { length: 256 }),
});

export const post = mysqlTable("post", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: text("title"),
  content: text("content"),
});

export type User = InferModel<typeof users>; // return type when queried
export type NewUser = InferModel<typeof users, "insert">; // insert type
