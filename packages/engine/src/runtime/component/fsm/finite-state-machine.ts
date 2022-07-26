import { State } from "./state";
import { IBehavior } from "./behavior.h";
import { IEvaluable } from "./evaluable.h";
import { StateTransition } from "./state-transition";
import { GameObject } from "@engine-runtime/scene/game-object";
import { BaseComponent } from "@engine-runtime/component/base-component";

export class FiniteStateMachine extends BaseComponent {
  private static _EMPTY_TRANSITIONS: Set<StateTransition> =
    new Set<StateTransition>();

  private _currentState: State;
  private _states: Map<string, State>;
  private _priorityTransitions: Set<StateTransition>;
  private _transitions: Map<string, Set<StateTransition>>;

  get CurrentState(): State {
    return this._currentState;
  }

  get States(): Map<string, State> {
    return this._states;
  }

  get PriorityTransitions(): Set<StateTransition> {
    return this._priorityTransitions;
  }

  get Transitions(): Map<string, Set<StateTransition>> {
    return this._transitions;
  }

  constructor(owner: GameObject) {
    super(owner, FiniteStateMachine.name);
    this._currentState = State.ENTRY_STATE;
    this._states = new Map<string, State>();
    this._priorityTransitions = new Set<StateTransition>();
    this._transitions = new Map<string, Set<StateTransition>>();
  }

  public AddState(name: string, behavior: IBehavior): void {
    this._states.set(name, new State(name, behavior));
  }

  public DeleteState(state: State): void {
    this._states.delete(state.Name);
  }

  public AddPriorityTransition(toState: State, predicate: IEvaluable): void {
    this._priorityTransitions.add(new StateTransition(toState, predicate));
  }

  public DeletePriorityTransition(transition: StateTransition): void {
    this._priorityTransitions.delete(transition);
  }

  public AddTransition(
    fromStateKey: string,
    toStateKey: string,
    predicate: IEvaluable
  ): void {
    let transition = new StateTransition(
      <State>this.States.get(toStateKey),
      predicate
    );

    if (!this._transitions.has(fromStateKey)) {
      let transitions = new Set<StateTransition>();
      transitions.add(transition);

      this._transitions.set(fromStateKey, transitions);
      return;
    }

    this._transitions.get(fromStateKey)?.add(transition);
  }

  public DeleteTransition(
    fromStateKey: string,
    transition: StateTransition
  ): void {
    this._transitions.get(fromStateKey)?.delete(transition);

    if (!this._transitions.get(fromStateKey)?.size) {
      this._transitions.delete(fromStateKey);
    }
  }

  public Update(): void {
    if (!this._states.size) {
      return;
    }

    if (this._currentState === State.ENTRY_STATE) {
      const [first] = this._states.values();
      this._currentState = first;
    }

    this._currentState.Execute();

    const transition = this.GetTransition();

    if (transition) {
      this._currentState = transition.To;
    }
  }

  private GetTransition(): StateTransition | null {
    for (const priorityTransition of this.PriorityTransitions) {
      if (priorityTransition.Evaluate()) {
        return priorityTransition;
      }
    }

    for (const transition of this.Transitions.get(this.CurrentState.Name) ??
      FiniteStateMachine._EMPTY_TRANSITIONS) {
      if (transition.Evaluate()) {
        return transition;
      }
    }

    return null;
  }
}
