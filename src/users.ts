import { CommandHandler } from "./command";
import { readConfig } from "./config";
import { getUsers } from "./db/queries/users";

export const handlerUsers: CommandHandler = async () => {
  const users = await getUsers();

  let currentUserName: string | null = null;

  try {
    const config = readConfig();
    currentUserName = config.currentUserName;
  } catch {
    currentUserName = null;
  }

  for (const user of users) {
    if (user.name === currentUserName) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
};