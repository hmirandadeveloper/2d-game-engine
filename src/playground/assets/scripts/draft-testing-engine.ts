import "@assets-styles/style.css";
import hugoBoySS from "@assets-sprites/hugo_boy.png";
import mapTSsrc from "@assets-tile-sets/building_001.png";

import { Engine } from "@engine-runtime/engine";
import { RenderEntity } from "@engine-runtime/component/render/render-entity";
import { TileSet } from "@engine-runtime/component/render/tile-set";
import { GameObject } from "@engine-runtime/scene/game-object";
import { Scene } from "@engine-runtime/scene/scene";
import { Vector2 } from "@engine-runtime/utils/vector2";
import { RenderLayers } from "@engine-runtime/component/render/render-layer";
import { Renderer } from "@engine-runtime/component/render/renderer";
import { SpriteAnimator } from "@engine-runtime/component/animator/sprite-animator";
import { SpriteAnimation } from "@engine-runtime/component/animator/sprite-animation";
import { InputController } from "@engine-runtime/component/input/input-controller";
import { IEvaluable } from "@engine-runtime/component/fsm/evaluable.h";
import { GameInput } from "@engine-runtime/component/input/input";
import { Mover } from "@engine-runtime/component/movement/mover";

const scene = new Scene("main", "hugo_boy");

const hugoBoyTS: TileSet = new TileSet(hugoBoySS);
const mapTS: TileSet = new TileSet(mapTSsrc);

scene.AddTileSet(hugoBoyTS);
scene.AddTileSet(mapTS);
await scene.Setup();

hugoBoyTS.SetTileLayer("0,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("1,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("2,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("3,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("4,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("5,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("6,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("7,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("8,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("9,0", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("0,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("1,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("2,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("3,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("4,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("5,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("6,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("7,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("8,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("9,1", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("0,2", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("1,2", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("2,2", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("3,2", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("4,2", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("5,2", RenderLayers.ABOVE_LAYER);
hugoBoyTS.SetTileLayer("0,3", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("1,3", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("2,3", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("3,3", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("4,3", RenderLayers.COLLISION_LAYER);
hugoBoyTS.SetTileLayer("5,3", RenderLayers.COLLISION_LAYER);

const hugoBoyGO: GameObject = new GameObject("hugo_boy");
const npc1: GameObject = new GameObject("npc_1", new Vector2(3, 2));
const mapGO: GameObject = new GameObject("map", new Vector2(0, 0));

scene.AddGameObject(mapGO);
scene.AddGameObject(npc1);
scene.AddGameObject(hugoBoyGO);

const npc10RE: RenderEntity = new RenderEntity(
  "npc1_0_re",
  hugoBoyTS,
  new Set<string>(["0,0", "1,0", "0,1", "1,1"]),
  npc1.GridPosition
);

npc10RE
  .AddTileRenderMap("0,0", Vector2.ZERO)
  .AddTileRenderMap("1,0", Vector2.ONE_ZERO)
  .AddTileRenderMap("0,1", Vector2.ZERO_ONE)
  .AddTileRenderMap("1,1", Vector2.ONE);

const npc11RE: RenderEntity = new RenderEntity(
  "npc1_1_re",
  hugoBoyTS,
  new Set<string>(["6,0", "7,0", "6,1", "7,1"]),
  npc1.GridPosition
);

npc11RE
  .AddTileRenderMap("6,0", Vector2.ZERO)
  .AddTileRenderMap("7,0", Vector2.ONE_ZERO)
  .AddTileRenderMap("6,1", Vector2.ZERO_ONE)
  .AddTileRenderMap("7,1", Vector2.ONE);

const hugoBoy0RE: RenderEntity = new RenderEntity(
  "hugo_boy_0_re",
  hugoBoyTS,
  new Set<string>(["0,0", "1,0", "0,1", "1,1"]),
  hugoBoyGO.GridPosition
);

hugoBoy0RE
  .AddTileRenderMap("0,0", Vector2.ZERO)
  .AddTileRenderMap("1,0", Vector2.ONE_ZERO)
  .AddTileRenderMap("0,1", Vector2.ZERO_ONE)
  .AddTileRenderMap("1,1", Vector2.ONE);

const hugoBoy1RE: RenderEntity = new RenderEntity(
  "hugo_boy_1_re",
  hugoBoyTS,
  new Set<string>(["2,0", "3,0", "2,1", "3,1"]),
  hugoBoyGO.GridPosition
);

hugoBoy1RE
  .AddTileRenderMap("2,0", Vector2.ZERO)
  .AddTileRenderMap("3,0", Vector2.ONE_ZERO)
  .AddTileRenderMap("2,1", Vector2.ZERO_ONE)
  .AddTileRenderMap("3,1", Vector2.ONE);

const hugoBoy2RE: RenderEntity = new RenderEntity(
  "hugo_boy_2_re",
  hugoBoyTS,
  new Set<string>(["4,0", "5,0", "4,1", "5,1"]),
  hugoBoyGO.GridPosition
);

hugoBoy2RE
  .AddTileRenderMap("4,0", Vector2.ZERO)
  .AddTileRenderMap("5,0", Vector2.ONE_ZERO)
  .AddTileRenderMap("4,1", Vector2.ZERO_ONE)
  .AddTileRenderMap("5,1", Vector2.ONE);

const hugoBoy3RE: RenderEntity = new RenderEntity(
  "hugo_boy_3_re",
  hugoBoyTS,
  new Set<string>(["6,0", "7,0", "6,1", "7,1"]),
  hugoBoyGO.GridPosition
);

hugoBoy3RE
  .AddTileRenderMap("6,0", Vector2.ZERO)
  .AddTileRenderMap("7,0", Vector2.ONE_ZERO)
  .AddTileRenderMap("6,1", Vector2.ZERO_ONE)
  .AddTileRenderMap("7,1", Vector2.ONE);

const hugoBoy4RE: RenderEntity = new RenderEntity(
  "hugo_boy_4_re",
  hugoBoyTS,
  new Set<string>(["0,2", "1,2", "0,3", "1,3"]),
  hugoBoyGO.GridPosition
);

hugoBoy4RE
  .AddTileRenderMap("0,2", Vector2.ZERO)
  .AddTileRenderMap("1,2", Vector2.ONE_ZERO)
  .AddTileRenderMap("0,3", Vector2.ZERO_ONE)
  .AddTileRenderMap("1,3", Vector2.ONE);

const hugoBoy5RE: RenderEntity = new RenderEntity(
  "hugo_boy_5_re",
  hugoBoyTS,
  new Set<string>(["2,2", "3,2", "2,3", "3,3"]),
  hugoBoyGO.GridPosition
);

hugoBoy5RE
  .AddTileRenderMap("2,2", Vector2.ZERO)
  .AddTileRenderMap("3,2", Vector2.ONE_ZERO)
  .AddTileRenderMap("2,3", Vector2.ZERO_ONE)
  .AddTileRenderMap("3,3", Vector2.ONE);

const hugoBoy6RE: RenderEntity = new RenderEntity(
  "hugo_boy_6_re",
  hugoBoyTS,
  new Set<string>(["4,2", "5,2", "4,3", "5,3"]),
  hugoBoyGO.GridPosition
);

hugoBoy6RE
  .AddTileRenderMap("4,2", Vector2.ZERO)
  .AddTileRenderMap("5,2", Vector2.ONE_ZERO)
  .AddTileRenderMap("4,3", Vector2.ZERO_ONE)
  .AddTileRenderMap("5,3", Vector2.ONE);

const mapRE: RenderEntity = new RenderEntity(
  "re_map",
  mapTS,
  new Set<string>([
    "0,0",
    "1,0",
    "2,0",
    "3,0",
    "0,1",
    "1,1",
    "2,1",
    "3,1",
    "0,2",
    "1,2",
    "2,2",
    "3,2",
  ]),
  mapGO.GridPosition
);

mapRE
  .AddTileRenderMap("0,0", Vector2.ZERO)
  .AddTileRenderMap("1,0", Vector2.ONE_ZERO)
  .AddTileRenderMap("1,0", new Vector2(2, 0))
  .AddTileRenderMap("1,0", new Vector2(3, 0))
  .AddTileRenderMap("1,0", new Vector2(4, 0))
  .AddTileRenderMap("1,0", new Vector2(5, 0))
  .AddTileRenderMap("1,0", new Vector2(6, 0))
  .AddTileRenderMap("1,0", new Vector2(7, 0))
  .AddTileRenderMap("1,0", new Vector2(8, 0))
  .AddTileRenderMap("1,0", new Vector2(9, 0))
  .AddTileRenderMap("1,0", new Vector2(10, 0))
  .AddTileRenderMap("1,0", new Vector2(11, 0))
  .AddTileRenderMap("1,0", new Vector2(12, 0))
  .AddTileRenderMap("1,0", new Vector2(13, 0))
  .AddTileRenderMap("1,0", new Vector2(14, 0))
  .AddTileRenderMap("1,0", new Vector2(15, 0))
  .AddTileRenderMap("1,0", new Vector2(16, 0))
  .AddTileRenderMap("1,0", new Vector2(17, 0))
  .AddTileRenderMap("1,0", new Vector2(18, 0))
  .AddTileRenderMap("1,0", new Vector2(19, 0))
  .AddTileRenderMap("1,0", new Vector2(20, 0))
  .AddTileRenderMap("2,0", new Vector2(21, 0))

  .AddTileRenderMap("0,1", Vector2.ZERO_ONE)
  .AddTileRenderMap("3,0", Vector2.ONE)
  .AddTileRenderMap("3,0", new Vector2(2, 1))
  .AddTileRenderMap("3,0", new Vector2(3, 1))
  .AddTileRenderMap("3,0", new Vector2(4, 1))
  .AddTileRenderMap("3,0", new Vector2(5, 1))
  .AddTileRenderMap("3,0", new Vector2(6, 1))
  .AddTileRenderMap("3,0", new Vector2(7, 1))
  .AddTileRenderMap("3,0", new Vector2(8, 1))
  .AddTileRenderMap("3,0", new Vector2(9, 1))
  .AddTileRenderMap("3,0", new Vector2(10, 1))
  .AddTileRenderMap("3,0", new Vector2(11, 1))
  .AddTileRenderMap("3,0", new Vector2(12, 1))
  .AddTileRenderMap("3,0", new Vector2(13, 1))
  .AddTileRenderMap("3,0", new Vector2(14, 1))
  .AddTileRenderMap("3,0", new Vector2(15, 1))
  .AddTileRenderMap("3,0", new Vector2(16, 1))
  .AddTileRenderMap("3,0", new Vector2(17, 1))
  .AddTileRenderMap("3,0", new Vector2(18, 1))
  .AddTileRenderMap("3,0", new Vector2(19, 1))
  .AddTileRenderMap("3,0", new Vector2(20, 1))
  .AddTileRenderMap("2,1", new Vector2(21, 1))

  .AddTileRenderMap("0,1", new Vector2(0, 2))
  .AddTileRenderMap("3,1", new Vector2(1, 2))
  .AddTileRenderMap("3,1", new Vector2(2, 2))
  .AddTileRenderMap("3,1", new Vector2(3, 2))
  .AddTileRenderMap("3,1", new Vector2(4, 2))
  .AddTileRenderMap("3,1", new Vector2(5, 2))
  .AddTileRenderMap("3,1", new Vector2(6, 2))
  .AddTileRenderMap("3,1", new Vector2(7, 2))
  .AddTileRenderMap("3,1", new Vector2(8, 2))
  .AddTileRenderMap("3,1", new Vector2(9, 2))
  .AddTileRenderMap("3,1", new Vector2(10, 2))
  .AddTileRenderMap("3,1", new Vector2(11, 2))
  .AddTileRenderMap("3,1", new Vector2(12, 2))
  .AddTileRenderMap("3,1", new Vector2(13, 2))
  .AddTileRenderMap("3,1", new Vector2(14, 2))
  .AddTileRenderMap("3,1", new Vector2(15, 2))
  .AddTileRenderMap("3,1", new Vector2(16, 2))
  .AddTileRenderMap("3,1", new Vector2(17, 2))
  .AddTileRenderMap("3,1", new Vector2(18, 2))
  .AddTileRenderMap("3,1", new Vector2(19, 2))
  .AddTileRenderMap("3,1", new Vector2(20, 2))
  .AddTileRenderMap("2,1", new Vector2(21, 2))

  .AddTileRenderMap("0,1", new Vector2(0, 3))
  .AddTileRenderMap("3,2", new Vector2(1, 3))
  .AddTileRenderMap("3,2", new Vector2(2, 3))
  .AddTileRenderMap("3,2", new Vector2(3, 3))
  .AddTileRenderMap("3,2", new Vector2(4, 3))
  .AddTileRenderMap("3,2", new Vector2(5, 3))
  .AddTileRenderMap("3,2", new Vector2(6, 3))
  .AddTileRenderMap("3,2", new Vector2(7, 3))
  .AddTileRenderMap("3,2", new Vector2(8, 3))
  .AddTileRenderMap("3,2", new Vector2(9, 3))
  .AddTileRenderMap("3,2", new Vector2(10, 3))
  .AddTileRenderMap("3,2", new Vector2(11, 3))
  .AddTileRenderMap("3,2", new Vector2(12, 3))
  .AddTileRenderMap("3,2", new Vector2(13, 3))
  .AddTileRenderMap("3,2", new Vector2(14, 3))
  .AddTileRenderMap("3,2", new Vector2(15, 3))
  .AddTileRenderMap("3,2", new Vector2(16, 3))
  .AddTileRenderMap("3,2", new Vector2(17, 3))
  .AddTileRenderMap("3,2", new Vector2(18, 3))
  .AddTileRenderMap("3,2", new Vector2(19, 3))
  .AddTileRenderMap("3,2", new Vector2(20, 3))
  .AddTileRenderMap("2,1", new Vector2(21, 3))

  .AddTileRenderMap("0,1", new Vector2(0, 4))
  .AddTileRenderMap("1,1", new Vector2(1, 4))
  .AddTileRenderMap("1,1", new Vector2(2, 4))
  .AddTileRenderMap("1,1", new Vector2(3, 4))
  .AddTileRenderMap("1,1", new Vector2(4, 4))
  .AddTileRenderMap("1,1", new Vector2(5, 4))
  .AddTileRenderMap("1,1", new Vector2(6, 4))
  .AddTileRenderMap("1,1", new Vector2(7, 4))
  .AddTileRenderMap("1,1", new Vector2(8, 4))
  .AddTileRenderMap("1,1", new Vector2(9, 4))
  .AddTileRenderMap("1,1", new Vector2(10, 4))
  .AddTileRenderMap("1,1", new Vector2(11, 4))
  .AddTileRenderMap("1,1", new Vector2(12, 4))
  .AddTileRenderMap("1,1", new Vector2(13, 4))
  .AddTileRenderMap("1,1", new Vector2(14, 4))
  .AddTileRenderMap("1,1", new Vector2(15, 4))
  .AddTileRenderMap("1,1", new Vector2(16, 4))
  .AddTileRenderMap("1,1", new Vector2(17, 4))
  .AddTileRenderMap("1,1", new Vector2(18, 4))
  .AddTileRenderMap("1,1", new Vector2(19, 4))
  .AddTileRenderMap("1,1", new Vector2(20, 4))
  .AddTileRenderMap("2,1", new Vector2(21, 4))

  .AddTileRenderMap("0,1", new Vector2(0, 5))
  .AddTileRenderMap("1,1", new Vector2(1, 5))
  .AddTileRenderMap("1,1", new Vector2(2, 5))
  .AddTileRenderMap("1,1", new Vector2(3, 5))
  .AddTileRenderMap("1,1", new Vector2(4, 5))
  .AddTileRenderMap("1,1", new Vector2(5, 5))
  .AddTileRenderMap("1,1", new Vector2(6, 5))
  .AddTileRenderMap("1,1", new Vector2(7, 5))
  .AddTileRenderMap("1,1", new Vector2(8, 5))
  .AddTileRenderMap("1,1", new Vector2(9, 5))
  .AddTileRenderMap("1,1", new Vector2(10, 5))
  .AddTileRenderMap("1,1", new Vector2(11, 5))
  .AddTileRenderMap("1,1", new Vector2(12, 5))
  .AddTileRenderMap("1,1", new Vector2(13, 5))
  .AddTileRenderMap("1,1", new Vector2(14, 5))
  .AddTileRenderMap("1,1", new Vector2(15, 5))
  .AddTileRenderMap("1,1", new Vector2(16, 5))
  .AddTileRenderMap("1,1", new Vector2(17, 5))
  .AddTileRenderMap("1,1", new Vector2(18, 5))
  .AddTileRenderMap("1,1", new Vector2(19, 5))
  .AddTileRenderMap("1,1", new Vector2(20, 5))
  .AddTileRenderMap("2,1", new Vector2(21, 5))

  .AddTileRenderMap("0,1", new Vector2(0, 6))
  .AddTileRenderMap("1,1", new Vector2(1, 6))
  .AddTileRenderMap("1,1", new Vector2(2, 6))
  .AddTileRenderMap("1,1", new Vector2(3, 6))
  .AddTileRenderMap("1,1", new Vector2(4, 6))
  .AddTileRenderMap("1,1", new Vector2(5, 6))
  .AddTileRenderMap("1,1", new Vector2(6, 6))
  .AddTileRenderMap("1,1", new Vector2(7, 6))
  .AddTileRenderMap("1,1", new Vector2(8, 6))
  .AddTileRenderMap("1,1", new Vector2(9, 6))
  .AddTileRenderMap("1,1", new Vector2(10, 6))
  .AddTileRenderMap("1,1", new Vector2(11, 6))
  .AddTileRenderMap("1,1", new Vector2(12, 6))
  .AddTileRenderMap("1,1", new Vector2(13, 6))
  .AddTileRenderMap("1,1", new Vector2(14, 6))
  .AddTileRenderMap("1,1", new Vector2(15, 6))
  .AddTileRenderMap("1,1", new Vector2(16, 6))
  .AddTileRenderMap("1,1", new Vector2(17, 6))
  .AddTileRenderMap("1,1", new Vector2(18, 6))
  .AddTileRenderMap("1,1", new Vector2(19, 6))
  .AddTileRenderMap("1,1", new Vector2(20, 6))
  .AddTileRenderMap("2,1", new Vector2(21, 6))

  .AddTileRenderMap("0,1", new Vector2(0, 7))
  .AddTileRenderMap("1,1", new Vector2(1, 7))
  .AddTileRenderMap("1,1", new Vector2(2, 7))
  .AddTileRenderMap("1,1", new Vector2(3, 7))
  .AddTileRenderMap("1,1", new Vector2(4, 7))
  .AddTileRenderMap("1,1", new Vector2(5, 7))
  .AddTileRenderMap("1,1", new Vector2(6, 7))
  .AddTileRenderMap("1,1", new Vector2(7, 7))
  .AddTileRenderMap("1,1", new Vector2(8, 7))
  .AddTileRenderMap("1,1", new Vector2(9, 7))
  .AddTileRenderMap("1,1", new Vector2(10, 7))
  .AddTileRenderMap("1,1", new Vector2(11, 7))
  .AddTileRenderMap("1,1", new Vector2(12, 7))
  .AddTileRenderMap("1,1", new Vector2(13, 7))
  .AddTileRenderMap("1,1", new Vector2(14, 7))
  .AddTileRenderMap("1,1", new Vector2(15, 7))
  .AddTileRenderMap("1,1", new Vector2(16, 7))
  .AddTileRenderMap("1,1", new Vector2(17, 7))
  .AddTileRenderMap("1,1", new Vector2(18, 7))
  .AddTileRenderMap("1,1", new Vector2(19, 7))
  .AddTileRenderMap("1,1", new Vector2(20, 7))
  .AddTileRenderMap("2,1", new Vector2(21, 7))

  .AddTileRenderMap("0,1", new Vector2(0, 8))
  .AddTileRenderMap("1,1", new Vector2(1, 8))
  .AddTileRenderMap("1,1", new Vector2(2, 8))
  .AddTileRenderMap("1,1", new Vector2(3, 8))
  .AddTileRenderMap("1,1", new Vector2(4, 8))
  .AddTileRenderMap("1,1", new Vector2(5, 8))
  .AddTileRenderMap("1,1", new Vector2(6, 8))
  .AddTileRenderMap("1,1", new Vector2(7, 8))
  .AddTileRenderMap("1,1", new Vector2(8, 8))
  .AddTileRenderMap("1,1", new Vector2(9, 8))
  .AddTileRenderMap("1,1", new Vector2(10, 8))
  .AddTileRenderMap("1,1", new Vector2(11, 8))
  .AddTileRenderMap("1,1", new Vector2(12, 8))
  .AddTileRenderMap("1,1", new Vector2(13, 8))
  .AddTileRenderMap("1,1", new Vector2(14, 8))
  .AddTileRenderMap("1,1", new Vector2(15, 8))
  .AddTileRenderMap("1,1", new Vector2(16, 8))
  .AddTileRenderMap("1,1", new Vector2(17, 8))
  .AddTileRenderMap("1,1", new Vector2(18, 8))
  .AddTileRenderMap("1,1", new Vector2(19, 8))
  .AddTileRenderMap("1,1", new Vector2(20, 8))
  .AddTileRenderMap("2,1", new Vector2(21, 8))

  .AddTileRenderMap("0,1", new Vector2(0, 9))
  .AddTileRenderMap("1,1", new Vector2(1, 9))
  .AddTileRenderMap("1,1", new Vector2(2, 9))
  .AddTileRenderMap("1,1", new Vector2(3, 9))
  .AddTileRenderMap("1,1", new Vector2(4, 9))
  .AddTileRenderMap("1,1", new Vector2(5, 9))
  .AddTileRenderMap("1,1", new Vector2(6, 9))
  .AddTileRenderMap("1,1", new Vector2(7, 9))
  .AddTileRenderMap("1,1", new Vector2(8, 9))
  .AddTileRenderMap("1,1", new Vector2(9, 9))
  .AddTileRenderMap("1,1", new Vector2(10, 9))
  .AddTileRenderMap("1,1", new Vector2(11, 9))
  .AddTileRenderMap("1,1", new Vector2(12, 9))
  .AddTileRenderMap("1,1", new Vector2(13, 9))
  .AddTileRenderMap("1,1", new Vector2(14, 9))
  .AddTileRenderMap("1,1", new Vector2(15, 9))
  .AddTileRenderMap("1,1", new Vector2(16, 9))
  .AddTileRenderMap("1,1", new Vector2(17, 9))
  .AddTileRenderMap("1,1", new Vector2(18, 9))
  .AddTileRenderMap("1,1", new Vector2(19, 9))
  .AddTileRenderMap("1,1", new Vector2(20, 9))
  .AddTileRenderMap("2,1", new Vector2(21, 9))

  .AddTileRenderMap("0,1", new Vector2(0, 10))
  .AddTileRenderMap("1,1", new Vector2(1, 10))
  .AddTileRenderMap("1,1", new Vector2(2, 10))
  .AddTileRenderMap("1,1", new Vector2(3, 10))
  .AddTileRenderMap("1,1", new Vector2(4, 10))
  .AddTileRenderMap("1,1", new Vector2(5, 10))
  .AddTileRenderMap("1,1", new Vector2(6, 10))
  .AddTileRenderMap("1,1", new Vector2(7, 10))
  .AddTileRenderMap("1,1", new Vector2(8, 10))
  .AddTileRenderMap("1,1", new Vector2(9, 10))
  .AddTileRenderMap("1,1", new Vector2(10, 10))
  .AddTileRenderMap("1,1", new Vector2(11, 10))
  .AddTileRenderMap("1,1", new Vector2(12, 10))
  .AddTileRenderMap("1,1", new Vector2(13, 10))
  .AddTileRenderMap("1,1", new Vector2(14, 10))
  .AddTileRenderMap("1,1", new Vector2(15, 10))
  .AddTileRenderMap("1,1", new Vector2(16, 10))
  .AddTileRenderMap("1,1", new Vector2(17, 10))
  .AddTileRenderMap("1,1", new Vector2(18, 10))
  .AddTileRenderMap("1,1", new Vector2(19, 10))
  .AddTileRenderMap("1,1", new Vector2(20, 10))
  .AddTileRenderMap("2,1", new Vector2(21, 10))

  .AddTileRenderMap("0,2", new Vector2(0, 11))
  .AddTileRenderMap("1,2", new Vector2(1, 11))
  .AddTileRenderMap("1,2", new Vector2(2, 11))
  .AddTileRenderMap("1,2", new Vector2(3, 11))
  .AddTileRenderMap("1,2", new Vector2(4, 11))
  .AddTileRenderMap("1,2", new Vector2(5, 11))
  .AddTileRenderMap("1,2", new Vector2(6, 11))
  .AddTileRenderMap("1,2", new Vector2(7, 11))
  .AddTileRenderMap("1,2", new Vector2(8, 11))
  .AddTileRenderMap("1,2", new Vector2(9, 11))
  .AddTileRenderMap("1,2", new Vector2(10, 11))
  .AddTileRenderMap("1,2", new Vector2(11, 11))
  .AddTileRenderMap("1,2", new Vector2(12, 11))
  .AddTileRenderMap("1,2", new Vector2(13, 11))
  .AddTileRenderMap("1,2", new Vector2(14, 11))
  .AddTileRenderMap("1,2", new Vector2(15, 11))
  .AddTileRenderMap("1,2", new Vector2(16, 11))
  .AddTileRenderMap("1,2", new Vector2(17, 11))
  .AddTileRenderMap("1,2", new Vector2(18, 11))
  .AddTileRenderMap("1,2", new Vector2(19, 11))
  .AddTileRenderMap("1,2", new Vector2(20, 11))
  .AddTileRenderMap("2,2", new Vector2(21, 11));

const renderer: Renderer = new Renderer(hugoBoyGO);
renderer
  .AddSprite(0, hugoBoy0RE)
  .AddSprite(1, hugoBoy1RE)
  .AddSprite(2, hugoBoy2RE)
  .AddSprite(3, hugoBoy3RE)
  .AddSprite(4, hugoBoy4RE)
  .AddSprite(5, hugoBoy5RE)
  .AddSprite(6, hugoBoy6RE);

hugoBoyGO.AddComponent(renderer);

const rendererNpc1: Renderer = new Renderer(npc1);
rendererNpc1.AddSprite(0, npc10RE);
rendererNpc1.AddSprite(1, npc11RE);
npc1.AddComponent(rendererNpc1);

const spriteAnimatorNpc1: SpriteAnimator = new SpriteAnimator(
  npc1,
  new SpriteAnimation("idle_front", [0, 0, 0, 0, 1])
);
npc1.AddComponent(spriteAnimatorNpc1);

const rendererMap: Renderer = new Renderer(mapGO);
rendererMap.AddSprite(0, mapRE);

mapGO.AddComponent(rendererMap);

const inputController: InputController = new InputController(hugoBoyGO);
hugoBoyGO.AddComponent(inputController);

const mover: Mover = new Mover(hugoBoyGO);
hugoBoyGO.AddComponent(mover);

const spriteAnimator: SpriteAnimator = new SpriteAnimator(
  hugoBoyGO,
  new SpriteAnimation("idle_front", [0, 0, 0, 0, 0, 0, 3])
);

spriteAnimator.AddAnimation(new SpriteAnimation("walking_front", [0, 1, 0, 2]));
spriteAnimator.AddAnimation(new SpriteAnimation("walking_back", [4, 5, 4, 6]));
spriteAnimator.AddAnimation(new SpriteAnimation("idle_back", [4, 4]));
spriteAnimator.CreateAnimationTransition(
  "idle_front",
  <IEvaluable>{
    Evaluate() {
      return inputController.CurrentInputSource.GameOutput() === GameInput.NONE;
    },
  },
  "walking_front"
);

spriteAnimator.CreateAnimationTransition("walking_front", <IEvaluable>{
  Evaluate() {
    return mover.MoveAxis.Y > 0;
  },
});

spriteAnimator.CreateAnimationTransition("walking_back", <IEvaluable>{
  Evaluate() {
    return mover.MoveAxis.Y < 0;
  },
});

spriteAnimator.CreateAnimationTransition(
  "idle_back",
  <IEvaluable>{
    Evaluate() {
      return inputController.CurrentInputSource.GameOutput() === GameInput.NONE;
    },
  },
  "walking_back"
);

hugoBoyGO.AddComponent(spriteAnimator);

Engine.GetInstance().SceneController.AddScene(scene);
