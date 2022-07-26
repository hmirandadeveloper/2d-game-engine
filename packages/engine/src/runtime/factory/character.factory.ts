import { Vector2 } from "@engine-runtime/utils/vector2";
import { GameObject } from "@engine-runtime/scene/game-object";

// TODO: New Feature (Core Funcionality): v1.2.0
export class CharacterFactory {
  private _gameObject: GameObject;

  get GameObject(): GameObject {
    return this._gameObject;
  }

  constructor(name: string, gridPosition: Vector2 = new Vector2()) {
    this._gameObject = this.CreateGameObject(name, gridPosition);
  }

  public CreateGameObject(name: string, gridPosition: Vector2): GameObject {
    return new GameObject(name, gridPosition);
  }

  // TODO: New Feature (Core Funcionality): v1.2.0
  //public SetRenderer(): void {}
  //public SetSpriteAnimator(): void {}
  //public SetMover(): void {}
  //public SetMover(): void {}

  //public AddSprite(): void {}
  //public AddSpriteAnimation(): void {}
  //public AddBasicSpriteAnimations(): void {}
}
