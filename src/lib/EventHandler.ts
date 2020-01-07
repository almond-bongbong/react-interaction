type Callback = (event: any) => void;

class EventHandlerClass {
  functionMap: object;

  constructor() {
    this.functionMap = {};
  }

  addEventListener(event: string, func: Callback) {
    this.functionMap[event] = func;
    document.addEventListener(event.split('.')[0], this.functionMap[event]);
  }

  removeEventListener(event: string) {
    document.removeEventListener(event.split('.')[0], this.functionMap[event]);
    delete this.functionMap[event];
  }
}

export const EventHandler = new EventHandlerClass();
