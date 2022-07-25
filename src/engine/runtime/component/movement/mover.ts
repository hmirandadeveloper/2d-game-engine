import { GameObject } from "../../scene/game-object";
import { BaseComponent } from "../base-component";
import { GameInput } from "../input/input";
import { InputController } from "../input/input-controller";
import config from "../../config/config.json";
import { Vector2 } from "../../utils/vector2";

export class Mover extends BaseComponent {
  static readonly MOVEMENT_INPUTS: Array<GameInput> = [
    GameInput.UP,
    GameInput.DOWN,
    GameInput.LEFT,
    GameInput.RIGHT,
  ];

  readonly InputController: InputController;
  readonly MaxTravelDistance: number;

  private _maxSpeed: number;
  private _acceleration: number;
  private _currentSpeed: number;
  private _moveAxis: Vector2;
  private _travelledDistance: number;

  get MaxSpeed(): number {
    return this._maxSpeed;
  }

  set MaxSpeed(speed: number) {
    this._maxSpeed = speed;
  }

  get Aceleration(): number {
    return this._acceleration;
  }

  set Aceleration(acceleration: number) {
    this._acceleration = acceleration;
  }

  get MoveAxis(): Vector2 {
    return this._moveAxis;
  }

  constructor(owner: GameObject) {
    super(owner, Mover.name);

    this.InputController = <InputController>(
      owner.Components.get(InputController.name)
    );

    this.MaxTravelDistance = 1;
    this._moveAxis = new Vector2();

    this._maxSpeed = config.movement.maxSpeed / 1000;
    this._acceleration = config.movement.acceleration / 1000;
    this._currentSpeed = 0;
    this._travelledDistance = 0;
  }

  public Update(): void {
    if (!this.InputController) {
      return;
    }

    const gameOutput: GameInput =
      this.InputController.CurrentInputSource.GameOutput();

    if (
      this._moveAxis.IsEmpty() &&
      !Mover.MOVEMENT_INPUTS.includes(gameOutput)
    ) {
      return;
    }

    if (this._moveAxis.IsEmpty()) {
      this.LoadMoveAxis();
    }

    this._currentSpeed = Math.min(
      this._currentSpeed + this._acceleration,
      this.MaxSpeed
    );

    this._travelledDistance = Math.min(
      this._travelledDistance + this._currentSpeed,
      this.MaxTravelDistance
    );

    if (this._travelledDistance === this.MaxTravelDistance) {
      this._currentSpeed = 0;
      this._travelledDistance = 0;
      this._moveAxis.Clear();
    }

    if (this._moveAxis.Y !== 0) {
      this.Owner.GridPosition.Y += this._currentSpeed * this._moveAxis.Y;
    } else {
      this.Owner.GridPosition.X += this._currentSpeed * this._moveAxis.X;
    }
  }

  private LoadMoveAxis() {
    switch (this.InputController.CurrentInputSource.GameOutput()) {
      case GameInput.UP:
        this._moveAxis.Y = -1;
        break;
      case GameInput.DOWN:
        this._moveAxis.Y = 1;
        break;
      case GameInput.LEFT:
        this._moveAxis.X = -1;
        break;
      case GameInput.RIGHT:
        this._moveAxis.X = 1;
        break;
    }
  }
}
