import { IEvaluable } from "./evaluable.h";

export abstract class BaseTransition<T> implements IEvaluable {
  readonly To: T;
  private _predicate: IEvaluable;

  /**
   * Abstract Base Transition's Constructor
   * @param {T} to
   * @param {IEvaluable} predicate
   */
  constructor(to: T, predicate: IEvaluable) {
    this.To = to;
    this._predicate = predicate;
  }

  /**
   * Function to evaluate the predicate associated to the current transition
   * @returns {boolean}
   */
  Evaluate(): boolean {
    return this._predicate.Evaluate();
  }
}
