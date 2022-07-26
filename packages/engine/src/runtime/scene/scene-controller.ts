import { Scene } from "./scene";
import { SceneLoader } from "@engine-runtime/scene/loader/scene-loader";

export class SceneController {
  public static SCENE_LOADER: SceneLoader = SceneLoader.GetInstance();
  private static _INSTANCE: SceneController;

  private _scenes: Map<string, Scene>;
  private _currentScene: Scene;

  get Scenes(): Map<string, Scene> {
    return this._scenes;
  }

  get CurrentScene(): Scene {
    return this._currentScene;
  }

  private constructor() {
    this._scenes = new Map<string, Scene>();
    this._currentScene = Scene.EMPTY_SCENE;
  }

  public static GetInstance(): SceneController {
    if (!SceneController._INSTANCE) {
      SceneController._INSTANCE = new SceneController();
    }

    return SceneController._INSTANCE;
  }

  public AddScene(scene: Scene): void {
    this._scenes.set(scene.Name, scene);

    if (this._currentScene === Scene.EMPTY_SCENE) {
      this._currentScene = scene;
    }
  }

  public CreateScene(sceneKey: string): void {
    this.AddScene(new Scene(sceneKey));
  }

  public GetScene(sceneKey: string): Scene {
    return this._scenes.get(sceneKey) ?? Scene.EMPTY_SCENE;
  }

  public SetScene(sceneKey: string): void {
    const scene: Scene = this.GetScene(sceneKey);

    if (scene !== Scene.EMPTY_SCENE) {
      this._currentScene = scene;
      this._currentScene.Start();
    }
  }

  public Update(): void {
    if (!this.Scenes.size) {
      return;
    }

    this._currentScene.Update();
  }
}
