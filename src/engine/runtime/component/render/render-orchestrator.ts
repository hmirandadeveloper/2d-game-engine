import config from "../../config/config.json";
import { Vector2 } from "../../utils/vector2";
import { RenderLayers } from "./render-layer";
import { Renderer } from "./renderer";
import { Tile } from "./tile";

export class RenderOrchestrator {
  private static _INSTANCE: RenderOrchestrator;

  readonly Canvas: HTMLCanvasElement;
  readonly CanvasContext: CanvasRenderingContext2D;

  private _renderables: Map<RenderLayers, Array<CallableFunction>>;

  private constructor() {
    this.Canvas = this.GetCanvas();
    this.Canvas.width = config.canvas.width;
    this.Canvas.height = config.canvas.heigth;
    this.Canvas.style.setProperty("--scale", config.canvas.scale);
    this._renderables = new Map<RenderLayers, Array<CallableFunction>>();

    this.CanvasContext = <CanvasRenderingContext2D>(
      this.Canvas.getContext(config.canvas.context)
    );
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
    this.CanvasContext.clearRect(0, 0, this.Canvas.width, this.Canvas.height);

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

  private GetCanvas(): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.getElementById(config.canvas.id)
    );

    if (!canvas) {
      throw new Error(`No canvas element with ID: '${config.canvas.id}' found`);
    }

    return canvas;
  }
}
