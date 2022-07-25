import { SpriteAnimation } from "@engine-runtime/component/animator/sprite-animation";
import { SpriteAnimator } from "@engine-runtime/component/animator/sprite-animator";
import { IEvaluable } from "@engine-runtime/component/fsm/evaluable.h";
import { InputController } from "@engine-runtime/component/input/input-controller";
import { Mover } from "@engine-runtime/component/movement/mover";
import { RenderEntity } from "@engine-runtime/component/render/render-entity";
import { Renderer } from "@engine-runtime/component/render/renderer";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { GameObject } from "@engine-runtime/scene/game-object";
import { CharacterPrefabModel } from "@engine-runtime/scene/loader/models/character-prefab.model";
import { MapPrefabModel } from "@engine-runtime/scene/loader/models/map-prefab.model";
import { ScenePrefabModel } from "@engine-runtime/scene/loader/models/scene-prefab.model";
import { TileSetPrefabModel } from "@engine-runtime/scene/loader/models/tile-set-prefab.model";
import { Scene } from "@engine-runtime/scene/scene";
import { SceneController } from "@engine-runtime/scene/scene-controller";
import { Vector2 } from "@engine-runtime/utils/vector2";

export class SceneLoader {
  private static _INSTANCE: SceneLoader;

  private _characterPrefabs: Map<string, CharacterPrefabModel>;
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
    this._characterPrefabs = new Map<string, CharacterPrefabModel>();
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
    this.ValidateTileSets();
    this.ValidateCharaceters(scenePrefab);

    const scene = new Scene(scenePrefab.name);
    await this.LoadTileSetPrefabs(scene);

    if (scenePrefab.backgroundAudioFileName.trim().length) {
      scene.BackgroundAudio.src = `src/playground/assets/sounds/${scenePrefab.backgroundAudioFileName.trim()}.mp3`;
    }
    this.LoadMapPrefab(scene);
    this.LoadCharactersPrefabs(scenePrefab, scene);

    SceneController.GetInstance().AddScene(scene);
    SceneController.GetInstance().SetScene(scene.Name);
  }

  public AddCharacter(characterPrefab: CharacterPrefabModel): void {
    this._characterPrefabs.set(characterPrefab.name, characterPrefab);
  }

  public AddTileSet(tileSetPrefab: TileSetPrefabModel): void {
    this._tileSetPrefabs.set(tileSetPrefab.name, tileSetPrefab);
  }

  private ValidateTileSets(): void {
    if (this._tileSetPrefabs.size !== this._characterPrefabs.size + 1) {
      throw new Error(
        `Incompatible amount of Tile Sets (${this._tileSetPrefabs.size}) 
        regarding the amount requested by the Scene's elements (${
          this._characterPrefabs.size + 1
        })`
      );
    }
  }

  private ValidateCharaceters(scene: ScenePrefabModel): void {
    if (scene.characters.length !== this._characterPrefabs.size) {
      throw new Error(
        `Incompatible amount of Characters (${this._characterPrefabs.size}) 
        regarding the amount requested by the Scene: ${scene.name} (${scene.characters.length})`
      );
    }
  }

  private async LoadTileSetPrefabs(scene: Scene): Promise<void> {
    this._tileSetPrefabs.forEach((tileSetPrefab) => {
      const tileSet: TileSet = new TileSet(tileSetPrefab.imageSrc);
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

    const renderEntity = new RenderEntity(
      this._mapPrefab.name,
      tileSet,
      new Set<string>(this._mapPrefab.tiles)
    );
    console.warn(this._tileSets, this._mapPrefab.renderLines);
    this._mapPrefab.renderLines.forEach((renderTile, posY) => {
      console.warn(posY, renderTile);
    });
  }

  private LoadCharactersPrefabs(
    scenePrefab: ScenePrefabModel,
    scene: Scene
  ): void {
    this._characterPrefabs.forEach((characterPrefab) => {
      const sceneCharacterPrefab = scenePrefab.characters.find(
        (sceneCharacterPrefab) =>
          sceneCharacterPrefab.key === characterPrefab.name
      );
      const gameObject: GameObject = new GameObject(
        characterPrefab.name,
        new Vector2(
          sceneCharacterPrefab?.position.x,
          sceneCharacterPrefab?.position.y
        )
      );

      scene.AddGameObject(gameObject);

      if (sceneCharacterPrefab?.isPlayer) {
        const inputController: InputController = new InputController(
          gameObject
        );
        gameObject.AddComponent(inputController);

        scene.PlayerKey = characterPrefab.name;
      }

      const tileSet: TileSet = <TileSet>(
        this._tileSets.get(characterPrefab.spriteKey)
      );

      const renderer: Renderer = new Renderer(gameObject);
      gameObject.AddComponent(renderer);

      characterPrefab.sprites.forEach((characterPrefabSpriteModel, index) => {
        const renderEntity: RenderEntity = new RenderEntity(
          characterPrefab.name,
          tileSet,
          new Set<string>(
            characterPrefabSpriteModel.tiles.map((tile) => tile.key)
          ),
          gameObject.GridPosition
        );

        characterPrefabSpriteModel.tiles.forEach((tilePrefab) => {
          renderEntity.AddTileRenderMap(
            tilePrefab.key,
            new Vector2(tilePrefab.position.x, tilePrefab.position.y)
          );
        });

        renderer.AddSprite(index, renderEntity);
      });

      const mover: Mover = new Mover(gameObject);
      gameObject.AddComponent(mover);

      const spriteAnimator: SpriteAnimator = new SpriteAnimator(gameObject);
      gameObject.AddComponent(spriteAnimator);

      characterPrefab.animations.forEach((animationPrefab) => {
        spriteAnimator.AddAnimation(
          new SpriteAnimation(
            animationPrefab.name,
            animationPrefab.sequence,
            animationPrefab.name.indexOf("walking") >= 0 ? "footstep" : ""
          )
        );
      });

      spriteAnimator.CreateAnimationTransition(
        "idle_front",
        <IEvaluable>{
          Evaluate() {
            return mover.MoveAxis.Y === 0;
          },
        },
        "walking_front"
      );

      spriteAnimator.CreateAnimationTransition(
        "idle_back",
        <IEvaluable>{
          Evaluate() {
            return mover.MoveAxis.Y === 0;
          },
        },
        "walking_back"
      );

      spriteAnimator.CreateAnimationTransition("walking_front", <IEvaluable>{
        Evaluate() {
          return mover.MoveAxis.Y > 0;
        },
      });

      spriteAnimator.CreateAnimationTransition("walking_back", <IEvaluable>{
        Evaluate() {
          return mover.MoveAxis.Y < 0;
        },
      });
    });
  }
}
