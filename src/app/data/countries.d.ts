declare module "*.json" {
    interface Geography {
        rsmKey: string;
        properties: {
            name: string;
            continent: string;
            iso_a3?: string;
            ISO_A3?: string;
            id?: string;
        };
    }

    interface WorldData {
        type: string;
        arcs: number[][][];
        transform: {
            scale: [number, number];
            translate: [number, number];
        };
        objects: {
            countries: {
                type: string;
                geometries: Geography[];
            };
        };
    }

    const value: WorldData;
    export default value;
} 