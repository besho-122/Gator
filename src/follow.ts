import { CommandHandler, UserCommandHandler } from "./command";
import { getCurrentUser } from "./db/queries/users";
import { getFeedByUrl } from "./db/queries/getFeedByUrl";
import { createFeedFollow } from "./db/queries/createFeedFollow";

export const handlerFollow: UserCommandHandler = async (cmdName,user, ...args) => {
    const url = args[0];
    if (!url) {
      throw new Error("URL is required");  }
    const feed = await getFeedByUrl(url);
    if (!feed) {  throw new Error("Feed not found"); }
    const [follow] = await createFeedFollow(user.id, feed.id);
    console.log(`${follow.userName} is now following ${follow.feedName}`);
  };