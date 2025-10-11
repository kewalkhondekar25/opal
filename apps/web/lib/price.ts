export interface IPrice {
    id: string;
    name: string;
    price: string;
    billing_cycle: string;
    description: string;
    limits: {
        videos_per_month: number | string;
    };
    features: string[];
    cta: string;
}
export const price = [
    {
        "id": "free",
        "name": "Free",
        "price": "$0",
        "billing_cycle": "per month",
        "description": "Get started with essential features to record, transcode, and share your videos.",
        "limits": {
            "videos_per_month": 3
        },
        "features": [
            "Up to 3 videos per month",
            "All resolutions supported",
            "Downloadable videos",
            "AI-generated transcripts",
            "Cancel anytime"
        ],
        "cta": "Start for Free"
    },
    {
        "id": "pro",
        "name": "Pro",
        "price": "$15",
        "billing_cycle": "per month",
        "description": "For creators and teams who need more power, storage, and flexibility.",
        "limits": {
            "videos_per_month": 10
        },
        "features": [
            "Up to 10 videos per month",
            "All resolutions supported",
            "Downloadable videos",
            "AI-generated transcripts",
            "Priority transcoding speed",
            "Cancel anytime"
        ],
        "cta": "Upgrade to Pro"
    },
    {
        "id": "unlimited",
        "name": "Unlimited",
        "price": "$99",
        "billing_cycle": "per month",
        "description": "For creators and teams who need more power, storage, and flexibility.",
        "limits": {
            "videos_per_month": "unmimited"
        },
        "features": [
            "Unlimited videos per month",
            "4K resolutions supported",
            "Downloadable videos",
            "Sharable video link",
            "AI-generated transcripts",
            "High Priority transcoding speed",
            "Cancel anytime"
        ],
        "cta": "Join Waitlist"
    },
]