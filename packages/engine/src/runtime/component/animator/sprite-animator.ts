import config from "@engine-config";
import { SpriteAnimation } from "./sprite-animation";
import { State } from "@engine-runtime/component/fsm/state";
import { GameObject } from "@engine-runtime/scene/game-object";
import { Renderer } from "@engine-runtime/component/render/renderer";
import { IBehavior } from "@engine-runtime/component/fsm/behavior.h";
import { IEvaluable } from "@engine-runtime/component/fsm/evaluable.h";
import { BaseComponent } from "@engine-runtime/component/base-component";
import { FiniteStateMachine } from "@engine-runtime/component/fsm/finite-state-machine";

export class SpriteAnimator extends BaseComponent {
  readonly Velocity: number = config.animation.velocity;
  readonly FiniteStateMachine: FiniteStateMachine;

  private _renderer: Renderer;
  private _animations: Map<string, SpriteAnimation>;
  private _currentAnimation: SpriteAnimation;
  private _speedFactor: number;
  private _counter: number;

  get CurrentAnimation(): SpriteAnimation {
    return this._currentAnimation;
  }

  get SpeedFactor(): number {
    return this._speedFactor;
  }

  set SpeedFactor(speedFactor: number) {
    this._speedFactor = speedFactor;
  }

  constructor(
    owner: GameObject,
    idleAnimation: SpriteAnimation = SpriteAnimation.SIMPLE_IDLE_ANIMATION
  ) {
    super(owner, SpriteAnimator.name);
    this.FiniteStateMachine = new FiniteStateMachine(owner);
    this._renderer = <Renderer>this.Owner.Components.get(Renderer.name);
    this._animations = new Map<string, SpriteAnimation>();
    this._currentAnimation = idleAnimation;
    this._speedFactor = 1;
    this._counter = 0;

    this.AddAnimation(idleAnimation);
  }

  public AddAnimation(spriteAnimation: SpriteAnimation): SpriteAnimator {
    if (this._animations.size === 1) {
      this._currentAnimation = spriteAnimation;
    }

    this._animations.set(spriteAnimation.Name, spriteAnimation);
    const spriteAnimator: SpriteAnimator = this;
    this.FiniteStateMachine.AddState(spriteAnimation.Name, <IBehavior>{
      Execute() {
        if (spriteAnimator.CurrentAnimation.Name !== spriteAnimation.Name) {
          spriteAnimator.SetAnimation(spriteAnimation.Name);
        }
      },
    });
    return this;
  }

  public CreateAnimationTransition(
    toAnimationKey: string,
    predicate: IEvaluable,
    fromAnimationKey: string = ""
  ): void {
    const animationState: State = <State>(
      this.FiniteStateMachine.States.get(toAnimationKey)
    );
    if (fromAnimationKey.trim().length === 0) {
      this.FiniteStateMachine.AddPriorityTransition(animationState, predicate);
      return;
    }

    this.FiniteStateMachine.AddTransition(
      fromAnimationKey,
      toAnimationKey,
      predicate
    );
  }

  public SetAnimation(animationName: string) {
    this._currentAnimation = <SpriteAnimation>(
      this._animations.get(animationName)
    );
  }

  public Update(): void {
    this.FiniteStateMachine.Update();

    this._counter += this.Velocity * this.SpeedFactor;

    if (this._counter >= this._currentAnimation.DurationRate) {
      this._currentAnimation.NextSequenceIndex();
      this._renderer.SetCurrentSprite(
        this._currentAnimation.CurrentSequenceIndex
      );

      this._counter = 0;
    }
  }
}
