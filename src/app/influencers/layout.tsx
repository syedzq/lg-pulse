"use client"

import { usePathname, useRouter } from "next/navigation"

export default function InfluencersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()

    const isCardless = pathname === "/influencers/cardless"

    return (
        <div className="relative min-h-screen">

            {/* Main content */}
            <main className="py-8">
                {children}
            </main>

            {/* Style switcher */}
            <div className="fixed bottom-8 right-8 flex gap-2 p-2 bg-white rounded-full shadow-lg border border-neutral-200">
                <button
                    onClick={() => router.push("/influencers")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        !isCardless
                            ? "bg-brand-500 text-white"
                            : "text-neutral-600 hover:text-neutral-900"
                    }`}
                >
                    Card
                </button>
                <button
                    onClick={() => router.push("/influencers/cardless")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isCardless
                            ? "bg-brand-500 text-white"
                            : "text-neutral-600 hover:text-neutral-900"
                    }`}
                >
                    Cardless
                </button>
            </div>
        </div>
    )
} 