import { UserCommandHandler } from "./command";
import { deleteFeedFollowByUrl } from "./db/queries/deleteFeedFollow";

export const handlerUnfollow: UserCommandHandler = async (cmdName, user,...args) => {
  const url = args[0];
  if (!url) {
    throw new Error("URL is required");
  }
  const deleted = await deleteFeedFollowByUrl(user.id, url);
  if (deleted.length === 0) {
    throw new Error("You are not following this feed");
  }
  console.log(`Unfollowed feed`);
};