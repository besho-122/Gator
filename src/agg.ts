import { CommandHandler } from "./command";
import { scrapeFeeds } from "./db/queries/feeds";


export const handlerAgg: CommandHandler = async (cmdName,...args) => {
  if (args.length !== 1) {
    throw new Error("agg requires 1 argument: time_between_reqs");
  }
  const timeBetweenRequests = parseDuration(args[0]);
  console.log(`Collecting feeds every ${args[0]}...`);
  await scrapeFeeds().catch(console.error);
  const interval = setInterval(() => { scrapeFeeds().catch(console.error);}, timeBetweenRequests);
  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
};

function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
  
    if (!match) {
      throw new Error("Invalid duration format. Use 1s, 1m, 1h, etc.");
    }
    const value = parseInt(match[1]);
    const unit = match[2];
    switch (unit) {
      case "ms":
        return value;
      case "s":
        return value * 1000;
      case "m":
        return value * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      default:
        throw new Error("Invalid time unit");
    }
  }