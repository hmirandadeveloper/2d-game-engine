import { Vector2 } from "@engine-runtime/utils/vector2";
import { GameObject } from "@engine-runtime/scene/game-object";
import { Mover } from "@engine-runtime/component/movement/mover";
import { IBehavior } from "@engine-runtime/component/fsm/behavior.h";
import { BaseComponent } from "@engine-runtime/component/base-component";
import { RenderOrchestrator } from "@engine-runtime/component/render/render-orchestrator";

export class Collider extends BaseComponent {
  readonly RenderOrchestrator: RenderOrchestrator;
  readonly Mover: Mover;

  private _onCollisionCallback: IBehavior;
  private _hasCollision: boolean;
  private _charactersOnTriggerRange: Set<GameObject>;
  private _triggerRange: Vector2;

  get OnCollisionCallback(): IBehavior {
    return this._onCollisionCallback;
  }

  set OnCollisionCallback(onCollisionCallback: IBehavior) {
    this._onCollisionCallback = onCollisionCallback;
  }

  get HasCollision(): boolean {
    return this._hasCollision;
  }

  get CharactersOnTriggerRange(): Set<GameObject> {
    return this._charactersOnTriggerRange;
  }

  get TriggerRange(): Vector2 {
    return this._triggerRange;
  }

  set TriggerRange(triggerRange: Vector2) {
    this._triggerRange = triggerRange;
  }

  constructor(owner: GameObject) {
    super(owner, Collider.name);

    if (!this.Owner.Components.has(Mover.name)) {
      throw new Error("No Mover found");
    }

    this.Mover = <Mover>this.Owner.Components.get(Mover.name);

    this._onCollisionCallback = <IBehavior>{
      Execute() {
        return;
      },
    };
    this._hasCollision = false;
    this.RenderOrchestrator = RenderOrchestrator.GetInstance();
    this._charactersOnTriggerRange = new Set<GameObject>();
    this._triggerRange = Vector2.ZERO;
  }

  public Update(): void {
    this.DetectCollision();

    if (this._hasCollision) {
      this.OnCollision();
    }

    this.DetectCollisionOnTriggerRange();
  }

  private OnCollision(): void {
    this.OnCollisionCallback.Execute();
  }

  private DetectCollision(): void {
    const destinationPosition = new Vector2(
      Math.floor(this.Owner.GridPosition.X + 1) + 1 * this.Mover.MoveAxis.X,
      Math.round(this.Owner.GridPosition.Y + 1) + 1 * this.Mover.MoveAxis.Y
    );

    this._hasCollision = this.RenderOrchestrator.CollisionPoints.has(
      destinationPosition.ToString()
    );
  }

  private DetectCollisionOnTriggerRange(): void {
    this._charactersOnTriggerRange = new Set<GameObject>();
    for (let x = 0; x < this._triggerRange.X; x++) {
      for (let y = 0; y < this._triggerRange.Y; y++) {
        const triggerBoundA = new Vector2(
          Math.floor(this.Owner.GridPosition.X + x),
          Math.round(this.Owner.GridPosition.Y + y)
        );

        const triggerBoundB = new Vector2(
          Math.floor(this.Owner.GridPosition.X - x),
          Math.round(this.Owner.GridPosition.Y - y)
        );

        let character: GameObject | null =
          this.RenderOrchestrator.Characters.get(triggerBoundA.ToString()) ??
          null;

        if (character) {
          this._charactersOnTriggerRange.add(character);
        }

        character =
          this.RenderOrchestrator.Characters.get(triggerBoundB.ToString()) ??
          null;

        if (character) {
          this._charactersOnTriggerRange.add(character);
        }
      }
    }
  }
}
