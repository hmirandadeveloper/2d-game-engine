import { GameObject } from "./scene/game-object";
import { GridMapper } from "./utils/grid-mapper";
import { Vector2 } from "./utils/vector2";

export class Camera {
  private static _INSTANCE: Camera;

  private _target: GameObject | null;
  private _gridPosition: Vector2;
  private _pixelsPosition: Vector2;

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
    this._target = null;
    this._gridPosition = Vector2.ZERO;
    this._pixelsPosition = Vector2.ZERO;
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
      new Vector2(10, 5),
      this._target.GridPosition
    );

    this._pixelsPosition = GridMapper.PixelsCoordsFromGrid(this._gridPosition);
  }

  public Update(): void {
    this.LoadPosition();
  }

  private UpdateTargetPosition(): void {
    if (this._target) {
      this._target.GridPosition.X = 10;
      this._target.GridPosition.Y = 5;
    }
  }
}
