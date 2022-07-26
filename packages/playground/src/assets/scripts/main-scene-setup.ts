// Scene's Prefab
import scenePrefab from "@assets-prefabs/scenes/main-sc.json";

// Scene's Tile Set Prefabs
import hugoBoyTileSetPrefab from "@assets-prefabs/tile-sets/hugo_boy-ts.json";
import hugoZombieTileSetPrefab from "@assets-prefabs/tile-sets/hugo_zombie-ts.json";
import Building001TileSetPrefab from "@assets-prefabs/tile-sets/building_001-ts.json";

// Scene's Map Prefab
import mapPrefab from "@assets-prefabs/maps/salon-mp.json";

// Scene's Character Prefabs
import hugoBoyCharacterPrefab from "@assets-prefabs/characters/hugo_boy-ch.json";
import hugoZombieCharacterPrefab from "@assets-prefabs/characters/hugo_zombie-ch.json";

// HSM 2D RPG Game Engine
import { EngineRuntimeFacade } from "hsm-2d-rpg-game-engine";

// Set Scene's Tile Set Prefabs
EngineRuntimeFacade.SCENE_LOADER.AddTileSet(hugoBoyTileSetPrefab);
EngineRuntimeFacade.SCENE_LOADER.AddTileSet(hugoZombieTileSetPrefab);
EngineRuntimeFacade.SCENE_LOADER.AddTileSet(Building001TileSetPrefab);

// Set Scene's Map Prefab
EngineRuntimeFacade.SCENE_LOADER.MapPrefab = mapPrefab;

// Set Scene's Character Prefabs
EngineRuntimeFacade.SCENE_LOADER.AddCharacter(hugoBoyCharacterPrefab);
EngineRuntimeFacade.SCENE_LOADER.AddCharacter(hugoZombieCharacterPrefab);

// Load Scene's Prefab (Async)
await EngineRuntimeFacade.SCENE_LOADER.LoadScene(scenePrefab);
