import { Vector2PrefabModel } from "@engine-runtime/scene/loader/models/vector2-prefab.model";

export interface ScenePrefabModel {
  readonly name: string;
  readonly map: string;
  readonly backgroundAudioFileName: string;
  readonly tileSetKeyNames: Array<string>;
  readonly characters: Array<ScenePrefabCharacterModel>;
}

interface ScenePrefabCharacterModel {
  readonly key: string;
  readonly tileSetKey: number;
  readonly position: Vector2PrefabModel;
  readonly isPlayer: boolean;
}
