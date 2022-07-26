import config from "@engine-config";
import { SceneController } from "@engine-runtime/scene/scene-controller";

export class Engine {
  private static _INSTANCE: Engine;

  readonly SceneController: SceneController;

  private constructor() {
    this.SceneController = SceneController.GetInstance();
  }

  public static GetInstance(): Engine {
    if (!Engine._INSTANCE) {
      Engine._INSTANCE = new Engine();
    }

    return Engine._INSTANCE;
  }

  public Start(): void {
    this.ValidateConfig();
    this.Update();
  }

  private ValidateConfig(): void {
    if (
      config.canvas.width <= 0 ||
      config.canvas.width % config.tile.size !== 0
    ) {
      throw new Error("Invalid canvas width");
    }

    if (
      config.canvas.heigth <= 0 ||
      config.canvas.heigth % config.tile.size !== 0
    ) {
      throw new Error("Invalid canvas height");
    }
  }

  private Update(): void {
    requestAnimationFrame(() => {
      this.SceneController.Update();

      this.Update();
    });
  }
}
