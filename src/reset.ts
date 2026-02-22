import { CommandHandler } from "./command";
import { resetDatabase } from "./db/queries/reset";

export const handlerReset: CommandHandler = async () => {
  await resetDatabase();
  console.log("Database reset successful");
};