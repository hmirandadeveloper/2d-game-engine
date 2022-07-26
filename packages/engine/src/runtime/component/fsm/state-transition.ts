import { State } from "./state";
import { IEvaluable } from "./evaluable.h";
import { BaseTransition } from "./base-transition";

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
