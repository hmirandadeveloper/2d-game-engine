import { Camera } from "@engine-runtime/camera";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { GridMapper } from "@engine-runtime/utils/grid-mapper";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { RenderLayers } from "@engine-runtime/component/render/render-layer";
import { RenderOrchestrator } from "@engine-runtime/component/render/render-orchestrator";

export class Tile {
  readonly Image: CanvasImageSource;
  readonly Coords: Vector2;
  readonly RenderOrchestrator: RenderOrchestrator;

  private readonly PixelCoords: Vector2;

  private _renderLayer: RenderLayers;
  private _camera: Camera;

  get RenderLayers(): RenderLayers {
    return this._renderLayer;
  }

  public set RenderLayers(renderLayer: RenderLayers) {
    this._renderLayer = renderLayer;
  }

  constructor(
    tileSet: TileSet,
    coords: Vector2,
    renderLayer: RenderLayers = RenderLayers.FLOOR_LAYER
  ) {
    this.Image = tileSet.Image;
    this.Coords = coords;
    this.PixelCoords = GridMapper.PixelsCoordsFromGrid(coords);
    this._renderLayer = renderLayer;
    this.RenderOrchestrator = RenderOrchestrator.GetInstance();
    this._camera = Camera.GetInstance();
  }

  public Draw(
    relativeGridPosition: Vector2,
    renderGridPosition: Vector2
  ): void {
    const gridPosition = Vector2.Sum(relativeGridPosition, renderGridPosition);

    if (this._camera.IsOccluded(gridPosition)) {
      return;
    }

    const finalPosition: Vector2 =
      GridMapper.PixelsCoordsFromGrid(gridPosition);

    this.RenderOrchestrator.Canvas.CanvasContext.drawImage(
      this.Image,
      this.PixelCoords.X,
      this.PixelCoords.Y,
      GridMapper.GRID_PIXELS_SCALE,
      GridMapper.GRID_PIXELS_SCALE,
      Math.round(finalPosition.X + this._camera.PixelsPosition.X),
      Math.round(finalPosition.Y + this._camera.PixelsPosition.Y),
      GridMapper.GRID_PIXELS_SCALE,
      GridMapper.GRID_PIXELS_SCALE
    );
  }
}
