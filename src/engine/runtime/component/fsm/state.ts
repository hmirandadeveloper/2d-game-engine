import { IBehavior } from "./behavior.h";

export class State implements IBehavior {
  static readonly ENTRY_STATE = new State("Entry", <IBehavior>{ Execute() {} });

  readonly Name: string;

  private _behavior: IBehavior;

  /**
   * State's Constructor
   * @param {string} name
   * @param {IBehavior} behavior
   */
  constructor(name: string, behavior: IBehavior) {
    this.Name = name;
    this._behavior = behavior;
  }

  /**
   * Function to execute the behavior associated to the current State
   */
  Execute(): void {
    this._behavior.Execute();
  }
}
