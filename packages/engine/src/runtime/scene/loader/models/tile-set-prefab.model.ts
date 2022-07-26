export interface TileSetPrefabModel {
  readonly name: string;
  readonly imageSrc: string;
  readonly layers: Array<TileSetPrefabLayerModel>;
}

interface TileSetPrefabLayerModel {
  readonly tileKey: string;
  readonly layer: number;
}
