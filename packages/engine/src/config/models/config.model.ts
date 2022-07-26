export interface ConfigModel {
  canvas: ConfigCanvasModel;
  tile: ConfigTileModel;
  animation: ConfigAnimationModel;
  movement: ConfigMovementModel;
  scene: ConfigSceneModel;
  assets: ConfigAssetModel;
}

interface ConfigCanvasModel {
  id: string;
  context: string;
  width: number;
  heigth: number;
  scale: string;
}

interface ConfigTileModel {
  size: number;
}

interface ConfigAnimationModel {
  durationRate: number;
  velocity: number;
}

interface ConfigMovementModel {
  maxSpeed: number;
  acceleration: number;
}

interface ConfigSceneModel {
  backgroundAudio: BackgroundAudioModel;
}

interface BackgroundAudioModel {
  volume: number;
}

interface ConfigAssetModel {
  src: string;
  soundExtension: string;
}
