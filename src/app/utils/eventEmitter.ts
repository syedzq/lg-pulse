type EventData = {
    [key: string]: unknown;
};

type Listener = (data: EventData) => void;

class EventEmitter {
    private listeners: { [key: string]: Listener[] } = {};

    on(event: string, callback: Listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, data: EventData) {
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