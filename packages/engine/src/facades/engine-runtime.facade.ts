import { Config } from "config/config";
import { Engine } from "@engine-runtime/engine";
import { GameObject } from "@engine-runtime/scene/game-object";
import { SceneLoader } from "@engine-runtime/scene/loader/scene-loader";
import { SceneController } from "@engine-runtime/scene/scene-controller";
import { CharacterFactory } from "@engine-runtime/factory/character.factory";

export class EngineRuntimeFacade {
  private static _INSTANCE: EngineRuntimeFacade;

  public readonly Engine: Engine;
  public readonly SceneController: SceneController;
  public readonly SceneLoader: SceneLoader;
  public readonly CharacterFactory: CharacterFactory;
  public readonly Config: Config;

  private constructor() {
    this.Engine = Engine.GetInstance();
    this.SceneController = SceneController.GetInstance();
    this.SceneLoader = SceneLoader.GetInstance();
    this.CharacterFactory = CharacterFactory.GetInstance();
    this.Config = Config.GetInstance();
  }

  public static GetInstance(): EngineRuntimeFacade {
    if (!EngineRuntimeFacade._INSTANCE) {
      EngineRuntimeFacade._INSTANCE = new EngineRuntimeFacade();
    }

    return EngineRuntimeFacade._INSTANCE;
  }

  public AddGameObjectToCurrentScene(gameObject: GameObject): void {
    this.SceneController.CurrentScene.AddGameObject(gameObject);
  }
}
