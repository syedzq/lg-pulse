export interface Campaign {
    title: string;
    url: string;
    description?: string;
    goal?: number;
    raised?: number;
    imageUrl: string;
    isSponsored?: boolean;
    isZakatVerified?: boolean;
}

export const CAMPAIGNS: Campaign[] = [
    {
        title: "Emergency Relief: Gaza Humanitarian Crisis",
        description: "Urgent support needed for medical supplies, food, and shelter",
        url: "https://www.launchgood.com/campaign/emergency_relief_gaza_humanitarian_crisis",
        goal: 150000,
        raised: 98750,
        imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false
    },
    {
        title: "Morocco Earthquake Emergency Response",
        description: "Supporting communities affected by the devastating earthquake",
        url: "https://www.launchgood.com/campaign/morocco_earthquake_emergency_response",
        goal: 75000,
        raised: 42365,
        imageUrl: "https://images.unsplash.com/photo-1590677880658-33600e64d128?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: true
    },
    {
        title: "Syria-Türkiye Earthquake Recovery",
        description: "Long-term recovery support for affected regions",
        url: "https://www.launchgood.com/campaign/syria_turkiye_earthquake_recovery",
        goal: 100000,
        raised: 67890,
        imageUrl: "https://images.unsplash.com/photo-1587653263995-422546a7a569?auto=format&fit=crop&q=80",
        isZakatVerified: false,
        isSponsored: false
    },
    {
        title: "Yemen Emergency Relief Fund",
        description: "Critical aid for families affected by the crisis",
        url: "https://www.launchgood.com/campaign/yemen_emergency_relief_fund",
        goal: 50000,
        raised: 28450,
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false
    },
    {
        title: "Palestine Children's Relief Fund",
        description: "Medical care and support for Palestinian children",
        url: "https://www.launchgood.com/campaign/palestine_childrens_relief_fund",
        goal: 125000,
        raised: 89275,
        imageUrl: "https://images.unsplash.com/photo-1597113366853-fea190b6cd82?auto=format&fit=crop&q=80",
        isZakatVerified: false,
        isSponsored: true
    },
    {
        title: "Global Food Security Initiative",
        description: "Fighting hunger in vulnerable communities worldwide",
        url: "https://www.launchgood.com/campaign/global_food_security_initiative",
        goal: 80000,
        raised: 15680,
        imageUrl: "https://images.unsplash.com/photo-1593113598332-cd59c5bc3f90?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false
    },
    {
        title: "Support for Orphans Worldwide",
        description: "Providing care and education for orphaned children",
        url: "https://www.launchgood.com/campaign/support_for_orphans_worldwide",
        goal: 35000,
        raised: 12450,
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
        isZakatVerified: false,
        isSponsored: true
    },
    {
        title: "Clean Water Projects in Africa",
        description: "Building wells and water systems in rural communities",
        url: "https://www.launchgood.com/campaign/clean_water_projects_africa",
        goal: 45000,
        raised: 8925,
        imageUrl: "https://images.unsplash.com/photo-1441205188609-b875e92a9807?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false
    },
    {
        title: "Education for Refugee Children",
        description: "Ensuring continued education in refugee camps",
        url: "https://www.launchgood.com/campaign/education_for_refugee_children",
        goal: 60000,
        raised: 32150,
        imageUrl: "https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?auto=format&fit=crop&q=80",
        isZakatVerified: false,
        isSponsored: true
    },
    {
        title: "Emergency Medical Aid Fund",
        description: "Supporting urgent medical needs in crisis zones",
        url: "https://www.launchgood.com/campaign/emergency_medical_aid_fund",
        goal: 95000,
        raised: 54325,
        imageUrl: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false
    }
]; 