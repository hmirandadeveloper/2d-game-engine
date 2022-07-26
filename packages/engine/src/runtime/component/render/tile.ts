import { Scene } from "@engine-runtime/scene/scene";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { GridMapper } from "@engine-runtime/utils/grid-mapper";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { RenderLayers } from "@engine-runtime/component/render/render-layer";
import { RenderOrchestrator } from "@engine-runtime/component/render/render-orchestrator";

export class Tile {
  readonly Image: CanvasImageSource;
  readonly Coords: Vector2;

  private readonly PixelCoords: Vector2;

  private _renderLayer: RenderLayers;

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
  }

  public Draw(
    relativeGridPosition: Vector2,
    renderGridPosition: Vector2
  ): void {
    // TODO: New Feature (Performance Optimization): v1.2.0
    // if (Scene.CAMERA.IsOccluded(position)) {
    //   return;
    // }

    const relativePosition: Vector2 =
      GridMapper.PixelsCoordsFromGrid(relativeGridPosition);
    const renderPosition: Vector2 =
      GridMapper.PixelsCoordsFromGrid(renderGridPosition);

    RenderOrchestrator.GetInstance().CanvasContext.drawImage(
      this.Image,
      this.PixelCoords.X,
      this.PixelCoords.Y,
      GridMapper.GRID_PIXELS_SCALE,
      GridMapper.GRID_PIXELS_SCALE,
      Math.round(
        renderPosition.X + relativePosition.X + Scene.CAMERA.PixelsPosition.X
      ),
      Math.round(
        renderPosition.Y + relativePosition.Y + Scene.CAMERA.PixelsPosition.Y
      ),
      GridMapper.GRID_PIXELS_SCALE,
      GridMapper.GRID_PIXELS_SCALE
    );
  }
}
