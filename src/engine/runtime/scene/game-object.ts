import { IComponent } from "../component/component.h";
import { Vector2 } from "../utils/vector2";

export class GameObject {
  readonly Name: string;

  private _gridPosition: Vector2;
  private _components: Map<string, IComponent>;

  get GridPosition(): Vector2 {
    return this._gridPosition;
  }

  set GridPosition(gridPosition: Vector2) {
    this._gridPosition = gridPosition;
  }

  get Components(): Map<string, IComponent> {
    return this._components;
  }

  constructor(name: string, gridPosition: Vector2 = new Vector2()) {
    this.Name = GameObject.FormatName(name);
    this._components = new Map<string, IComponent>();
    this._gridPosition = gridPosition;
  }

  public AddComponent(component: IComponent): GameObject {
    this._components.set(component.Name, component);
    return this;
  }

  // public AddComponent<TComponent extends IComponent>(
  //   type: new (owner: GameObject) => TComponent
  // ): GameObject {
  //   const component: TComponent = new type(this);
  //   this._components.set(component.Name, component);
  //   return this;
  // }

  public Update(): void {
    this._components.forEach((component) => {
      component.Update();
    });
  }

  public static FormatName(name: string): string {
    return `go_${name.toLocaleLowerCase()}`;
  }
}
