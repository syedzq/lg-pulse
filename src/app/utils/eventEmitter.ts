// Define event types
interface DonationCard {
    id: string;
    amount: number;
    currency: string;
    fromCity: string;
    toCity: string;
    campaignTitle: string;
    campaignUrl: string;
    timestamp: number;
}

interface EventMap {
    newDonation: DonationCard;
    // Add other event types here as needed
}

type EventKey = keyof EventMap;
type Listener<K extends EventKey> = (data: EventMap[K]) => void;

class EventEmitter {
    private listeners: { [K in EventKey]?: Listener<K>[] } = {};

    on<K extends EventKey>(event: K, callback: Listener<K>) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]?.push(callback);
    }

    emit<K extends EventKey>(event: K, data: EventMap[K]) {
        this.listeners[event]?.forEach(callback => callback(data));
    }

    off<K extends EventKey>(event: K, callback: Listener<K>) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event]?.filter(
                cb => cb !== callback
            ) as Listener<K>[];
        }
    }
}

export const eventEmitter = new EventEmitter();
export type { DonationCard }; 