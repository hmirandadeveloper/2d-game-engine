export interface MapPrefabModel {
  readonly name: string;
  readonly tiles: Array<string>;
  readonly tileSet: string;
  readonly renderLines: Array<MapRenderLinePrefabModel>;
}

interface MapRenderLinePrefabModel {
  readonly line: number;
  readonly repeatAmount: number;
  readonly tileBlocks: Array<MapRenderTileBlockPrefabModel>;
}

interface MapRenderTileBlockPrefabModel {
  readonly tileId: string;
  readonly startXPos: number;
  readonly repeatAmount: number;
}
