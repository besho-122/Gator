import { readConfig } from "./config";
import { getUserByName } from "./db/queries/users";
import { User } from "./db/schema";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = { [cmdName: string]: CommandHandler;};
  export function registerCommand(
    registry: CommandsRegistry,
    cmdName: string,
    handler: CommandHandler
  ): void {
    registry[cmdName] = handler;
  }
  export async function runCommand(
    registry: CommandsRegistry,
    cmdName: string,
    ...args: string[]
  ): Promise<void> {
    const handler = registry[cmdName];
    if (!handler) {
      throw new Error(`Command '${cmdName}' not found`);
    }
    await handler(cmdName, ...args);
  }



  export type UserCommandHandler = ( cmdName: string, user: User,...args: string[]) => Promise<void>;


  export const middlewareLoggedIn = (
    handler: UserCommandHandler
  ): CommandHandler => {
    return async (cmdName: string, ...args: string[]) => {
      const config = readConfig();
  
      if (!config.currentUserName) {
        throw new Error("No user currently logged in");
      }
  
      const user = await getUserByName(config.currentUserName);
  
      if (!user) {
        throw new Error(`User ${config.currentUserName} not found`);
      }
  
      await handler(cmdName, user, ...args);
    };
  };