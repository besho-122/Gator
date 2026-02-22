
import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds } from "../schema";

export async function getFeedByUrl(url: string) {
  const [feed] = await db
    .select()
    .from(feeds)
    .where(eq(feeds.url, url));

  return feed;
}