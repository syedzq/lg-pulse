export const DONOR_NAMES = [
    // Middle Eastern names
    "Mukhtar Khan",
    "Fatima Al-Sayed",
    "Ahmed Hassan",
    "Zainab Malik",
    "Omar Qureshi",
    "Aisha Rahman",
    "Yusuf Abdullah",
    "Mariam Aziz",
    "Ibrahim Khalil",
    "Layla Mahmood",
    
    // South Asian names
    "Rahul Patel",
    "Priya Singh",
    "Abdul Rahman",
    "Zara Shah",
    "Mohammed Ali",
    "Sana Mirza",
    "Imran Khan",
    "Noor Ahmed",
    "Reza Hussain",
    "Amira Syed",
    
    // Western names
    "Sarah Johnson",
    "Michael Chen",
    "David Williams",
    "Emma Thompson",
    "James Wilson",
    "Maria Garcia",
    "John Smith",
    "Lisa Anderson",
    "Robert Taylor",
    "Anna Martinez"
];

export function getRandomDonorName(): string {
    // 1/3 chance of anonymous
    if (Math.random() < 0.33) {
        return "An anonymous kind soul";
    }
    
    // Otherwise pick a random name
    return DONOR_NAMES[Math.floor(Math.random() * DONOR_NAMES.length)];
} 