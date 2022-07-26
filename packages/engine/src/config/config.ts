import config from "@engine-config";
import { ConfigModel } from "config/models/config.model";

export class Config {
  private static _INSTANCE: Config;

  readonly Parameters: ConfigModel;

  private constructor() {
    this.Parameters = <ConfigModel>config;
  }

  public static GetInstance(): Config {
    if (!Config._INSTANCE) {
      Config._INSTANCE = new Config();
    }

    return Config._INSTANCE;
  }
}
