import { GameObject } from "@engine-runtime/scene/game-object";

export interface IComponent {
  readonly Name: string;
  readonly Owner: GameObject;
  Update(): void;
}
