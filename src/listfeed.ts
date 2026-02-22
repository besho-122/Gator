import { CommandHandler } from "./command";
import { getFeeds } from "./db/queries/feeds";


export const handlerFeeds: CommandHandler = async () => {
  const feeds = await getFeeds();
  for (const feed of feeds) {
    console.log(`name :${feed.feedName} url :${feed.feedUrl} by: ${feed.userName}` );
  }
};