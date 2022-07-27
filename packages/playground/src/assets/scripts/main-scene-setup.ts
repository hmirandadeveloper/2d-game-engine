// Scene's Prefab
import scenePrefab from "@assets-prefabs/scenes/main-sc.json";

// Scene's Tile Set Prefabs
import hugoBoyTileSetPrefab from "@assets-prefabs/tile-sets/hugo_boy-ts.json";
import hugoZombieTileSetPrefab from "@assets-prefabs/tile-sets/hugo_zombie-ts.json";
import Building001TileSetPrefab from "@assets-prefabs/tile-sets/building_001-ts.json";

// Scene's Map Prefab
import mapPrefab from "@assets-prefabs/maps/salon-mp.json";

// HSM 2D RPG Game Engine
import { EngineRuntimeFacade, Vector2 } from "hsm-2d-rpg-game-engine";

// Load Engine Facade
const engine: EngineRuntimeFacade = EngineRuntimeFacade.GetInstance();

// Changes on config
engine.Config.Parameters.animation.durationRate = 1.2;
engine.Config.Parameters.movement.acceleration = 3;
engine.Config.Parameters.movement.maxSpeed = 15;

engine.Engine.Canvas.LoadCanvas(
  <HTMLCanvasElement>document.getElementById("app_canvas")
);

// Set Scene's Tile Set Prefabs
engine.SceneLoader.AddTileSet(hugoBoyTileSetPrefab);
engine.SceneLoader.AddTileSet(hugoZombieTileSetPrefab);
engine.SceneLoader.AddTileSet(Building001TileSetPrefab);

// Set Scene's Map Prefab
engine.SceneLoader.MapPrefab = mapPrefab;

// Load Scene's Prefab (Async)
engine.SceneLoader.LoadScene(scenePrefab).then(() => {
  engine.CharacterFactory.CreateCharacter(
    "hugo_zombie_1",
    "hugo_zombie",
    true,
    new Vector2(16, 8)
  );

  engine.CharacterFactory.CreateCharacter(
    "hugo_zombie_2",
    "hugo_zombie",
    false,
    new Vector2(1, 6)
  );

  engine.SceneController.CurrentScene.Start();
});
