"use client";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect, useState } from 'react';
import NumberFlow from '@number-flow/react';

// Add currency and amount types at the top with other constants
interface CityData {
    name: string;
    lat: number;
    lng: number;
    weight: number;
    currency?: string; // Optional currency code
}

// Donor cities with weights (higher number = more frequent selection)
const DONOR_CITIES: CityData[] = [
    // High frequency donors (weight: 8)
    { name: "Mississauga", lat: 43.5890, lng: -79.6441, weight: 8, currency: "CAD" },
    { name: "Toronto", lat: 43.6532, lng: -79.3832, weight: 8, currency: "CAD" },
    { name: "London", lat: 51.5074, lng: -0.1278, weight: 8, currency: "GBP" },
    { name: "San Francisco", lat: 37.7749, lng: -122.4194, weight: 8, currency: "USD" },
    { name: "San Jose", lat: 37.3382, lng: -121.8863, weight: 8, currency: "USD" },
    
    // Medium frequency donors (weight: 5)
    { name: "New York", lat: 40.7128, lng: -74.0060, weight: 5, currency: "USD" },
    { name: "Chicago", lat: 41.8781, lng: -87.6298, weight: 5, currency: "USD" },
    { name: "Houston", lat: 29.7604, lng: -95.3698, weight: 5, currency: "USD" },
    { name: "Detroit", lat: 42.3314, lng: -83.0458, weight: 5, currency: "USD" },
    
    // Regular donors (weight: 3)
    { name: "Sydney", lat: -33.8688, lng: 151.2093, weight: 3, currency: "AUD" },
    { name: "Auckland", lat: -36.8509, lng: 174.7645, weight: 3, currency: "NZD" },
    { name: "Dallas", lat: 32.7767, lng: -96.7970, weight: 3, currency: "USD" },
    { name: "Atlanta", lat: 33.7490, lng: -84.3880, weight: 3, currency: "USD" },
    { name: "Vancouver", lat: 49.2827, lng: -123.1207, weight: 3, currency: "CAD" },
    { name: "Montreal", lat: 45.5017, lng: -73.5673, weight: 3, currency: "CAD" },
    { name: "Birmingham", lat: 52.4862, lng: -1.8904, weight: 3, currency: "GBP" },
    { name: "Manchester", lat: 53.4808, lng: -2.2426, weight: 3, currency: "GBP" }
    // ... add more donor cities as needed
];

// Recipient cities with weights
const RECIPIENT_CITIES = [
    // High priority recipients (weight: 10)
    { name: "Gaza", lat: 31.5017, lng: 34.4668, weight: 10, currency: "USD" },
    { name: "Beirut", lat: 33.8938, lng: 35.5018, weight: 10, currency: "USD" },
    { name: "Karachi", lat: 24.8607, lng: 67.0011, weight: 10, currency: "PKR" },
    { name: "Nablus", lat: 32.2211, lng: 35.2544, weight: 10, currency: "USD" },
    { name: "Hebron", lat: 31.5326, lng: 35.0998, weight: 10, currency: "USD" },
    
    // Medium priority recipients (weight: 6)
    { name: "Dhaka", lat: 23.8103, lng: 90.4125, weight: 6, currency: "BDT" },
    { name: "Lahore", lat: 31.5204, lng: 74.3587, weight: 6, currency: "PKR" },
    { name: "Istanbul", lat: 41.0082, lng: 28.9784, weight: 6, currency: "TRY" },
    { name: "Mogadishu", lat: 2.0469, lng: 45.3182, weight: 6, currency: "SOS" },
    { name: "Khartoum", lat: 15.5007, lng: 32.5599, weight: 6, currency: "SDG" },
    { name: "Hargeisa", lat: 9.5582, lng: 44.0604, weight: 6, currency: "SOS" },
    { name: "Touba", lat: 14.8676, lng: -15.8830, weight: 6, currency: "XOF" },
    { name: "Dakar", lat: 14.7167, lng: -17.4677, weight: 6, currency: "XOF" },
    
    // Regular recipients (weight: 3)
    { name: "Chittagong", lat: 22.3569, lng: 91.7832, weight: 3, currency: "BDT" },
    { name: "Casablanca", lat: 33.5731, lng: -7.5898, weight: 3, currency: "MAD" },
    { name: "Delhi", lat: 28.6139, lng: 77.2090, weight: 3, currency: "INR" },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867, weight: 3, currency: "INR" },
    { name: "Addis Ababa", lat: 9.0320, lng: 38.7492, weight: 3, currency: "ETB" },
    { name: "Cairo", lat: 30.0444, lng: 31.2357, weight: 3, currency: "EGP" },
    { name: "Amman", lat: 31.9454, lng: 35.9284, weight: 3, currency: "JOD" },
    { name: "Peshawar", lat: 34.0151, lng: 71.5249, weight: 3, currency: "PKR" },
    { name: "Tripoli", lat: 32.8872, lng: 13.1913, weight: 3, currency: "LYD" },
    { name: "Durban", lat: -29.8587, lng: 31.0218, weight: 3, currency: "ZAR" },
    { name: "Mombasa", lat: -4.0435, lng: 39.6682, weight: 3, currency: "KES" },
    { name: "Bamako", lat: 12.6392, lng: -8.0029, weight: 3, currency: "XOF" },
    { name: "Conakry", lat: 9.6412, lng: -13.5784, weight: 3, currency: "GNF" },
    { name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869, weight: 3, currency: "MYR" },
    { name: "Jakarta", lat: -6.2088, lng: 106.8456, weight: 3, currency: "IDR" },
    { name: "Surabaya", lat: -7.2575, lng: 112.7521, weight: 3, currency: "IDR" },
    { name: "Fez", lat: 34.0181, lng: -5.0078, weight: 6, currency: "MAD" },
    { name: "Rabat", lat: 34.0209, lng: -6.8416, weight: 6, currency: "MAD" },
    { name: "Marrakech", lat: 31.6295, lng: -7.9811, weight: 6, currency: "MAD" },
    { name: "Nouakchott", lat: 18.0735, lng: -15.9582, weight: 6, currency: "MRU" },
    { name: "Banjul", lat: 13.4549, lng: -16.5790, weight: 6, currency: "GMD" },
    { name: "Freetown", lat: 8.4847, lng: -13.2343, weight: 6, currency: "SLL" },
    { name: "Ouagadougou", lat: 12.3714, lng: -1.5197, weight: 6, currency: "XOF" },
    { name: "Niamey", lat: 13.5137, lng: 2.1098, weight: 6, currency: "XOF" },
    { name: "Bandung", lat: -6.9175, lng: 107.6191, weight: 3, currency: "IDR" },
    { name: "Medan", lat: 3.5952, lng: 98.6722, weight: 3, currency: "IDR" },
    { name: "Semarang", lat: -6.9932, lng: 110.4203, weight: 3, currency: "IDR" },
    { name: "Malang", lat: -7.9797, lng: 112.6304, weight: 3, currency: "IDR" },
    { name: "Johor Bahru", lat: 1.4927, lng: 103.7414, weight: 3, currency: "MYR" },
    { name: "Penang", lat: 5.4141, lng: 100.3288, weight: 3, currency: "MYR" },
    { name: "Kota Kinabalu", lat: 5.9804, lng: 116.0735, weight: 3, currency: "MYR" },
    { name: "Bandar Seri Begawan", lat: 4.9031, lng: 114.9398, weight: 3, currency: "BND" },
    { name: "Davao", lat: 7.1907, lng: 125.4553, weight: 3, currency: "PHP" },
    { name: "Zamboanga", lat: 6.9214, lng: 122.0790, weight: 3, currency: "PHP" },
    { name: "Male", lat: 4.1755, lng: 73.5093, weight: 3, currency: "MVR" },
    { name: "Port Louis", lat: -20.1609, lng: 57.5012, weight: 3, currency: "MUR" },
    { name: "Zanzibar City", lat: -6.1659, lng: 39.2026, weight: 3, currency: "TZS" },
    { name: "Lilongwe", lat: -13.9626, lng: 33.7741, weight: 3, currency: "MWK" },
    { name: "Maputo", lat: -25.9692, lng: 32.5732, weight: 3, currency: "MZN" },
    { name: "Lusaka", lat: -15.3875, lng: 28.3228, weight: 3, currency: "ZMW" },
    { name: "Gaborone", lat: -24.6282, lng: 25.9231, weight: 3, currency: "BWP" },
    { name: "Windhoek", lat: -22.5609, lng: 17.0658, weight: 3, currency: "NAD" }
];

// Add these conversion rates near the top with other constants
const CURRENCY_TO_USD: { [key: string]: number } = {
    'USD': 1,
    'CAD': 0.74,
    'GBP': 1.27,
    'AUD': 0.66,
    'NZD': 0.61,
    'PKR': 0.0036,
    'BDT': 0.0091,
    'TRY': 0.031,
    'MAD': 0.099,
    'INR': 0.012,
    'ETB': 0.018,
    'EGP': 0.032
};

// Function to select a random city based on weights
function getRandomCity(cities: typeof DONOR_CITIES | typeof RECIPIENT_CITIES) {
    const totalWeight = cities.reduce((sum, city) => sum + city.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const city of cities) {
        random -= city.weight;
        if (random <= 0) {
            return city;
        }
    }
    return cities[0]; // Fallback
}

function latLongToVector3(lat: number, long: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    return new THREE.Vector3(x, y, z);
}

// Function to generate a random donation amount with weighted probability
function generateDonationAmount(): number {
    const commonAmounts = [
        5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 
        150, 200, 250, 500, 1000, 2500, 5000
    ];
    
    const rand = Math.random();
    if (rand < 0.001) { // 0.1% chance for large donations
        return commonAmounts[Math.floor(Math.random() * 2) + 15]; // 2500 or 5000
    } else if (rand < 0.01) { // 0.9% chance for medium-large donations
        return commonAmounts[Math.floor(Math.random() * 3) + 12]; // 500-1000
    } else if (rand < 0.1) { // 9% chance for medium donations
        return commonAmounts[Math.floor(Math.random() * 4) + 8]; // 100-250
    } else if (rand < 0.4) { // 30% chance for small-medium donations
        return commonAmounts[Math.floor(Math.random() * 4) + 4]; // 30-75
    } else { // 60% chance for small donations
        return commonAmounts[Math.floor(Math.random() * 4)]; // 5-20
    }
}
// Add this interface for campaign data
interface Campaign {
    title: string;
    url: string;
}

// Add sample LaunchGood campaigns
const CAMPAIGNS: Campaign[] = [
    {
        title: "Emergency Relief: Gaza Humanitarian Crisis",
        url: "https://www.launchgood.com/GazaRelief"
    },
    {
        title: "Morocco Earthquake Emergency Response",
        url: "https://www.launchgood.com/MoroccoRelief"
    },
    {
        title: "Syria-Türkiye Earthquake Emergency Relief",
        url: "https://www.launchgood.com/STRelief"
    },
    {
        title: "Yemen Emergency Relief Fund",
        url: "https://www.launchgood.com/YemenRelief"
    },
    {
        title: "Palestine Children's Relief Fund",
        url: "https://www.launchgood.com/PCRF"
    },
    {
        title: "Global Sadaqah: Feed the Hungry",
        url: "https://www.launchgood.com/FeedTheHungry"
    },
    {
        title: "Support Orphans Worldwide",
        url: "https://www.launchgood.com/Orphans"
    },
    {
        title: "Build Water Wells in Africa",
        url: "https://www.launchgood.com/WaterWells"
    },
    {
        title: "Education for Refugee Children",
        url: "https://www.launchgood.com/RefugeeEducation"
    },
    {
        title: "Emergency Medical Aid Fund",
        url: "https://www.launchgood.com/MedicalAid"
    }
];

// Update PathData interface to include circle
interface PathData {
    amount: number;
    fromCity: CityData;
    toCity: CityData;
    path: THREE.Mesh;
    traveledPath: THREE.Mesh;
    circle?: THREE.Mesh;
    isHovered: boolean;
    lastHoverTime: number;
    fadeTimeout?: NodeJS.Timeout;
    campaign: Campaign;
}

// Update createTooltip to make it clickable
function createTooltip(): HTMLDivElement {
    const tooltip = document.createElement('div');
    document.body.appendChild(tooltip);
    
    tooltip.style.cssText = `
        position: fixed;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(16px);
        border-radius: 8px;
        color: white;
        font-family: "Plus Jakarta Sans", Arial, sans-serif;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 100000;
        white-space: nowrap;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        pointer-events: auto;
        transform: translateZ(0);
        cursor: pointer;
    `;

    return tooltip;
}

// Add this function to create thick line geometry
function createThickLineGeometry(points: THREE.Vector3[], thickness: number): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const nextPoint = points[i + 1];

        if (nextPoint) {
            // Calculate direction and perpendicular
            const direction = nextPoint.clone().sub(point).normalize();
            const up = new THREE.Vector3(0, 1, 0);
            const perpendicular = direction.clone().cross(up).normalize();

            // Create quad vertices
            const v1 = point.clone().add(perpendicular.clone().multiplyScalar(thickness));
            const v2 = point.clone().sub(perpendicular.clone().multiplyScalar(thickness));
            const v3 = nextPoint.clone().add(perpendicular.clone().multiplyScalar(thickness));
            const v4 = nextPoint.clone().sub(perpendicular.clone().multiplyScalar(thickness));

            // Add vertices
            positions.push(
                v1.x, v1.y, v1.z,
                v2.x, v2.y, v2.z,
                v3.x, v3.y, v3.z,
                v4.x, v4.y, v4.z
            );

            // Add indices for triangles
            const vertexOffset = i * 4;
            indices.push(
                vertexOffset, vertexOffset + 1, vertexOffset + 2,
                vertexOffset + 1, vertexOffset + 3, vertexOffset + 2
            );
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    return geometry;
}

// Add this function near other sprite/visual effect functions
function createEmojiSprite(size: number): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 64;
    canvas.height = 64;

    context.font = '48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('💚', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        depthTest: true
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    
    const ratio = canvas.width / canvas.height;
    sprite.scale.set(size, size / ratio, 1);
    
    return sprite;
}

// Add this function to create city markers
function createCityMarker(city: CityData): THREE.Group {
    const group = new THREE.Group();
    
    // Create floating dot using a sprite instead of a mesh
    const dotCanvas = document.createElement('canvas');
    const dotContext = dotCanvas.getContext('2d')!;
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    
    // Draw circle on canvas
    dotContext.beginPath();
    dotContext.arc(32, 32, 16, 0, Math.PI * 2);
    dotContext.fillStyle = '#ffffff';
    dotContext.fill();
    
    const dotTexture = new THREE.CanvasTexture(dotCanvas);
    const dotMaterial = new THREE.SpriteMaterial({
        map: dotTexture,
        transparent: true,
        opacity: 0.8,
        depthTest: false, // Ensure dot is always visible
        depthWrite: false
    });
    const dot = new THREE.Sprite(dotMaterial);
    dot.scale.set(0.03, 0.03, 1);
    dot.renderOrder = 2; // Higher render order

    // Create label with higher z-index
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 64;

    // Draw text with viewport-adjusted font size
    const viewportHeight = window.innerHeight;
    const scaleFactor = viewportHeight / 1080;
    const fontSize = Math.round(24 * scaleFactor);

    context.font = `${fontSize}px "Plus Jakarta Sans", Arial`;
    context.fillStyle = '#ffffff';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(city.name, 0, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        depthTest: false, // Ensure text is always visible
        depthWrite: false
    });
    const label = new THREE.Sprite(labelMaterial);
    
    // Scale sprite based on viewport
    const spriteScale = 0.3 * (viewportHeight / 1080);
    label.scale.set(spriteScale, spriteScale * 0.25, 1);
    label.position.x = 0.03;
    label.position.y = 0.02;
    label.renderOrder = 3; // Highest render order

    group.add(dot);
    group.add(label);
    
    return group;
}

// Update createPulsingCircle function (rename it since it no longer pulses)
function createDonationCircle(amount: number): THREE.Mesh {
    // Calculate size based on donation amount
    // Base size for donations under $5
    let size = 0.01;
    
    if (amount >= 5000) {
        size = 0.04; // Largest size for donations >= $5000
    } else if (amount >= 1000) {
        size = 0.035; // Large for donations >= $1000
    } else if (amount >= 500) {
        size = 0.03; // Medium-large for donations >= $500
    } else if (amount >= 100) {
        size = 0.025; // Medium for donations >= $100
    } else if (amount >= 50) {
        size = 0.02; // Small-medium for donations >= $50
    } else if (amount >= 5) {
        size = 0.015; // Small for donations >= $5
    }

    const geometry = new THREE.SphereGeometry(size, 8, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        depthTest: true
    });
    return new THREE.Mesh(geometry, material);
}

// Add this before the Globe component
const activeCities = new Set<string>();
const cityLastDonationTime = new Map<string, number>();

export default function Home() {
    return (
        <div className="overflow-hidden bg-black">
            <Globe />
        </div>
    );
}

function Globe() {
    const [total, setTotal] = useState(679474372);
    const [donationsStarted, setDonationsStarted] = useState(false);

    useEffect(() => {
        // Constants
        const GLOBE_RADIUS = 2;

        // Set up scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        // Create textured globe
        const sphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
        const texture = new THREE.TextureLoader().load('/earth-day.jpg');
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 5
        });
        
        const globe = new THREE.Mesh(sphereGeometry, material);
        scene.add(globe);

        // Add city markers container right after creating the globe
        const cityMarkersContainer = new THREE.Group();
        globe.add(cityMarkersContainer);

        // Add markers for all cities
        [...DONOR_CITIES, ...RECIPIENT_CITIES].forEach(city => {
            const position = latLongToVector3(city.lat, city.lng, GLOBE_RADIUS + 0.03); // Raised higher
            const marker = createCityMarker(city);
            marker.position.copy(position);
            
            // No need for lookAt or rotation since we're using sprites
            cityMarkersContainer.add(marker);
        });

        // Set initial rotation based on timezone
        const timeZoneOffset = new Date().getTimezoneOffset();
        const rotationOffset = (timeZoneOffset / 60) * (Math.PI / 12); // Convert hours to radians
        globe.rotation.y = -rotationOffset;

        // Add halo effect with blue-green glow
        const haloGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.2, 32, 32);
        const haloMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                c: { value: 0.2 }, // Reduced intensity
                p: { value: 3.0 }, // Increased power for sharper falloff
                glowColor: { value: new THREE.Color(0xffffff) }, // Changed to white
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                uniform float c;
                uniform float p;
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
                    gl_FragColor = vec4(glowColor, intensity * 0.8);
                }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending, // Add additive blending for better glow
        });
        
        const halo = new THREE.Mesh(haloGeometry, haloMaterial);
        scene.add(halo);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Set camera position
        camera.position.z = GLOBE_RADIUS * 4;

        // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.minDistance = GLOBE_RADIUS * 3;
        controls.maxDistance = GLOBE_RADIUS * 5;

        // Create a container for all flight paths that will rotate with the globe
        const flightPathContainer = new THREE.Object3D();
        globe.add(flightPathContainer);

        // Create tooltip
        const tooltip = createTooltip();
        const activePaths = new Map<THREE.Mesh, PathData>();

        // Add raycaster for path detection
        const raycaster = new THREE.Raycaster();
        raycaster.params.Line!.threshold = 0.2; // Increase hit area
        const mouse = new THREE.Vector2();

        // Add this near the top of the Globe component
        let isGlobeHovered = false;
        let hoveredPath: PathData | null = null;

        // Update the mouse move handler to include globe hover detection
        function onMouseMove(event: MouseEvent) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            
            // Check for globe intersection first
            const globeIntersects = raycaster.intersectObject(globe);
            isGlobeHovered = globeIntersects.length > 0;
            
            // Then check for path intersections
            const pathIntersects = raycaster.intersectObjects(
                Array.from(activePaths.keys()),
                true
            );

            // Update cursor style based on path hover
            renderer.domElement.style.cursor = pathIntersects.length > 0 ? 'pointer' : 'default';

            hoveredPath = null;
            if (pathIntersects.length > 0) {
                const path = pathIntersects[0].object as THREE.Mesh;
                hoveredPath = activePaths.get(path);
                if (hoveredPath) {
                    isGlobeHovered = false; // Prioritize path hover over globe hover
                    
                    // Update tooltip
                    const { amount, fromCity, toCity, campaign } = hoveredPath;
                    const formattedAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                    tooltip.innerHTML = `
                        <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">
                            $${formattedAmount} ${fromCity.currency}
                        </div>
                        <div style="font-size: 14px; opacity: 0.8; margin-bottom: 8px;">
                            ${fromCity.name} to ${toCity.name}
                        </div>
                        <div style="font-size: 13px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; color: white;">
                            ${campaign.title}
                        </div>
                        <div class="campaign-image mt-2 w-[400px] h-[200px] overflow-hidden rounded-md">
                            <div class="w-full h-full bg-white/10 animate-pulse"></div>
                        </div>
                    `;

                    // Load campaign screenshot
                    const img = new Image();
                    img.onload = () => {
                        const imageContainer = tooltip.querySelector('.campaign-image');
                        if (imageContainer instanceof HTMLElement) {
                            imageContainer.innerHTML = '';
                            img.style.cssText = 'width: 400px; height: 200px; object-fit: cover; border-radius: 8px;';
                            imageContainer.appendChild(img);
                        }
                    };
                    img.onerror = () => {
                        const imageContainer = tooltip.querySelector('.campaign-image');
                        if (imageContainer instanceof HTMLElement) {
                            imageContainer.style.display = 'none';
                        }
                    };
                    img.src = `https://api.microlink.io/?url=${encodeURIComponent(campaign.url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle2&type=jpeg&overlay.browser=false&viewport.width=1280&viewport.height=720&screenshot.width=200&screenshot.height=400`;

                    const x = event.clientX + 20;
                    const y = event.clientY + 20;
                    
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                    tooltip.style.opacity = '1';
                }
            } else {
                tooltip.style.opacity = '0';
            }
        }

        window.addEventListener('mousemove', onMouseMove);

        // Function to create flight path
        function createFlightPath() {
            // Set donations as started when first path is created
            if (!donationsStarted) {
                setDonationsStarted(true);
            }

            const fromCity = getRandomCity(DONOR_CITIES);
            const toCity = getRandomCity(RECIPIENT_CITIES);
            const amount = generateDonationAmount();
            
            // Update timestamps for both cities
            const currentTime = Date.now();
            cityLastDonationTime.set(fromCity.name, currentTime);
            cityLastDonationTime.set(toCity.name, currentTime);
            
            // Add cities to active set
            activeCities.add(fromCity.name);
            activeCities.add(toCity.name);
            
            // Get base positions
            const start = latLongToVector3(fromCity.lat, fromCity.lng, GLOBE_RADIUS);
            const end = latLongToVector3(toCity.lat, toCity.lng, GLOBE_RADIUS);

            // Raise points slightly above the surface
            const surfaceOffset = 0.02;
            start.normalize().multiplyScalar(GLOBE_RADIUS + surfaceOffset);
            end.normalize().multiplyScalar(GLOBE_RADIUS + surfaceOffset);

            // Create curved path
            const distance = start.distanceTo(end);
            const mid = start.clone().lerp(end, 0.5);
            const angle = start.angleTo(end);

            // Scale arc height based on distance
            const minArcHeight = GLOBE_RADIUS * 0.15; // Reduced from 0.3
            const arcHeight = GLOBE_RADIUS * (0.15 + (distance / (GLOBE_RADIUS * 4))); // Scale with distance
            const finalArcHeight = Math.max(minArcHeight, arcHeight);

            // Ensure mid point is always above surface
            mid.normalize().multiplyScalar(GLOBE_RADIUS + finalArcHeight);

            // Only raise higher for very long paths
            if (angle > Math.PI * 0.5) {
                mid.multiplyScalar(1.2);
            }

            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const points = curve.getPoints(50);
            const fullPathGeometry = createThickLineGeometry(points, 0.01); // Adjust thickness here
            const traveledPathGeometry = createThickLineGeometry(points, 0.01);

            const fullPathMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.2,
                side: THREE.DoubleSide,
                depthTest: true
            });

            const traveledPathMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide,
                depthTest: true
            });

            const fullPath = new THREE.Mesh(fullPathGeometry, fullPathMaterial);
            const traveledPath = new THREE.Mesh(traveledPathGeometry, traveledPathMaterial);
            
            flightPathContainer.add(fullPath);
            flightPathContainer.add(traveledPath);

            // Create traveling circle
            const circle = createDonationCircle(amount);
            flightPathContainer.add(circle);

            // Animation
            let progress = 0;
            const fadeInDuration = 0.1;
            
            const animate = () => {
                progress += 0.0025;
                
                // Fade in
                if (progress < fadeInDuration) {
                    const fadeInProgress = progress / fadeInDuration;
                    fullPathMaterial.opacity = fadeInProgress * 0.2;
                    traveledPathMaterial.opacity = fadeInProgress * 0.8;
                }

                // Update traveled path - new approach
                const currentProgress = Math.floor(progress * points.length);
                const currentPoints = points.slice(0, currentProgress + 1);
                if (currentPoints.length > 1) {
                    const newGeometry = createThickLineGeometry(currentPoints, 0.01);
                    traveledPath.geometry.dispose();
                    traveledPath.geometry = newGeometry;
                }

                // Update positions
                const position = curve.getPoint(progress);
                circle.position.copy(position);

                // Fade out near end
                if (progress > 0.8) {
                    const fadeOutProgress = (progress - 0.8) / 0.2;
                    fullPathMaterial.opacity = 0.2 * (1 - fadeOutProgress);
                    traveledPathMaterial.opacity = 0.8 * (1 - fadeOutProgress);
                }

                // When animation completes (at the end)
                if (progress > 0.95 && progress < 0.96) {
                    // Convert amount to USD and update total
                    const usdAmount = amount * (CURRENCY_TO_USD[fromCity.currency || 'USD'] || 1);
                    setTotal(prevTotal => prevTotal + usdAmount);

                    // Create floating amount text
                    const formattedAmount = `+$${amount.toFixed(2)}`;
                    const amountSprite = createFloatingText(formattedAmount);
                    amountSprite.position.copy(position);
                    amountSprite.position.y += 0.2;
                    flightPathContainer.add(amountSprite);

                    // Animate floating amount
                    let textProgress = 0;
                    const animateText = () => {
                        textProgress += 0.02;
                        amountSprite.position.y += 0.01;

                        // Check visibility based on camera angle
                        const spritePos = amountSprite.position.clone();
                        const cameraPos = camera.position.clone();
                        const spriteToCam = cameraPos.clone().sub(spritePos).normalize();
                        const spriteNormal = spritePos.clone().normalize();
                        const dotProduct = spriteToCam.dot(spriteNormal);

                        // Calculate opacity based on both animation progress and visibility
                        const visibilityOpacity = dotProduct > 0.2 ? 1 : 0;
                        const fadeOpacity = 1 - textProgress;
                        (amountSprite.material as THREE.SpriteMaterial).opacity = 
                            Math.min(visibilityOpacity, fadeOpacity);

                        if (textProgress < 1 && amountSprite.material.opacity > 0.01) {
                            requestAnimationFrame(animateText);
                        } else {
                            flightPathContainer.remove(amountSprite);
                            amountSprite.material.dispose();
                            (amountSprite.material.map as THREE.Texture).dispose();
                        }
                    };
                    animateText();

                    // Determine number of hearts based on donation amount
                    let numHearts;
                    if (amount >= 5000) {
                        numHearts = Math.floor(Math.random() * 3) + 10; // 10-12 hearts
                    } else if (amount >= 1000) {
                        numHearts = Math.floor(Math.random() * 3) + 7; // 7-9 hearts
                    } else if (amount >= 500) {
                        numHearts = Math.floor(Math.random() * 2) + 5; // 5-6 hearts
                    } else if (amount >= 100) {
                        numHearts = Math.floor(Math.random() * 2) + 3; // 3-4 hearts
                    } else if (amount >= 50) {
                        numHearts = 2; // 2 hearts
                    } else {
                        numHearts = 1; // 1 heart
                    }
                    
                    for (let i = 0; i < numHearts; i++) {
                        const size = 0.05 + Math.random() * 0.05;
                        const emoji = createEmojiSprite(size);
                        emoji.position.copy(position);
                        
                        // Add random offset with larger spread for more hearts
                        const spread = numHearts > 6 ? 0.3 : 0.2;
                        emoji.position.x += (Math.random() - 0.5) * spread;
                        emoji.position.y += (Math.random() - 0.5) * spread;
                        emoji.position.z += (Math.random() - 0.5) * spread;
                        
                        flightPathContainer.add(emoji);

                        // Animate each heart
                        let emojiProgress = 0;
                        const emojiSpeed = 0.02 + Math.random() * 0.02;
                        const startY = emoji.position.y;
                        const startScale = emoji.scale.x;

                        const animateEmoji = () => {
                            emojiProgress += emojiSpeed;
                            
                            emoji.position.y = startY + (emojiProgress * 0.3);
                            emoji.material.opacity = 1 - emojiProgress;
                            emoji.scale.set(
                                startScale * (1 + emojiProgress * 0.5),
                                startScale * (1 + emojiProgress * 0.5),
                                1
                            );

                            if (emojiProgress < 1) {
                                requestAnimationFrame(animateEmoji);
                            } else {
                                flightPathContainer.remove(emoji);
                                emoji.material.dispose();
                                (emoji.material.map as THREE.Texture).dispose();
                            }
                        };

                        animateEmoji();
                    }
                }

                if (progress >= 1) {
                    const pathData = activePaths.get(fullPath);
                    
                    if (pathData === hoveredPath) {
                        // Don't cleanup if being hovered
                        requestAnimationFrame(animate);
                        return;
                    }
                    
                    const timeSinceLastHover = Date.now() - pathData.lastHoverTime;
                    if (timeSinceLastHover < 5000) {
                        // Don't cleanup if recently hovered
                        requestAnimationFrame(animate);
                        return;
                    }

                    // Cleanup code
                    flightPathContainer.remove(fullPath);
                    flightPathContainer.remove(traveledPath);
                    flightPathContainer.remove(circle);

                    // Clean up materials and geometries
                    fullPath.geometry.dispose();
                    traveledPath.geometry.dispose();
                    (fullPath.material as THREE.Material).dispose();
                    (traveledPath.material as THREE.Material).dispose();
                    circle.geometry.dispose();
                    (circle.material as THREE.Material).dispose();

                    // Remove from active paths
                    activePaths.delete(fullPath);
                    activePaths.delete(traveledPath);

                    // Decrease active flights count
                    activeFlights--;
                    return;
                }

                requestAnimationFrame(animate);
            };
            animate();

            const pathData: PathData = {
                amount,
                fromCity,
                toCity,
                path: fullPath,
                traveledPath,
                circle,
                isHovered: false,
                lastHoverTime: Date.now(),
                campaign: CAMPAIGNS[Math.floor(Math.random() * CAMPAIGNS.length)]
            };

            activePaths.set(fullPath, pathData);
            activePaths.set(traveledPath, pathData);

            // Increment active flights count
            activeFlights++;
        }

        // Update the flight creation management
        const maxFlights = 19;
        let activeFlights = 0;

        // Create new flight paths with better timing
        const createFlights = () => {
            if (activeFlights < maxFlights) {
                createFlightPath();
            }
        };

        // Create new flights with consistent interval
        const flightInterval = setInterval(createFlights, 400);

        // Update the animation loop
        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            
            // Only rotate if not hovered and no paths are being hovered
            if (!isGlobeHovered && !hoveredPath) {
                globe.rotation.y += 0.0005;
                halo.rotation.y += 0.0005;
            }

            // Update marker visibility with improved visibility check
            cityMarkersContainer.children.forEach((marker, index) => {
                const markerWorldPos = new THREE.Vector3();
                marker.getWorldPosition(markerWorldPos);
                
                const cameraPos = camera.position.clone();
                const markerToCam = cameraPos.clone().sub(markerWorldPos).normalize();
                const markerNormal = markerWorldPos.clone().normalize();
                const dotProduct = markerToCam.dot(markerNormal);
                
                const allCities = [...DONOR_CITIES, ...RECIPIENT_CITIES];
                const cityName = allCities[index].name;
                const lastDonationTime = cityLastDonationTime.get(cityName) || 0;
                const timeSinceLastDonation = Date.now() - lastDonationTime;
                
                // Get dot and label materials from marker children
                const dot = marker.children[0] as THREE.Sprite;
                const label = marker.children[1] as THREE.Sprite;
                
                const isRecent = timeSinceLastDonation < 5000;
                const targetOpacity = (activeCities.has(cityName) && isRecent && dotProduct > 0.2) ? 0.8 : 0;
                (dot.material as THREE.SpriteMaterial).opacity += (targetOpacity - (dot.material as THREE.SpriteMaterial).opacity) * 0.1;
                (label.material as THREE.SpriteMaterial).opacity += (targetOpacity - (label.material as THREE.SpriteMaterial).opacity) * 0.1;

                marker.visible = (dot.material as THREE.SpriteMaterial).opacity > 0.01;
            });

            // Update path visibility with smooth transitions
            activePaths.forEach((pathData) => {
                const fullPath = pathData.path;
                const traveledPath = pathData.traveledPath;
                const circle = pathData.circle;
                const fullMaterial = fullPath.material as THREE.MeshBasicMaterial;
                const traveledMaterial = traveledPath.material as THREE.MeshBasicMaterial;

                // Calculate target opacity based on hover state
                const isHovered = pathData === hoveredPath;
                
                if (isHovered) {
                    // When hovered, keep fully visible
                    pathData.isHovered = true;
                    pathData.lastHoverTime = Date.now();
                } else if (pathData.isHovered) {
                    // Just stopped hovering
                    pathData.isHovered = false;
                    pathData.lastHoverTime = Date.now();
                }

                const timeSinceLastHover = Date.now() - pathData.lastHoverTime;
                const shouldBeVisible = isHovered || timeSinceLastHover < 5000;

                // Set target opacities
                const targetOpacity = isHovered ? 1 : (shouldBeVisible ? 0.2 : 0);
                const targetTraveledOpacity = isHovered ? 1 : (shouldBeVisible ? 0.8 : 0);

                // Smooth transition
                fullMaterial.opacity += (targetOpacity - fullMaterial.opacity) * 0.1;
                traveledMaterial.opacity += (targetTraveledOpacity - traveledMaterial.opacity) * 0.1;

                // Update visibility based on opacity
                const isVisible = fullMaterial.opacity > 0.01;
                fullPath.visible = isVisible;
                traveledPath.visible = isVisible;
                if (circle) {
                    circle.visible = isVisible;
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Update the click handler in the Globe component
        renderer.domElement.addEventListener('click', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(
                Array.from(activePaths.keys()),
                true
            );

            if (intersects.length > 0) {
                const path = intersects[0].object as THREE.Mesh;
                const pathData = activePaths.get(path);
                
                if (pathData) {
                    // Check if the intersection point is on a visible part of the path
                    const point = intersects[0].point;
                    const cameraDirection = new THREE.Vector3();
                    camera.getWorldDirection(cameraDirection);
                    
                    // Calculate dot product to check if point faces camera
                    const pointDirection = point.clone().normalize();
                    const dotProduct = cameraDirection.dot(pointDirection);
                    
                    // Only open URL if point is facing camera (not behind globe)
                    if (dotProduct < 0) {
                        window.open(pathData.campaign.url, '_blank', 'noopener,noreferrer');
                    }
                }
            }
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            document.body.removeChild(renderer.domElement);
            clearInterval(flightInterval);
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeChild(tooltip);
        };
    }, [donationsStarted]); // Add donationsStarted to dependency array

    return (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[1000]">
            <NumberFlow 
                value={total}
                prefix="$"
                format={{ 
                    notation: 'standard',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }}
                className="text-white text-5xl font-bold font-['Plus_Jakarta_Sans']"
                style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontFeatureSettings: '"tnum"',
                    fontVariantNumeric: 'tabular-nums',
                    position: 'fixed',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
                transformTiming={{ duration: 800, easing: 'ease-out' }}
            />
        </div>
    );
}

// Add window resize handler to update text sizes
window.addEventListener('resize', () => {
    // Recreate all text sprites with new sizes
    // This would need to be implemented in your main component
    // to update all existing text elements
});

// Add this helper function for creating floating text
function createFloatingText(text: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 64;

    const fontSize = Math.round(24 * (window.innerHeight / 1080));
    context.font = `${fontSize}px "Plus Jakarta Sans", Arial`;
    context.fillStyle = '#34D399'; // text-green-500 equivalent
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false
    });

    const sprite = new THREE.Sprite(material);
    const ratio = canvas.width / canvas.height;
    sprite.scale.set(0.5, 0.5 / ratio, 1);
    
    return sprite;
}
