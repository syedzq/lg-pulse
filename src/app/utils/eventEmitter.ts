type Listener = (data: any) => void;

class EventEmitter {
    private listeners: { [key: string]: Listener[] } = {};

    on(event: string, callback: Listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, data: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }

    off(event: string, callback: Listener) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
}

export const eventEmitter = new EventEmitter(); 