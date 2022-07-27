import { BaseComponent } from "@engine-runtime/component/base-component";
import { IBehavior } from "@engine-runtime/component/fsm/behavior.h";
import { GameInput } from "@engine-runtime/component/input/input";
import { InputController } from "@engine-runtime/component/input/input-controller";
import { GameObject } from "@engine-runtime/scene/game-object";

export class ActionController extends BaseComponent {
  static readonly ACTION_INPUTS: Array<GameInput> = [
    GameInput.ACTION,
    GameInput.ESCAPE,
  ];

  readonly InputController: InputController;
  private _onTriggerActions: Map<GameInput, IBehavior>;

  constructor(owner: GameObject) {
    super(owner, ActionController.name);
    this.InputController = <InputController>(
      owner.Components.get(InputController.name)
    );
    this._onTriggerActions = new Map<GameInput, IBehavior>();
  }

  public Update(): void {
    const gameOutput: GameInput =
      this.InputController.CurrentInputSource.GameOutput();

    if (!ActionController.ACTION_INPUTS.includes(gameOutput)) {
      return;
    }

    switch (gameOutput) {
      case GameInput.ACTION:
        if (this._onTriggerActions.has(GameInput.ACTION)) {
          (<IBehavior>this._onTriggerActions.get(GameInput.ACTION)).Execute();
        }
        break;
      case GameInput.ESCAPE:
        if (this._onTriggerActions.has(GameInput.ESCAPE)) {
          (<IBehavior>this._onTriggerActions.get(GameInput.ESCAPE)).Execute();
        }
        break;
    }

    this.InputController.CurrentInputSource.Clear();
  }

  public AddAction(input: GameInput, callback: IBehavior) {
    if (ActionController.ACTION_INPUTS.includes(input)) {
      this._onTriggerActions.set(input, callback);
    }
  }
}
