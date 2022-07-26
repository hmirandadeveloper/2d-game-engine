import { IComponent } from "./component.h";
import { GameObject } from "@engine-runtime/scene/game-object";
import { EngineElement } from "@engine-runtime/engine-element";

export abstract class BaseComponent
  extends EngineElement
  implements IComponent
{
  readonly Name: string;
  readonly Owner: GameObject;

  constructor(owner: GameObject, name: string) {
    super();
    this.Name = name;
    this.Owner = owner;
  }

  abstract Update(): void;
}
