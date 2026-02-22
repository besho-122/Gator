import { db } from "..";
import { users } from "../schema";

export async function resetDatabase() {
  await db.delete(users);
}