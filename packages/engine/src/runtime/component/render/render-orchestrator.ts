import { Tile } from "./tile";
import { Renderer } from "./renderer";
import { RenderLayers } from "./render-layer";
import { Canvas } from "@engine-runtime/canvas";
import { Vector2 } from "@engine-runtime/utils/vector2";

export class RenderOrchestrator {
  private static _INSTANCE: RenderOrchestrator;
  readonly Canvas: Canvas;

  private _renderables: Map<RenderLayers, Array<CallableFunction>>;

  private constructor() {
    this._renderables = new Map<RenderLayers, Array<CallableFunction>>();
    this.Canvas = Canvas.GetInstance();
  }

  public static GetInstance(): RenderOrchestrator {
    if (!RenderOrchestrator._INSTANCE) {
      RenderOrchestrator._INSTANCE = new RenderOrchestrator();
    }

    return RenderOrchestrator._INSTANCE;
  }

  public LoadRenderables(renderables: Array<Renderer>): void {
    this._renderables = new Map<RenderLayers, Array<CallableFunction>>();
    renderables
      .sort((a: Renderer, b: Renderer) => {
        return a.Owner.GridPosition.Y - b.Owner.GridPosition.Y;
      })
      .forEach((renderer: Renderer) => {
        this.LoadTiles(renderer);
      });
  }

  private LoadTiles(renderer: Renderer): void {
    if (renderer.CurrentSprite === null) {
      return;
    }

    renderer.CurrentSprite.TilesRenderMap.forEach(
      (tileCoord: string, renderPosition: Vector2) => {
        const tile: Tile | null =
          renderer.CurrentSprite!.Tiles.get(tileCoord) ?? null;

        if (tile === null) {
          return;
        }

        if (!this._renderables.has(tile.RenderLayers)) {
          this._renderables.set(tile.RenderLayers, [
            () => {
              tile.Draw(
                renderer.CurrentSprite!.RelativeGridPosition,
                renderPosition
              );
            },
          ]);
          return;
        }

        this._renderables.get(tile.RenderLayers)?.push(() => {
          tile.Draw(
            renderer.CurrentSprite!.RelativeGridPosition,
            renderPosition
          );
        });
      }
    );
  }

  public Update(): void {
    this.Canvas.CanvasContext.clearRect(
      0,
      0,
      this.Canvas.CanvasElement.width,
      this.Canvas.CanvasElement.height
    );

    this._renderables
      .get(RenderLayers.FLOOR_LAYER)
      ?.forEach((drawCallbacks) => {
        drawCallbacks();
      });

    this._renderables
      .get(RenderLayers.COLLISION_LAYER)
      ?.forEach((drawCallbacks) => {
        drawCallbacks();
      });

    this._renderables
      .get(RenderLayers.ABOVE_LAYER)
      ?.forEach((drawCallbacks) => {
        drawCallbacks();
      });
  }
}
