import { BaseTransition } from "./base-transition";
import { IEvaluable } from "./evaluable.h";
import { State } from "./state";

export class StateTransition extends BaseTransition<State> {
  /**
   * State Transition's Constructor
   * @param {State} to
   * @param {IEvaluable} predicate
   */
  constructor(to: State, predicate: IEvaluable) {
    super(to, predicate);
  }
}
