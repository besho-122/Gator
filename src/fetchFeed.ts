import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./rss/types";

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const res = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch feed");
  }
  const xml = await res.text();
  const parser = new XMLParser();
  const parsed = parser.parse(xml);
  if (!parsed.rss || !parsed.rss.channel) {
    throw new Error("Invalid RSS feed format");
  }
  const channel = parsed.rss.channel;
  if (!channel.title || !channel.link || !channel.description) {
    throw new Error("Missing channel metadata");
  }
  let items: RSSItem[] = [];

  if (channel.item) {
    const raw = Array.isArray(channel.item)
      ? channel.item
      : [channel.item];
    items = raw
      .filter((item: any) =>
        item?.title &&
        item?.link &&
        item?.description &&
        item?.pubDate
      )
      .map((item: any) => ({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate,
      }));
  }

  return {
    title: channel.title,
    link: channel.link,
    description: channel.description,
    items,
  };
}