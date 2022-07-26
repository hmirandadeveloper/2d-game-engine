import { EngineElement } from "@engine-runtime/engine-element";

export class Canvas extends EngineElement {
  private static _INSTANCE: Canvas;

  private _canvasContext: CanvasRenderingContext2D | null;
  private _canvasElement: HTMLCanvasElement | null;

  get CanvasElement(): HTMLCanvasElement {
    if (this._canvasElement == null) {
      throw new Error(
        `No Canvas loaded.
        Please call one of the Canvas's functions: 
        [
            LoadCanvas, 
            LoadCanvasById, 
            LoadCanvasByConfigId
        ] 
        to load it`
      );
    }

    return this._canvasElement;
  }

  get CanvasContext(): CanvasRenderingContext2D {
    if (this._canvasContext == null) {
      throw new Error(
        `No Canvas Context loaded. 
        Please call one of the Canvas's functions: 
        [
            LoadCanvas, 
            LoadCanvasById, 
            LoadCanvasByConfigId
        ] 
        to load it`
      );
    }

    return this._canvasContext;
  }

  private constructor() {
    super();
    this._canvasElement = null;
    this._canvasContext = null;
  }

  public static GetInstance(): Canvas {
    if (!Canvas._INSTANCE) {
      Canvas._INSTANCE = new Canvas();
    }

    return Canvas._INSTANCE;
  }

  public LoadCanvas(canvas: HTMLCanvasElement): void {
    this._canvasElement = canvas;
    this._canvasElement.width = this.Config.Parameters.canvas.width;
    this._canvasElement.height = this.Config.Parameters.canvas.heigth;
    this._canvasElement.style.setProperty(
      "--scale",
      this.Config.Parameters.canvas.scale
    );

    this._canvasContext = <CanvasRenderingContext2D>(
      this._canvasElement.getContext(this.Config.Parameters.canvas.context)
    );
  }

  public LoadCanvasByConfigId(): void {
    this.LoadCanvasById(this.Config.Parameters.canvas.id);
  }

  public LoadCanvasById(canvasId: string): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.getElementById(canvasId)
    );

    if (!canvas) {
      throw new Error(`No canvas element with ID: '${canvasId}' found`);
    }

    this.LoadCanvas(canvas);
  }

  public ValidateCanvas(): void {
    this.CanvasElement;
    this.CanvasContext;
    this.ValidateCanvasConfig();
  }

  private ValidateCanvasConfig(): void {
    if (
      this.Config.Parameters.canvas.width <= 0 ||
      this.Config.Parameters.canvas.width % this.Config.Parameters.tile.size !==
        0
    ) {
      throw new Error("Invalid canvas width");
    }

    if (
      this.Config.Parameters.canvas.heigth <= 0 ||
      this.Config.Parameters.canvas.heigth %
        this.Config.Parameters.tile.size !==
        0
    ) {
      throw new Error("Invalid canvas height");
    }
  }
}
