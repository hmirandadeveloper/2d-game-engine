import { GameObject } from "./game-object";
import { Camera } from "@engine-runtime/camera";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { EngineElement } from "@engine-runtime/engine-element";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { Renderer } from "@engine-runtime/component/render/renderer";
import { RenderOrchestrator } from "@engine-runtime/component/render/render-orchestrator";

export class Scene extends EngineElement {
  static readonly EMPTY_SCENE: Scene = new Scene("Empty");

  readonly Name: string;
  readonly TileSets: Map<string, TileSet>;
  readonly GameObjects: Map<string, GameObject>;
  readonly BackgroundAudio: HTMLAudioElement;
  readonly Camera: Camera;
  readonly RenderOrchestrator: RenderOrchestrator;

  private _tilesSetup: Set<Promise<void>>;
  private _playerKey: string;
  private _availablePositions: Array<Vector2>;

  public get PlayerKey(): string {
    return this._playerKey;
  }
  public set PlayerKey(playerKey: string) {
    this._playerKey = playerKey;
  }

  public get AvailablePositions(): Array<Vector2> {
    return this._availablePositions;
  }

  constructor(name: string, playerKey: string = "") {
    super();
    this.Name = Scene.FormatName(name);
    this.TileSets = new Map<string, TileSet>();
    this.GameObjects = new Map<string, GameObject>();
    this.BackgroundAudio = new Audio();
    this.Camera = Camera.GetInstance();
    this.RenderOrchestrator = RenderOrchestrator.GetInstance();

    this._tilesSetup = new Set<Promise<void>>();
    this._playerKey = playerKey;
    this._availablePositions = new Array<Vector2>();
  }

  public AddTileSet(tileSet: TileSet): void {
    this.TileSets.set(tileSet.Name, tileSet);
    this._tilesSetup.add(tileSet.Setup());
  }

  public GetTileSet(key: string): TileSet {
    if (!this.TileSets.has(key)) {
      throw new Error("Invalid TileSet key");
    }

    return <TileSet>this.TileSets.get(key);
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

    this.Camera.Target = <GameObject>(
      this.GameObjects.get(GameObject.FormatName(this._playerKey))
    );

    if (this.BackgroundAudio.src) {
      this.BackgroundAudio.loop = true;
      this.BackgroundAudio.volume =
        this.Config.Parameters.scene.backgroundAudio.volume;
      this.BackgroundAudio.autoplay = true;
    }
    // Load all static positions (available/collision [?] - positions)
  }

  public Update(): void {
    let renderables: Array<Renderer> = new Array<Renderer>();
    this.GameObjects.forEach((gameObject) => {
      if (!this.Camera.IsOccluded(gameObject.GridPosition)) {
        gameObject.Update();
        if (gameObject.Components.has(Renderer.name)) {
          renderables.push(<Renderer>gameObject.Components.get(Renderer.name));
        }
      }
    });

    this.RenderOrchestrator.LoadRenderables(renderables);
    this.RenderOrchestrator.Update();
    this.Camera.Update();
  }

  public static FormatName(name: string): string {
    return `sc_${name.toLocaleLowerCase()}`;
  }

  // TODO: New Feature (Core Funcionality): v1.3.0
  // private LoadAvailablePositions(): void {}
}
