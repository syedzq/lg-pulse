export interface Campaign {
    title: string;
    url: string;
    description?: string;
    goal?: number;
    raised?: number;
    imageUrl: string;
    isSponsored?: boolean;
    isZakatVerified?: boolean;
    donorCount?: number;
    daysLeft?: number;
    organizer: {
        name: string;
        avatarUrl?: string;
    };
}

export const CAMPAIGNS: Campaign[] = [
    {
        title: "500 Winter Shelters for Gaza Families",
        description: "Urgent support needed for medical supplies, food, and shelter",
        url: "https://www.launchgood.com/v4/campaign/500_winter_shelters_for_gaza_families?src=internal_comm_page",
        goal: 150000,
        raised: 98750,
        imageUrl: "https://pmedia.launchgood.com/251570/500_winter_shelters_for_gaza_families_%D8%AE%D9%8A%D9%85%201%20copy%20%281%29-min-493x370.jpg",
        isZakatVerified: true,
        isSponsored: false,
        donorCount: 1247,
        daysLeft: 12,
        organizer: {
            name: "AusRelief",
            avatarUrl: "https://launchgood.s3.amazonaws.com/users/1030095/Untitled_design_%281%29_%281%29-80x80.png"
        }
    },
    {
        title: "Clean Water for One MILLION Refugees in Gaza & Syria",
        description: "Supporting communities affected by the devastating earthquake",
        url: "https://www.launchgood.com/campaign/morocco_earthquake_emergency_response",
        goal: 75000,
        raised: 42365,
        imageUrl: "https://pmedia.launchgood.com/190380/clean_water_for_one_million_refugees_in_gaza__syria_C1680T01%202-493x370.jpg",
        isZakatVerified: true,
        isSponsored: true,
        donorCount: 892,
        daysLeft: 8,
        organizer: {
            name: "Bonyan Organization",
            avatarUrl: "https://launchgood.s3.amazonaws.com/users/468647/لوغو_بنيان_PNG-80x80.png"
        }
    },
    {
        title: "Be Their Lifeline: Deliver Life-Saving Ambulances to Gaza 🚑",
        description: "Long-term recovery support for affected regions",
        url: "https://www.launchgood.com/campaign/syria_turkiye_earthquake_recovery",
        goal: 100000,
        raised: 67890,
        imageUrl: "https://pmedia.launchgood.com/199169/fund_lifesaving_ambulances_for_gaza__1446%20Cover%20Images%20%285%29-493x370.png",
        isZakatVerified: false,
        isSponsored: false,
        donorCount: 743,
        daysLeft: 15,
        organizer: {
            name: "Bonyan Organization",
            avatarUrl: "https://launchgood.s3.amazonaws.com/users/468647/لوغو_بنيان_PNG-80x80.png"
        }
    },
    {
        title: "Urgent Appeal: Safe Water for Gazans",
        description: "Critical aid for families affected by the crisis",
        url: "https://www.launchgood.com/campaign/yemen_emergency_relief_fund",
        goal: 50000,
        raised: 28450,
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false,
        donorCount: 456,
        daysLeft: 23,
        organizer: {
            name: "Bondh E Shams",
            avatarUrl: "https://launchgood.s3.amazonaws.com/users/1030342/21687980_1920288338224338_2412223760053646112_n-80x80.png"
        }
    },
    {
        title: "Palestine Children's Relief Fund",
        description: "Medical care and support for Palestinian children",
        url: "https://www.launchgood.com/campaign/palestine_childrens_relief_fund",
        goal: 125000,
        raised: 89275,
        imageUrl: "https://images.unsplash.com/photo-1597113366853-fea190b6cd82?auto=format&fit=crop&q=80",
        isZakatVerified: false,
        isSponsored: true,
        donorCount: 1893,
        daysLeft: 5,
        organizer: {
            name: "Save the Children",
            avatarUrl: "https://pmedia.launchgood.com/users/5/profile_pic.png"
        }
    },
    {
        title: "Global Food Security Initiative",
        description: "Fighting hunger in vulnerable communities worldwide",
        url: "https://www.launchgood.com/campaign/global_food_security_initiative",
        goal: 80000,
        raised: 15680,
        imageUrl: "https://images.unsplash.com/photo-1593113598332-cd59c5bc3f90?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false,
        donorCount: 234,
        daysLeft: 45,
        organizer: {
            name: "World Food Programme",
            avatarUrl: "https://pmedia.launchgood.com/users/6/profile_pic.png"
        }
    },
    {
        title: "Support for Orphans Worldwide",
        description: "Providing care and education for orphaned children",
        url: "https://www.launchgood.com/campaign/support_for_orphans_worldwide",
        goal: 35000,
        raised: 12450,
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
        isZakatVerified: false,
        isSponsored: true,
        donorCount: 178,
        daysLeft: 32,
        organizer: {
            name: "UNICEF",
            avatarUrl: "https://pmedia.launchgood.com/users/7/profile_pic.png"
        }
    },
    {
        title: "Clean Water Projects in Africa",
        description: "Building wells and water systems in rural communities",
        url: "https://www.launchgood.com/campaign/clean_water_projects_africa",
        goal: 45000,
        raised: 8925,
        imageUrl: "https://images.unsplash.com/photo-1441205188609-b875e92a9807?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false,
        donorCount: 156,
        daysLeft: 18,
        organizer: {
            name: "WaterAid",
            avatarUrl: "https://pmedia.launchgood.com/users/8/profile_pic.png"
        }
    },
    {
        title: "Education for Refugee Children",
        description: "Ensuring continued education in refugee camps",
        url: "https://www.launchgood.com/campaign/education_for_refugee_children",
        goal: 60000,
        raised: 32150,
        imageUrl: "https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?auto=format&fit=crop&q=80",
        isZakatVerified: false,
        isSponsored: true,
        donorCount: 567,
        daysLeft: 27,
        organizer: {
            name: "UNICEF",
            avatarUrl: "https://pmedia.launchgood.com/users/9/profile_pic.png"
        }
    },
    {
        title: "Emergency Medical Aid Fund",
        description: "Supporting urgent medical needs in crisis zones",
        url: "https://www.launchgood.com/campaign/emergency_medical_aid_fund",
        goal: 95000,
        raised: 54325,
        imageUrl: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80",
        isZakatVerified: true,
        isSponsored: false,
        donorCount: 789,
        daysLeft: 9,
        organizer: {
            name: "Doctors Without Borders",
            avatarUrl: "https://pmedia.launchgood.com/users/10/profile_pic.png"
        }
    }
]; 