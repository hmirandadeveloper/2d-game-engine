import { Vector2 } from "@engine-runtime/utils/vector2";
import { GridMapper } from "@engine-runtime/utils/grid-mapper";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { RenderLayer } from "@engine-runtime/component/render/render-layer";
import { RenderOrchestrator } from "@engine-runtime/component/render/render-orchestrator";

export class Tile {
  readonly Image: CanvasImageSource;
  readonly Coords: Vector2;
  readonly RenderOrchestrator: RenderOrchestrator;

  private readonly PixelCoords: Vector2;

  private _renderLayer: RenderLayer;

  get RenderLayer(): RenderLayer {
    return this._renderLayer;
  }

  set RenderLayer(renderLayer: RenderLayer) {
    this._renderLayer = renderLayer;
  }

  constructor(
    tileSet: TileSet,
    coords: Vector2,
    renderLayer: RenderLayer = RenderLayer.FLOOR_LAYER
  ) {
    this.Image = tileSet.Image;
    this.Coords = coords;
    this.PixelCoords = GridMapper.PixelsCoordsFromGrid(coords);
    this._renderLayer = renderLayer;
    this.RenderOrchestrator = RenderOrchestrator.GetInstance();
  }

  public Draw(
    combinedGridPosition: Vector2,
    cameraPixelsPosition: Vector2
  ): void {
    const combinedPixelsPosition: Vector2 =
      GridMapper.PixelsCoordsFromGrid(combinedGridPosition);

    this.RenderOrchestrator.Canvas.CanvasContext.drawImage(
      this.Image,
      this.PixelCoords.X,
      this.PixelCoords.Y,
      GridMapper.GRID_PIXELS_SCALE,
      GridMapper.GRID_PIXELS_SCALE,
      Math.round(combinedPixelsPosition.X + cameraPixelsPosition.X),
      Math.round(combinedPixelsPosition.Y + cameraPixelsPosition.Y),
      GridMapper.GRID_PIXELS_SCALE,
      GridMapper.GRID_PIXELS_SCALE
    );
  }
}
