import { Vector2 } from "@engine-runtime/utils/vector2";
import { Tile } from "@engine-runtime/component/render/tile";
import { GridMapper } from "@engine-runtime/utils/grid-mapper";
import { RenderLayer } from "@engine-runtime/component/render/render-layer";

export class TileSet {
  readonly Name: string;
  readonly Tiles: Map<string, Tile>;

  private _image: HTMLImageElement;

  get Image(): HTMLImageElement {
    return this._image;
  }

  constructor(name: string, imageSrc: string) {
    this.Name = name;
    this._image = new Image();
    this._image.src = imageSrc;
    this.Tiles = new Map<string, Tile>();
  }

  public async Setup(): Promise<void> {
    await new Promise((resolve) => {
      this._image.onload = () => resolve(this.LoadTiles());
    });
  }

  public GetTiles(tilesCoords: Set<string>): Map<string, Tile> {
    if (!this.Tiles.size) {
      throw new Error("No tiles found");
    }

    let tiles = new Map<string, Tile>();

    tilesCoords.forEach((tileCoord) => {
      const tile = this.Tiles.get(tileCoord);
      if (tile) {
        tiles.set(tile.Coords.ToString(), tile);
      }
    });

    return tiles;
  }

  public SetTileLayer(tileKey: string, renderLayer: RenderLayer): void {
    let tile = this.Tiles.get(tileKey);

    if (tile) {
      tile.RenderLayer = renderLayer;
    }
  }

  private AddTile(coords: Vector2) {
    this.Tiles.set(coords.ToString(), new Tile(this, coords));
  }

  private LoadTiles(): void {
    if (!this.IsImageValid()) {
      throw new Error("Invalid tilable image size");
    }

    const horizontalTiles = this._image.width / GridMapper.GRID_PIXELS_SCALE;
    const verticalTiles = this._image.height / GridMapper.GRID_PIXELS_SCALE;

    for (let x = 0; x < horizontalTiles; x++) {
      for (let y = 0; y < verticalTiles; y++) {
        this.AddTile(new Vector2(x, y));
      }
    }
  }

  private IsImageValid(): boolean {
    return (
      this._image.width > 0 &&
      this._image.height > 0 &&
      this._image.width % GridMapper.GRID_PIXELS_SCALE === 0 &&
      this._image.height % GridMapper.GRID_PIXELS_SCALE === 0
    );
  }
}
