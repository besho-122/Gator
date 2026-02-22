import { readConfig } from "src/config";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}
export async function getUserByName(name: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.name, name));
  
    return user;
  }


export async function getUsers() {
    return await db.select().from(users);

  }

export async function getCurrentUser (){
    let c = readConfig();
    return getUserByName(c.currentUserName);
}