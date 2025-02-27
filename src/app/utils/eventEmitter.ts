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
    donorName: string;
}

interface EventMap {
    newDonation: DonationCard;
    // Add other event types here as needed
}

type EventKey = keyof EventMap;

class EventEmitter {
    private listeners: { [K in EventKey]?: Array<(data: EventMap[K]) => void> } = {};

    on<K extends EventKey>(event: K, callback: (data: EventMap[K]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]?.push(callback);
    }

    emit<K extends EventKey>(event: K, data: EventMap[K]) {
        this.listeners[event]?.forEach(callback => callback(data));
    }

    off<K extends EventKey>(event: K, callback: (data: EventMap[K]) => void) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event]?.filter(
                cb => cb !== callback
            );
        }
    }
}

export const eventEmitter = new EventEmitter();
export type { DonationCard }; 