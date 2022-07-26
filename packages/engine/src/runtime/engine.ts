import { Canvas } from "@engine-runtime/canvas";
import { EngineElement } from "@engine-runtime/engine-element";
import { SceneController } from "@engine-runtime/scene/scene-controller";

export class Engine extends EngineElement {
  private static _INSTANCE: Engine;

  readonly SceneController: SceneController;
  readonly Canvas: Canvas;

  private constructor() {
    super();
    this.SceneController = SceneController.GetInstance();
    this.Canvas = Canvas.GetInstance();
  }

  public static GetInstance(): Engine {
    if (!Engine._INSTANCE) {
      Engine._INSTANCE = new Engine();
    }

    return Engine._INSTANCE;
  }

  public Start(): void {
    this.Canvas.ValidateCanvas();
    this.Update();
  }

  private Update(): void {
    requestAnimationFrame(() => {
      this.SceneController.Update();

      this.Update();
    });
  }
}
