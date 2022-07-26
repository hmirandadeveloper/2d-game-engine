import { Vector2 } from "./utils/vector2";
import { GameObject } from "./scene/game-object";
import { GridMapper } from "./utils/grid-mapper";
import { EngineElement } from "@engine-runtime/engine-element";

export class Camera extends EngineElement {
  public readonly GridFieldOfView: Vector2;

  private static _INSTANCE: Camera;

  private _target: GameObject | null;
  private _gridPosition: Vector2;
  private _pixelsPosition: Vector2;
  private _targetViewPosition: Vector2;

  get Target(): GameObject | null {
    return this._target;
  }

  set Target(target: GameObject | null) {
    this._target = target;

    this.UpdateTargetPosition();
  }

  get GridPosition(): Vector2 {
    return this._gridPosition;
  }

  get PixelsPosition(): Vector2 {
    return this._pixelsPosition;
  }

  private constructor() {
    super();
    this._target = null;
    this._gridPosition = Vector2.ZERO;
    this._pixelsPosition = Vector2.ZERO;

    this.GridFieldOfView = new Vector2(
      this.Config.Parameters.canvas.width / this.Config.Parameters.tile.size,
      this.Config.Parameters.canvas.heigth / this.Config.Parameters.tile.size
    );

    this._targetViewPosition = Vector2.Subtract(
      this.GridFieldOfView,
      new Vector2(2, 2)
    ).Divide(2);
  }

  public static GetInstance(): Camera {
    if (!Camera._INSTANCE) {
      Camera._INSTANCE = new Camera();
    }

    return Camera._INSTANCE;
  }

  public LoadPosition(): void {
    if (!this._target) {
      throw new Error("No target object");
    }

    this._gridPosition = Vector2.Subtract(
      this._targetViewPosition,
      this._target.GridPosition
    );

    this._pixelsPosition = GridMapper.PixelsCoordsFromGrid(this._gridPosition);
  }

  public Update(): void {
    this.LoadPosition();
  }

  public IsOccluded(gridPosition: Vector2): boolean {
    return (
      gridPosition.X + this._gridPosition.X > this.GridFieldOfView.X ||
      gridPosition.X < Vector2.ZERO.X ||
      gridPosition.Y + this._gridPosition.Y > this.GridFieldOfView.Y ||
      gridPosition.Y < Vector2.ZERO.Y
    );
  }

  private UpdateTargetPosition(): void {
    if (this._target) {
      this._target.GridPosition.X = 10;
      this._target.GridPosition.Y = 5;
    }
  }
}
