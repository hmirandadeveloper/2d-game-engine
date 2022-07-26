export interface ConfigSceneModel {
  readonly backgroundAudio: BackgroundAudioModel;
}

interface BackgroundAudioModel {
  readonly volume: number;
}
