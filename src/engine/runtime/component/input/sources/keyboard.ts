import { GameInput } from "../input";
import { IInputSourceAdapter } from "../input-source-adapter.h";
import { KeyboardValidKeys } from "./keyboard-valid-keys";

export class Keyboard implements IInputSourceAdapter {
  private static _VALID_KEYS: Array<string> = Object.values(KeyboardValidKeys);

  public readonly Name: string;

  private _keyPressed: string;

  constructor() {
    this.Name = Keyboard.name;
    this._keyPressed = "";
  }

  public Setup(): void {
    document.addEventListener("keydown", (keyDown: KeyboardEvent) => {
      if (Keyboard._VALID_KEYS.includes(keyDown.code as KeyboardValidKeys)) {
        this._keyPressed = keyDown.code;
      }
    });

    document.addEventListener("keyup", () => {
      this._keyPressed = "";
    });
  }

  public GameOutput(): GameInput {
    switch (this._keyPressed) {
      case KeyboardValidKeys.ARROW_UP:
        return GameInput.UP;
      case KeyboardValidKeys.W:
        return GameInput.UP;
      case KeyboardValidKeys.ARROW_DOWN:
        return GameInput.DOWN;
      case KeyboardValidKeys.S:
        return GameInput.DOWN;
      case KeyboardValidKeys.ARROW_LEFT:
        return GameInput.LEFT;
      case KeyboardValidKeys.A:
        return GameInput.LEFT;
      case KeyboardValidKeys.ARROW_RIGHT:
        return GameInput.RIGHT;
      case KeyboardValidKeys.D:
        return GameInput.RIGHT;
      case KeyboardValidKeys.SPACE:
        return GameInput.ACTION;
      case KeyboardValidKeys.ESC:
        return GameInput.ESCAPE;

      default:
        return GameInput.NONE;
    }
  }
}
