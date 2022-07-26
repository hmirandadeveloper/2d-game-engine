import { Config } from "config/config";

export abstract class EngineElement {
  readonly Config: Config;

  constructor() {
    this.Config = Config.GetInstance();
  }
}
