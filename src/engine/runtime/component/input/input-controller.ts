import { GameObject } from "../../scene/game-object";
import { BaseComponent } from "../base-component";
import { IInputSourceAdapter } from "./input-source-adapter.h";
import { Keyboard } from "./sources/keyboard";

export class InputController extends BaseComponent {
  static readonly DEFAULT_KEYBOARD: IInputSourceAdapter = new Keyboard();

  readonly InputSources: Map<string, IInputSourceAdapter>;

  private _currentInputSource: IInputSourceAdapter;

  get CurrentInputSource(): IInputSourceAdapter {
    return this._currentInputSource;
  }

  constructor(
    owner: GameObject,
    defaultInputSource: IInputSourceAdapter = InputController.DEFAULT_KEYBOARD
  ) {
    super(owner, InputController.name);
    this.InputSources = new Map<string, IInputSourceAdapter>();
    this.AddInputSource(defaultInputSource);
    this._currentInputSource = defaultInputSource;
    this._currentInputSource.Setup();
  }

  public SetCurrentInputSource(inputDeviceKey: string): void {
    if (this.InputSources.has(inputDeviceKey)) {
      this._currentInputSource = <IInputSourceAdapter>(
        this.InputSources.get(inputDeviceKey)
      );

      this._currentInputSource.Setup();
    }
  }

  public AddInputSource(inputSource: IInputSourceAdapter): void {
    this.InputSources.set(inputSource.Name, inputSource);
  }

  public Update(): void {}
}
