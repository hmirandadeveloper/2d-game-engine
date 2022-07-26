// import { Vector2 } from "@engine-runtime/utils/vector2";
import { GameObject } from "@engine-runtime/scene/game-object";
import { BaseComponent } from "@engine-runtime/component/base-component";

// TODO: New Feature (Core Funcionality): v1.3.0
export class CollisionController extends BaseComponent {
  // readonly CollisionPoints: Array<Vector2>;

  constructor(owner: GameObject) {
    super(owner, CollisionController.name);
  }

  public Update(): void {}

  public OnCollision(): void {}
}
