export const countryData = {
    // Top countries from original data
    USA: { donors: 1410, name: "United States" },
    GBR: { donors: 201, name: "United Kingdom" },
    ZAF: { donors: 98, name: "South Africa" },
    IDN: { donors: 31, name: "Indonesia" },
    SGP: { donors: 24, name: "Singapore" },
    // Additional countries with significant Muslim populations
    PAK: { donors: 156, name: "Pakistan" },
    TUR: { donors: 143, name: "Turkey" },
    MYS: { donors: 89, name: "Malaysia" },
    ARE: { donors: 76, name: "United Arab Emirates" },
    QAT: { donors: 67, name: "Qatar" },
    SAU: { donors: 145, name: "Saudi Arabia" },
    EGY: { donors: 112, name: "Egypt" },
    MAR: { donors: 45, name: "Morocco" },
    BGD: { donors: 78, name: "Bangladesh" },
    JOR: { donors: 34, name: "Jordan" },
    // Western countries
    CAN: { donors: 167, name: "Canada" },
    AUS: { donors: 89, name: "Australia" },
    DEU: { donors: 56, name: "Germany" },
    FRA: { donors: 45, name: "France" },
    NLD: { donors: 23, name: "Netherlands" },
    // Add more as needed
};

export type CountryCode = keyof typeof countryData; 