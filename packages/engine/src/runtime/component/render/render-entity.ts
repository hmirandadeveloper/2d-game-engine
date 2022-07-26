import { Tile } from "./tile";
import { TileSet } from "./tile-set";
import { Vector2 } from "@engine-runtime/utils/vector2";

export class RenderEntity {
  readonly Name: string;
  readonly Tiles: Map<string, Tile>;
  readonly TilesRenderMap: Map<Vector2, string>;

  private _relativeGridPosition: Vector2;

  get RelativeGridPosition(): Vector2 {
    return this._relativeGridPosition;
  }

  set RelativeGridPosition(relativeGridPosition: Vector2) {
    this._relativeGridPosition = relativeGridPosition;
  }

  constructor(
    name: string,
    tileSet: TileSet,
    tilesCoords: Set<string>,
    relativeGridPosition: Vector2 = Vector2.ZERO
  ) {
    this.Name = RenderEntity.FormatName(name);
    this.Tiles = tileSet.GetTiles(tilesCoords);
    this.TilesRenderMap = new Map<Vector2, string>();
    this._relativeGridPosition = relativeGridPosition;
  }

  public AddTileRenderMap(
    tileCoord: string,
    renderPosition: Vector2
  ): RenderEntity {
    this.TilesRenderMap.set(renderPosition, tileCoord);
    return this;
  }

  public static FormatName(name: string): string {
    return `re_${name.toLocaleLowerCase()}`;
  }
}
