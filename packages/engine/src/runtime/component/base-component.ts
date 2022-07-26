import { IComponent } from "./component.h";
import { GameObject } from "@engine-runtime/scene/game-object";

export abstract class BaseComponent implements IComponent {
  readonly Name: string;
  readonly Owner: GameObject;

  constructor(owner: GameObject, name: string) {
    this.Name = name;
    this.Owner = owner;
  }

  abstract Update(): void;
}
