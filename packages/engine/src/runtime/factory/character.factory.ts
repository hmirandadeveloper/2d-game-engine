import characterBPJSON from "./character.bp.json";
import { Scene } from "@engine-runtime/scene/scene";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { GameObject } from "@engine-runtime/scene/game-object";
import { Mover } from "@engine-runtime/component/movement/mover";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { Renderer } from "@engine-runtime/component/render/renderer";
import { IEvaluable } from "@engine-runtime/component/fsm/evaluable.h";
import { SceneController } from "@engine-runtime/scene/scene-controller";
import { GameObjectLayer } from "@engine-runtime/scene/game-object-layer";
import { RenderEntity } from "@engine-runtime/component/render/render-entity";
import { CharacterBPModel } from "@engine-runtime/factory/character-bp.model";
import { InputController } from "@engine-runtime/component/input/input-controller";
import { SpriteAnimator } from "@engine-runtime/component/animator/sprite-animator";
import { SpriteAnimation } from "@engine-runtime/component/animator/sprite-animation";

export class CharacterFactory {
  private static _INSTANCE: CharacterFactory;

  private static readonly CHARACTER_BP: CharacterBPModel = <CharacterBPModel>(
    characterBPJSON
  );

  private static readonly RENDER_POSITIONS: Array<Vector2> = [
    Vector2.ZERO,
    Vector2.ONE_ZERO,
    Vector2.ZERO_ONE,
    Vector2.ONE,
  ];

  private constructor() {}

  public static GetInstance(): CharacterFactory {
    if (!CharacterFactory._INSTANCE) {
      CharacterFactory._INSTANCE = new CharacterFactory();
    }

    return CharacterFactory._INSTANCE;
  }

  public CreateCharacter(
    name: string,
    tileSetKey: string,
    isPlayer: boolean = false,
    position: Vector2 = new Vector2()
  ): void {
    const gameObject = new GameObject(
      name,
      GameObjectLayer.CHARACTER,
      position
    );

    const scene: Scene = SceneController.GetInstance().CurrentScene;

    const tileSet: TileSet = scene.GetTileSet(tileSetKey);

    scene.AddGameObject(gameObject);

    if (isPlayer) {
      scene.PlayerKey = name;
    }

    this.SetInputController(gameObject, isPlayer);
    this.SetMover(gameObject);
    this.SetRenderer(gameObject, tileSet, name);
    this.SetSpriteAnimator(gameObject);
  }

  private SetRenderer(
    gameObject: GameObject,
    tileSet: TileSet,
    name: string
  ): void {
    const renderer: Renderer = new Renderer(gameObject);
    gameObject.AddComponent(renderer);
    this.LoadSprites(renderer, gameObject, tileSet, name);
  }

  private SetInputController(gameObject: GameObject, isPlayer: boolean): void {
    if (isPlayer) {
      gameObject.AddComponent(new InputController(gameObject));
    }
  }

  private SetMover(gameObject: GameObject): void {
    gameObject.AddComponent(new Mover(gameObject));
  }

  private SetSpriteAnimator(gameObject: GameObject): void {
    const spriteAnimator: SpriteAnimator = new SpriteAnimator(gameObject);
    gameObject.AddComponent(spriteAnimator);

    this.LoadSpriteAnimations(spriteAnimator);
    this.LoadAnimationTransitions(spriteAnimator, gameObject);
  }

  private LoadSprites(
    renderer: Renderer,
    gameObject: GameObject,
    tileSet: TileSet,
    name: string
  ): void {
    CharacterFactory.CHARACTER_BP.sprites.forEach((spriteBP) => {
      const renderEntity: RenderEntity = new RenderEntity(
        name,
        tileSet,
        new Set<string>(spriteBP.tiles.map((tileBP) => tileBP.key)),
        gameObject.GridPosition
      );

      spriteBP.tiles.forEach((tileBP) => {
        renderEntity.AddTileRenderMap(
          tileBP.key,
          CharacterFactory.RENDER_POSITIONS[tileBP.positionKey]
        );
      });

      renderer.AddSprite(spriteBP.index, renderEntity);
    });
  }

  private LoadSpriteAnimations(spriteAnimator: SpriteAnimator): void {
    CharacterFactory.CHARACTER_BP.animations.forEach((animationBP) => {
      spriteAnimator.AddAnimation(
        new SpriteAnimation(
          animationBP.name,
          animationBP.sequence,
          animationBP.name.indexOf("walking") >= 0 ? "footstep" : ""
        )
      );
    });
  }

  private LoadAnimationTransitions(
    spriteAnimator: SpriteAnimator,
    gameObject: GameObject
  ): void {
    const mover: Mover = <Mover>gameObject.Components.get("Mover");

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
  }
}
