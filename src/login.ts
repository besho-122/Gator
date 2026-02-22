import { CommandHandler } from "./command";
import { Config, readConfig, setUser } from "./config";
import { getUserByName } from "./db/queries/users";


export const  handlerLogin: CommandHandler = async(cmdName: string, ...args: string[]) => {
    if (!args || args.length === 0) {
      throw new Error("Username argument is required");
    } 

  
    const username = args[0];
    const user = await getUserByName(username);
    if (!user) {
    throw new Error("User does not exist");
    }
    const existingConfig = readConfig();
    const config: Config = {
      ...existingConfig,
      currentUserName: username,
    };
  
    setUser(config);
  
    console.log(`User has been set to ${username}`);
  };