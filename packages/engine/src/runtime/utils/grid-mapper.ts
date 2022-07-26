import { Vector2 } from "@engine-runtime/utils/vector2";
import { Config } from "config/config";

export class GridMapper {
  static readonly GRID_PIXELS_SCALE = Config.GetInstance().Parameters.tile.size;

  static PixelsCoordsFromGrid(gridCoords: Vector2): Vector2 {
    return new Vector2(
      gridCoords.X * GridMapper.GRID_PIXELS_SCALE,
      gridCoords.Y * GridMapper.GRID_PIXELS_SCALE
    );
  }

  static GridCoordsFromPixels(pixelsCoords: Vector2): Vector2 {
    return new Vector2(
      pixelsCoords.X / GridMapper.GRID_PIXELS_SCALE,
      pixelsCoords.Y / GridMapper.GRID_PIXELS_SCALE
    );
  }
}
