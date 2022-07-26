import { Engine } from "@engine-runtime/engine";
import { GameObject } from "@engine-runtime/scene/game-object";
import { SceneLoader } from "@engine-runtime/scene/loader/scene-loader";
import { SceneController } from "@engine-runtime/scene/scene-controller";

// TODO: New Feature (Core Funcionality): v1.2.0
export class EngineRuntimeFacade {
  public static readonly ENGINE: Engine = Engine.GetInstance();

  public static readonly SCENE_CONTROLLER: SceneController =
    Engine.GetInstance().SceneController;

  public static readonly SCENE_LOADER: SceneLoader =
    SceneController.SCENE_LOADER;

  public static AddGameObjectToCurrentScene(gameObject: GameObject): void {
    EngineRuntimeFacade.SCENE_CONTROLLER.CurrentScene.AddGameObject(gameObject);
  }
}
