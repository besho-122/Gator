import { eq } from "drizzle-orm";
import { db } from "..";
import { Feed, User, feeds, users } from "../schema";
import { sql } from "drizzle-orm";
import { fetchFeed } from "src/fetchFeed";
import { createPost } from "./post";

export async function createFeed( name: string, url: string, userId: string) 
{
  const [feed] = await db .insert(feeds) .values({ name, url, userId, }).returning();
  return feed;
}

export function printFeed(feed: Feed, user: User) {
    console.log("Feed created:");
    console.log(`Name: ${feed.name}`);
    console.log(`URL: ${feed.url}`);
    console.log(`User: ${user.name}`);
  }


  export async function getFeeds() {
    return await db
      .select({
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name,
      })
      .from(feeds)
      .innerJoin(users, eq(feeds.userId, users.id));
  }


  export async function markFeedFetched(feedId: string) {
    await db
      .update(feeds)
      .set({
        last_fetched_at: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(feeds.id, feedId));
  }



  export async function getNextFeedToFetch(): Promise<Feed | undefined> {
    const result = await db.execute<Feed>(sql`
      SELECT *
      FROM feeds
      ORDER BY last_fetched_at NULLS FIRST
      LIMIT 1
    `);
  
    return result[0];
  }

export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
  
    if (!feed) {
      console.log("No feeds found.");
      return;
    }
    console.log(`Fetching feed: ${feed.name}`);
    await markFeedFetched(feed.id);
    const rssFeed = await fetchFeed(feed.url);
    for (const item of rssFeed.items) {
        const publishedAt = parsePublishedDate(item.pubDate);
      await createPost({
      title: item.title,
      url: item.link,
      description: item.description,
      publishedAt,
      feedId: feed.id,
    });
  }
}
  
function parsePublishedDate(dateStr?: string): Date | undefined {
    if (!dateStr) return undefined;
  
    const date = new Date(dateStr);
  
    if (isNaN(date.getTime())) {
      return undefined;
    }
  
    return date;
  }