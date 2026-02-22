

import fs from "fs";
import os from "os";
import path from "path";


export type Config= {
dbUrl:string; 
currentUserName: string;
}

export function setUser(cfg: Config): void {
    writeConfig(cfg);
  }

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
  }
  

  function validateConfig(rawConfig: any): Config {
    if (
      !rawConfig ||
      typeof rawConfig !== "object" ||
      typeof rawConfig.db_url !== "string" ||
      typeof rawConfig.current_user_name !== "string"
    ) {
      throw new Error("Invalid config file structure");
    }
  
    return {
      dbUrl: rawConfig.db_url,
      currentUserName: rawConfig.current_user_name,
    };
  }


  function writeConfig(cfg: Config): void {
    const filePath = getConfigFilePath();
  
    const jsonData = {
      db_url: cfg.dbUrl,
      current_user_name: cfg.currentUserName,
    };
  
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), {
      encoding: "utf-8",
    });
  }

  
  export function readConfig(): Config {
    const filePath = getConfigFilePath();
  
    if (!fs.existsSync(filePath)) {
      throw new Error("Config file does not exist");
    }
  
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsed = JSON.parse(fileContent);
  
    return validateConfig(parsed);
  }
  
  
