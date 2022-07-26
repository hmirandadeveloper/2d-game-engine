import config from "@engine-config";

export class SpriteAnimation {
  static readonly SIMPLE_IDLE_ANIMATION: SpriteAnimation = new SpriteAnimation(
    "idle_front"
  );

  readonly Name: string;
  readonly Sequence: Array<number>;
  readonly Audio: HTMLAudioElement | null;
  readonly DurationRate: number;

  private _currentSequenceIndex: number;

  get CurrentSequenceIndex(): number {
    return this.Sequence[this._currentSequenceIndex];
  }

  constructor(
    name: string,
    sequence: Array<number> = [0],
    audioFileName: string = "",
    durationRate: number = config.animation.durationRate
  ) {
    this.Name = name;
    this.Sequence = sequence;
    this._currentSequenceIndex = sequence[0];
    this.DurationRate = durationRate;
    this.Audio = null;

    if (audioFileName.trim().length) {
      this.Audio = new Audio(
        `${config.assets.src}/sounds/${audioFileName.trim()}.${
          config.assets.soundExtension
        }`
      );

      /**
       * Most browsers stop playing audio outside playbackRate bounds of 0.5 and 4, leaving the video playing silently.
       * For most applications, it's recommended that you limit the range to between 0.5 and 4.
       * https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/WebAudio_playbackRate_explained
       */
      this.Audio.playbackRate = Math.min(
        Math.max((config.animation.velocity * 100) / 1.8, 0.5),
        4
      );
    }
  }

  public NextSequenceIndex(): void {
    if (this.Audio) {
      this.Audio.play();
    }

    if (this.Sequence.length > 1) {
      if (this._currentSequenceIndex < this.Sequence.length - 1) {
        this._currentSequenceIndex++;
        return;
      }

      this._currentSequenceIndex = 0;
    }
  }
}
