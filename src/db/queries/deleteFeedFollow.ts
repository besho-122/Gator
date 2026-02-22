
import { eq, and } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds } from "../schema";
export async function deleteFeedFollowByUrl(
    userId: string,
    url: string
  ) {
    const [feed] = await db
      .select()
      .from(feeds)
      .where(eq(feeds.url, url));
  
    if (!feed) {
      throw new Error("Feed not found");
    }
  
    return await db
      .delete(feedFollows)
      .where(
        and(
          eq(feedFollows.userId, userId),
          eq(feedFollows.feedId, feed.id)
        )
      )
      .returning();
  }