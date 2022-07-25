export interface MapPrefabModel {
  readonly name: string;
  readonly tiles: Array<string>;
  readonly tileSet: string;
  readonly renderLines: Map<number, Array<MapRenderTileBlockPrefabModel>>;
}

interface MapRenderTileBlockPrefabModel {
  readonly tileId: string;
  readonly repeatAmount: number;
}
