import { CommandHandler, UserCommandHandler } from "./command";
import { getCurrentUser } from "./db/queries/users";
import { getFeedFollowsForUser } from "./db/queries/getFeedFollowsForUser";

export const handlerFollowing: UserCommandHandler = async (cmdName, user) => {
    const follows = await getFeedFollowsForUser(user.id);
    for (const follow of follows) {
      console.log(`${follow.feedName}`);
    }
  };