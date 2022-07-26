export interface CharacterBPModel {
  readonly sprites: Array<SpriteBPModel>;
  readonly animations: Array<AnimationBPModel>;
}

interface SpriteBPModel {
  readonly index: number;
  readonly name: string;
  readonly tiles: Array<TileBPModel>;
}

interface TileBPModel {
  readonly key: string;
  readonly positionKey: number;
}

interface AnimationBPModel {
  readonly name: string;
  readonly sequence: Array<number>;
}
