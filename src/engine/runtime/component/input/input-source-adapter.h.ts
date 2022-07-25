import { GameInput } from "./input";

export interface IInputSourceAdapter {
  readonly Name: string;
  Setup(): void;
  GameOutput(): GameInput;
}
