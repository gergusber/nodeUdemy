import { MongoClient, Database } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

let db: Database;

export function connect() {
  const client = new MongoClient();
  client.connectWithUri(
    "mongodb+srv://gertea:RYjUlTgQKHeNcgyL@cluster0.hhdfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  db = client.database("todo-app");
}

export function getDb() {
  return db;
}
