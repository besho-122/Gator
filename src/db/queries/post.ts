import { sql } from "drizzle-orm";
import { db } from "..";
import { Post } from "../schema";

export async function createPost(post: {
  title: string;
  url: string;
  description?: string;
  publishedAt?: Date;
  feedId: string;
}) {
  await db.execute(sql`
    INSERT INTO posts (title, url, description, published_at, feed_id)
    VALUES (
      ${post.title},
      ${post.url},
      ${post.description ?? null},
      ${post.publishedAt ? post.publishedAt.toISOString() : null},
      ${post.feedId}
    )
    ON CONFLICT (url) DO NOTHING
  `);
}
export async function getPostsForUser(
    userId: string,
    limit: number
  ) {
    const result = await db.execute<Post>(sql`
      SELECT posts.*
      FROM posts
      JOIN feeds ON posts.feed_id = feeds.id
      JOIN feed_follows ff ON ff.feed_id = feeds.id
      WHERE ff.user_id = ${userId}
      ORDER BY posts.published_at DESC NULLS LAST
      LIMIT ${limit}
    `);
  
    return result;
  }