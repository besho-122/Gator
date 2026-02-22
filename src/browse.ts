import { CommandHandler } from "./command";
import { readConfig } from "./config";
import { getPostsForUser } from "./db/queries/post";
import { getUserByName } from "./db/queries/users";

export const handlerBrowse: CommandHandler = async (
    cmdName,
    ...args
  ) => {
    const limit = args[0] ? parseInt(args[0]) : 2;
    const config = await readConfig();
    const user = await getUserByName(config.currentUserName);
    const posts = await getPostsForUser(user.id, limit);
    for (const post of posts) {
        console.log(`
        Title: ${post.title}
        URL: ${post.url}
        Published: ${post.publishedAt ?? "Unknown"}
  `);
    }
  };