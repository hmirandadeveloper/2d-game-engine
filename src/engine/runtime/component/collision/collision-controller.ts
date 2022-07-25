import { GameObject } from "../../scene/game-object";
import { Vector2 } from "../../utils/vector2";
import { BaseComponent } from "../base-component";

export class CollisionController extends BaseComponent {
  readonly CollisionPoints: Array<Vector2>;

  constructor(owner: GameObject) {
    super(owner, CollisionController.name);
  }

  public Update(): void {}
}
