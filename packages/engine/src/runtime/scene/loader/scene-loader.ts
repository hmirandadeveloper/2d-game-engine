import { Scene } from "@engine-runtime/scene/scene";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { GameObject } from "@engine-runtime/scene/game-object";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { Renderer } from "@engine-runtime/component/render/renderer";
import { SceneController } from "@engine-runtime/scene/scene-controller";
import { CharacterFactory } from "@engine-runtime/factory/character.factory";
import { RenderEntity } from "@engine-runtime/component/render/render-entity";
import { MapPrefabModel } from "@engine-runtime/scene/loader/models/map-prefab.model";
import { ScenePrefabModel } from "@engine-runtime/scene/loader/models/scene-prefab.model";
import { TileSetPrefabModel } from "@engine-runtime/scene/loader/models/tile-set-prefab.model";
import { EngineElement } from "@engine-runtime/engine-element";

export class SceneLoader extends EngineElement {
  private static _INSTANCE: SceneLoader;

  private _tileSetPrefabs: Map<string, TileSetPrefabModel>;
  private _mapPrefab: MapPrefabModel | null;

  private _tileSets: Map<string, TileSet>;

  public get MapPrefab(): MapPrefabModel | null {
    return this._mapPrefab;
  }
  public set MapPrefab(value: MapPrefabModel | null) {
    this._mapPrefab = value;
  }

  private constructor() {
    super();
    this._tileSetPrefabs = new Map<string, TileSetPrefabModel>();
    this._mapPrefab = null;

    this._tileSets = new Map<string, TileSet>();
  }

  public static GetInstance(): SceneLoader {
    if (!SceneLoader._INSTANCE) {
      SceneLoader._INSTANCE = new SceneLoader();
    }

    return SceneLoader._INSTANCE;
  }

  public async LoadScene(scenePrefab: ScenePrefabModel): Promise<void> {
    this.ValidateTileSets(scenePrefab);

    const scene = new Scene(scenePrefab.name);
    await this.LoadTileSetPrefabs(scene);

    if (scenePrefab.backgroundAudioFileName.trim().length) {
      scene.BackgroundAudio.src = `${
        this.Config.Parameters.assets.src
      }/sounds/${scenePrefab.backgroundAudioFileName.trim()}.${
        this.Config.Parameters.assets.soundExtension
      }`;
    }

    this.LoadMapPrefab(scene);

    SceneController.GetInstance().AddScene(scene);

    this.LoadCharacters(scenePrefab);
  }

  public AddTileSet(tileSetPrefab: TileSetPrefabModel): void {
    this._tileSetPrefabs.set(tileSetPrefab.name, tileSetPrefab);
  }

  private ValidateTileSets(scenePrefabModel: ScenePrefabModel): void {
    if (this._tileSetPrefabs.size !== scenePrefabModel.tileSetKeyNames.length) {
      throw new Error(
        `Incompatible amount of Tile Sets (${this._tileSetPrefabs.size}) 
        regarding the amount requested by the Scene's elements (${scenePrefabModel.tileSetKeyNames.length})`
      );
    }
  }

  private async LoadTileSetPrefabs(scene: Scene): Promise<void> {
    this._tileSetPrefabs.forEach((tileSetPrefab) => {
      const tileSet: TileSet = new TileSet(
        tileSetPrefab.name,
        `${this.Config.Parameters.assets.src}/${tileSetPrefab.imageSrc}`
      );
      tileSetPrefab.layers.forEach((tileSetPrefabLayer) => {
        tileSet.SetTileLayer(
          tileSetPrefabLayer.tileKey,
          tileSetPrefabLayer.layer
        );
      });
      scene.AddTileSet(tileSet);
      this._tileSets.set(tileSetPrefab.name, tileSet);
    });
    await scene.Setup();
  }

  private LoadMapPrefab(scene: Scene): void {
    if (!this._mapPrefab) {
      throw new Error("No Map found");
    }

    const tileSet: TileSet = <TileSet>(
      this._tileSets.get(this._mapPrefab.tileSet)
    );

    const gameObject: GameObject = new GameObject(this._mapPrefab.name);
    scene.AddGameObject(gameObject);
    const rendererMap: Renderer = new Renderer(gameObject);
    gameObject.AddComponent(rendererMap);

    const renderEntity = new RenderEntity(
      this._mapPrefab.name,
      tileSet,
      new Set<string>(this._mapPrefab.tiles)
    );

    rendererMap.AddSprite(0, renderEntity);

    this._mapPrefab.renderLines.forEach((renderLine) => {
      for (let y = 0; y < renderLine.repeatAmount; y++) {
        renderLine.tileBlocks.forEach((tileBlock) => {
          for (let x = 0; x < tileBlock.repeatAmount; x++) {
            renderEntity.AddTileRenderMap(
              tileBlock.tileId,
              new Vector2(tileBlock.startXPos + x, renderLine.line + y)
            );
          }
        });
      }
    });
  }

  private LoadCharacters(scenePrefab: ScenePrefabModel): void {
    const characterFactory: CharacterFactory = CharacterFactory.GetInstance();

    scenePrefab.characters.forEach((characterPrefab) => {
      characterFactory.CreateCharacter(
        characterPrefab.key,
        scenePrefab.tileSetKeyNames[characterPrefab.tileSetKey],
        characterPrefab.isPlayer,
        new Vector2(characterPrefab.position.x, characterPrefab.position.y)
      );
    });
  }
}
