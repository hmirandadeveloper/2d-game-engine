import { Vector2PrefabModel } from "@engine-runtime/scene/loader/models/vector2-prefab.model";

export interface CharacterPrefabModel {
  readonly name: string;
  readonly spriteKey: string;
  readonly sprites: Array<CharacterSpritePrefabModel>;
  readonly animations: Array<CharacterAnimationPrefabModel>;
}

interface CharacterSpritePrefabModel {
  readonly index: number;
  readonly name: string;
  readonly tiles: Array<CharacterTilePrefabModel>;
}

interface CharacterTilePrefabModel {
  key: string;
  position: Vector2PrefabModel;
}

interface CharacterAnimationPrefabModel {
  name: string;
  sequence: Array<number>;
}
