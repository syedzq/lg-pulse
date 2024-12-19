interface ApiComment {
    id: number;
    comment: string;
    userDisplayName: string;
    userDisplayLocation: string;
    createdAt: string;
}

export async function GET() {
    console.log('API Route: Starting request');
    try {
        const url = 'https://api.launchgood.com/v4/campaigns/250114/comments?offset=1&limit=50';
        console.log('API Route: Fetching from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzg5Njc0LCJpYXQiOjE3MzQwNTcxOTUsImV4cCI6MTczNDA2MDc5NX0.Hs0UYVxPBQBxvvRbPWBxPtBZPBPxKPBPxKPBPxKPBPxK',
                'Content-Type': 'application/json'
            }
        });

        console.log('API Route: Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Route: Raw data:', data);
        console.log('API Route: Comments:', data?.donationComments?.map((comment: ApiComment) => comment.comment));
        
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('API Route Error:', error);
        return Response.json({ error: 'Failed to fetch duas' }, { status: 500 });
    }
} 