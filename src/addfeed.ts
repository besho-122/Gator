import { CommandHandler } from "./command";
import { readConfig } from "./config";
import { getUserByName } from "./db/queries/users";
import { createFeed, printFeed } from "./db/queries/feeds";
import { createFeedFollow } from "./db/queries/createFeedFollow";

import { UserCommandHandler } from "./command";

export const handlerAddFeed: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
  if (args.length < 2) {
    throw new Error("Feed name and URL required");
  }

  const [name, url] = args;

  const feed = await createFeed(name, url, user.id);
  const [follow] = await createFeedFollow(user.id, feed.id);

  printFeed(feed, user);
  console.log(`${follow.userName} is now following ${follow.feedName}`);
};