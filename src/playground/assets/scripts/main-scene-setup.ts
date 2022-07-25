import scenePrefab from "@assets-prefabs/scenes/main-sc.json";

import hugoBoyTileSetPrefab from "@assets-prefabs/tile-sets/hugo_boy-ts.json";
import hugoZombieTileSetPrefab from "@assets-prefabs/tile-sets/hugo_zombie-ts.json";
import Building001TileSetPrefab from "@assets-prefabs/tile-sets/building_001-ts.json";

import mapPrefab from "@assets-prefabs/maps/salon-mp.json";

import hugoBoyCharacterPrefab from "@assets-prefabs/characters/hugo_boy-ch.json";
import hugoZombieCharacterPrefab from "@assets-prefabs/characters/hugo_zombie-ch.json";

import { SceneController } from "@engine-runtime/scene/scene-controller";

SceneController.SCENE_LOADER.AddTileSet(hugoBoyTileSetPrefab);
SceneController.SCENE_LOADER.AddTileSet(hugoZombieTileSetPrefab);
SceneController.SCENE_LOADER.AddTileSet(Building001TileSetPrefab);

SceneController.SCENE_LOADER.MapPrefab = mapPrefab;
SceneController.SCENE_LOADER.AddCharacter(hugoBoyCharacterPrefab);
SceneController.SCENE_LOADER.AddCharacter(hugoZombieCharacterPrefab);

await SceneController.SCENE_LOADER.LoadScene(scenePrefab);
