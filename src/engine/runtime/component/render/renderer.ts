import { GameObject } from "@engine-runtime/scene/game-object";
import { BaseComponent } from "@engine-runtime/component/base-component";
import { RenderEntity } from "@engine-runtime/component/render/render-entity";

export class Renderer extends BaseComponent {
  readonly Owner: GameObject;
  readonly Sprites: Map<number, RenderEntity>;

  private _currentSprite: RenderEntity | null;

  get CurrentSprite(): RenderEntity | null {
    return this._currentSprite;
  }

  constructor(owner: GameObject) {
    super(owner, Renderer.name);
    this.Owner = owner;
    this.Sprites = new Map<number, RenderEntity>();
    this._currentSprite = null;
  }

  public AddSprite(index: number, renderEntity: RenderEntity): Renderer {
    this.Sprites.set(index, renderEntity);
    return this;
  }

  public SetCurrentSprite(index: number): void {
    this._currentSprite = this.Sprites.get(index) ?? null;
  }

  public Update(): void {
    if (this.Sprites.size <= 0) {
      throw new Error("Empty Renderer");
    }

    if (this._currentSprite === null) {
      this._currentSprite = this.Sprites.get(0) ?? null;
    }

    if (this._currentSprite) {
      this._currentSprite.RelativeGridPosition = this.Owner.GridPosition;
    }
  }
}
