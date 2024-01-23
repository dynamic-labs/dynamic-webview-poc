import EventEmitter from 'eventemitter3';

export class ChangeNotifier {
  private eventEmitter = new EventEmitter<{ update: () => void }>();

  notifyListeners() {
    this.eventEmitter.emit('update');
  }

  addListener(listener: () => void) {
    this.eventEmitter.on('update', listener);
  }

  removeListener(listener: () => void) {
    this.eventEmitter.off('update', listener);
  }
}
