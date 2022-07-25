import { TileSet } from "@engine-runtime/component/render/tile-set";
import { Camera } from "../camera";
import { RenderOrchestrator } from "../component/render/render-orchestrator";
import { Renderer } from "../component/render/renderer";
import { GameObject } from "./game-object";
import config from "@engine-config";

export class Scene {
  static readonly EMPTY_SCENE: Scene = new Scene("Empty");
  static readonly RENDER_ORCHESTRATOR: RenderOrchestrator =
    RenderOrchestrator.GetInstance();
  static readonly CAMERA: Camera = Camera.GetInstance();

  readonly Name: string;
  readonly GameObjects: Map<string, GameObject>;
  readonly BackgroundAudio: HTMLAudioElement;

  private _tilesSetup: Set<Promise<void>>;
  private _playerKey: string;

  public get PlayerKey(): string {
    return this._playerKey;
  }
  public set PlayerKey(playerKey: string) {
    this._playerKey = playerKey;
  }

  constructor(name: string, playerKey: string = "") {
    this.Name = Scene.FormatName(name);
    this.GameObjects = new Map<string, GameObject>();
    this.BackgroundAudio = new Audio();

    this._tilesSetup = new Set<Promise<void>>();
    this._playerKey = playerKey;
  }

  public AddTileSet(tileSet: TileSet): void {
    this._tilesSetup.add(tileSet.Setup());
  }

  public AddGameObject(gameObject: GameObject): void {
    this.GameObjects.set(gameObject.Name, gameObject);
  }

  public DeleteGameObject(gameObject: GameObject): void {
    this.GameObjects.delete(gameObject.Name);
  }

  public async Setup(): Promise<void> {
    await Promise.all(this._tilesSetup);
  }

  public Start(): void {
    if (!this._playerKey.trim().length) {
      throw new Error("No player defined");
    }

    Scene.CAMERA.Target = <GameObject>(
      this.GameObjects.get(GameObject.FormatName(this._playerKey))
    );

    if (this.BackgroundAudio.src) {
      this.BackgroundAudio.loop = true;
      this.BackgroundAudio.volume = config.scene.backgroundAudio.volume;
      this.BackgroundAudio.play();
    }
    // Load all static positions (available/collision [?] - positions)
  }

  public Update(): void {
    let renderables: Array<Renderer> = new Array<Renderer>();
    this.GameObjects.forEach((gameObject) => {
      gameObject.Update();
      if (gameObject.Components.has(Renderer.name)) {
        renderables.push(<Renderer>gameObject.Components.get(Renderer.name));
      }
    });

    Scene.RENDER_ORCHESTRATOR.LoadRenderables(renderables);
    Scene.RENDER_ORCHESTRATOR.Update();
    Scene.CAMERA.Update();
  }

  public static FormatName(name: string): string {
    return `sc_${name.toLocaleLowerCase()}`;
  }
}
