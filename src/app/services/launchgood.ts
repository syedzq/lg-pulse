export interface DuaComment {
    id: string;
    comment: string;
    userDisplayName: string;
    userDisplayLocation: string;
    createdAt: string;
}

interface ApiComment {
    id: number;
    comment: string;
    userDisplayName: string;
    userDisplayLocation: string;
    createdAt: string;
}

export async function fetchDuas(): Promise<DuaComment[]> {
    console.log('Service: Starting fetch');
    if (typeof window === 'undefined') {
        console.log('Service: Running on server, returning empty array');
        return [];
    }

    try {
        console.log('Service: Fetching from API route');
        const response = await fetch('/api/duas');
        console.log('Service: Response status:', response.status);
        
        if (!response.ok) {
            throw new Error('Failed to fetch duas');
        }

        const data = await response.json();
        console.log('Service: Raw data:', data);
        
        if (!data?.donationComments) {
            console.log('Service: No comments found');
            return [];
        }

        console.log('Service: Comments:', data.donationComments.map((comment: ApiComment) => comment.comment));

        return data.donationComments.map((comment: ApiComment) => ({
            id: comment.id.toString(),
            comment: comment.comment || '',
            userDisplayName: comment.userDisplayName || 'Anonymous kind soul',
            userDisplayLocation: comment.userDisplayLocation || "Allah's Earth is vast",
            createdAt: comment.createdAt || new Date().toISOString()
        }));
    } catch (error) {
        console.error('Service Error:', error);
        return [];
    }
} 