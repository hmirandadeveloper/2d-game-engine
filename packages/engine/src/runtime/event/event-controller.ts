import { EngineElement } from "@engine-runtime/engine-element";
// import { EventType } from "@engine-runtime/event/event-type";

export class EventController extends EngineElement {
  private static _INSTANCE: EventController;

  private constructor() {
    super();
  }

  public static GetInstance(): EventController {
    if (!EventController._INSTANCE) {
      EventController._INSTANCE = new EventController();
    }

    return EventController._INSTANCE;
  }

  //   public Dispatch(eventType: EventType) {}
}
