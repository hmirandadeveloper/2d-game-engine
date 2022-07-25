import { RenderEntity } from "../component/render/render-entity";
import { Vector2 } from "../utils/vector2";
import { GameObject } from "./game-object";

export class Character extends GameObject {
  readonly RenderEntity: RenderEntity;

  constructor(
    name: string,
    renderEntity: RenderEntity,
    position: Vector2 = Vector2.ZERO
  ) {
    super(name, position);
    this.RenderEntity = renderEntity;
  }
  Update(): void {}
}
