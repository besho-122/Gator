import { handlerAddFeed } from "./addfeed";
import { handlerAgg } from "./agg";
import { handlerBrowse } from "./browse";
import { CommandsRegistry, middlewareLoggedIn, runCommand } from "./command";
import { readConfig } from "./config"; 
import { handlerFollow } from "./follow";
import { handlerFollowing } from "./following";
import { handlerFeeds } from "./listfeed";
import { handlerLogin } from "./login";
import { handlerRegister } from "./register";
import { handlerReset } from "./reset";
import { handlerUnfollow } from "./unfollow";
import { handlerUsers } from "./users";

async function main() {
  try {
    const registry: CommandsRegistry = {};
    registry["login"] = handlerLogin;
    registry["register"] = handlerRegister;
    registry["reset"] = handlerReset;
    registry["users"] = handlerUsers;
    registry["agg"] = handlerAgg;
    registry["feeds"] = handlerFeeds;
    registry["addfeed"] = middlewareLoggedIn(handlerAddFeed);
    registry["follow"] = middlewareLoggedIn(handlerFollow);
    registry["following"] = middlewareLoggedIn(handlerFollowing);
    registry["unfollow"] = middlewareLoggedIn(handlerUnfollow);
    registry["browse"]=handlerBrowse;
    const args = process.argv.slice(2);
    if (args.length < 1) {
      console.error("Error: Missing command");
      process.exit(1);
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    await runCommand(registry, cmdName, ...cmdArgs);
    const savedConfig = readConfig();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
  process.exit(0);
}
main();