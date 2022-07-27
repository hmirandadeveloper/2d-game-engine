import { Tile } from "./tile";
import { Renderer } from "./renderer";
import { RenderLayer } from "./render-layer";
import { Camera } from "@engine-runtime/camera";
import { Canvas } from "@engine-runtime/canvas";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { GameObject } from "@engine-runtime/scene/game-object";
import { GameObjectLayer } from "@engine-runtime/scene/game-object-layer";

export class RenderOrchestrator {
  private static _INSTANCE: RenderOrchestrator;
  readonly Canvas: Canvas;

  private _camera: Camera;
  private _renderables: Map<RenderLayer, Array<CallableFunction>>;
  private _collisionPoints: Set<string>;
  private _characters: Map<string, GameObject>;

  get Characters(): Map<string, GameObject> {
    return this._characters;
  }

  get CollisionPoints(): Set<string> {
    return this._collisionPoints;
  }

  private constructor() {
    this.Canvas = Canvas.GetInstance();

    this._renderables = new Map<RenderLayer, Array<CallableFunction>>();
    this._collisionPoints = new Set<string>();
    this._camera = Camera.GetInstance();
    this._characters = new Map<string, GameObject>();
  }

  public static GetInstance(): RenderOrchestrator {
    if (!RenderOrchestrator._INSTANCE) {
      RenderOrchestrator._INSTANCE = new RenderOrchestrator();
    }

    return RenderOrchestrator._INSTANCE;
  }

  public LoadRenderables(renderables: Array<Renderer>): void {
    this._collisionPoints = new Set<string>();

    this._renderables = new Map<RenderLayer, Array<CallableFunction>>();
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

        const combinedGridPosition: Vector2 = Vector2.Sum(
          renderer.CurrentSprite!.RelativeGridPosition,
          renderPosition
        );

        if (tile === null || this._camera.IsOccluded(combinedGridPosition)) {
          return;
        }

        if (
          tile.RenderLayer === RenderLayer.COLLISION_LAYER &&
          renderer.Owner.Layer !== GameObjectLayer.PLAYER
        ) {
          this._collisionPoints.add(combinedGridPosition.ToString());
        }

        if (renderer.Owner.Layer === GameObjectLayer.CHARACTER) {
          this._characters.set(combinedGridPosition.ToString(), renderer.Owner);
        }

        if (!this._renderables.has(tile.RenderLayer)) {
          this._renderables.set(tile.RenderLayer, [
            () => {
              tile.Draw(combinedGridPosition, this._camera.PixelsPosition);
            },
          ]);
          return;
        }

        this._renderables.get(tile.RenderLayer)?.push(() => {
          tile.Draw(combinedGridPosition, this._camera.PixelsPosition);
        });
      }
    );
  }

  public Update(): void {
    this.Canvas.CanvasContext.clearRect(
      Vector2.ZERO.X,
      Vector2.ZERO.X,
      this.Canvas.CanvasElement.width,
      this.Canvas.CanvasElement.height
    );

    this._renderables.get(RenderLayer.FLOOR_LAYER)?.forEach((drawCallbacks) => {
      drawCallbacks();
    });

    this._renderables
      .get(RenderLayer.COLLISION_LAYER)
      ?.forEach((drawCallbacks) => {
        drawCallbacks();
      });

    this._renderables.get(RenderLayer.ABOVE_LAYER)?.forEach((drawCallbacks) => {
      drawCallbacks();
    });
  }
}
