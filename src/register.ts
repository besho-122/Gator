import { CommandHandler } from "./command";
import { Config, readConfig, setUser } from "./config";
import { createUser, getUserByName } from "./db/queries/users";


export const handlerRegister: CommandHandler = async (
    cmdName: string,
    ...args: string[]
  ) => {
    if (!args || args.length === 0) {
      throw new Error("Username argument is required");
    }
    const username = args[0];
    let user = await getUserByName(username);
    if (!user) {
      user = await createUser(username);
    }else {
        throw Error ("the user is exists");
    }
    const existingConfig = readConfig();
    const updatedConfig: Config = {
      ...existingConfig,
      currentUserName: username,
    };
    setUser(updatedConfig);
    console.log("User registered successfully");
    console.log(user);
  };