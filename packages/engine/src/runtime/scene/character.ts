import { GameObject } from "./game-object";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { RenderEntity } from "@engine-runtime/component/render/render-entity";

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
