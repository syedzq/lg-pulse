export interface Campaign {
    title: string;
    url: string;
    description?: string;
    goal?: number;
    raised?: number;
}

export const CAMPAIGNS: Campaign[] = [
    {
        title: "Emergency Relief: Gaza Humanitarian Crisis",
        description: "Urgent support needed for medical supplies, food, and shelter",
        url: "https://www.launchgood.com/campaign/emergency_relief_gaza_humanitarian_crisis",
        goal: 1000000,
        raised: 750000
    },
    {
        title: "Morocco Earthquake Emergency Response",
        description: "Supporting communities affected by the devastating earthquake",
        url: "https://www.launchgood.com/campaign/morocco_earthquake_emergency_response",
        goal: 500000,
        raised: 320000
    },
    {
        title: "Syria-Türkiye Earthquake Recovery",
        description: "Long-term recovery support for affected regions",
        url: "https://www.launchgood.com/campaign/syria_turkiye_earthquake_recovery",
        goal: 750000,
        raised: 480000
    },
    {
        title: "Yemen Emergency Relief Fund",
        description: "Critical aid for families affected by the crisis",
        url: "https://www.launchgood.com/campaign/yemen_emergency_relief_fund",
        goal: 600000,
        raised: 425000
    },
    {
        title: "Palestine Children's Relief Fund",
        description: "Medical care and support for Palestinian children",
        url: "https://www.launchgood.com/campaign/palestine_childrens_relief_fund",
        goal: 400000,
        raised: 285000
    },
    {
        title: "Global Food Security Initiative",
        description: "Fighting hunger in vulnerable communities worldwide",
        url: "https://www.launchgood.com/campaign/global_food_security_initiative",
        goal: 300000,
        raised: 180000
    },
    {
        title: "Support for Orphans Worldwide",
        description: "Providing care and education for orphaned children",
        url: "https://www.launchgood.com/campaign/support_for_orphans_worldwide",
        goal: 250000,
        raised: 175000
    },
    {
        title: "Clean Water Projects in Africa",
        description: "Building wells and water systems in rural communities",
        url: "https://www.launchgood.com/campaign/clean_water_projects_africa",
        goal: 200000,
        raised: 145000
    },
    {
        title: "Education for Refugee Children",
        description: "Ensuring continued education in refugee camps",
        url: "https://www.launchgood.com/campaign/education_for_refugee_children",
        goal: 350000,
        raised: 230000
    },
    {
        title: "Emergency Medical Aid Fund",
        description: "Supporting urgent medical needs in crisis zones",
        url: "https://www.launchgood.com/campaign/emergency_medical_aid_fund",
        goal: 450000,
        raised: 310000
    }
]; 