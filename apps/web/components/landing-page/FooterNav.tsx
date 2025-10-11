import React from 'react';
const footerLinks = [
    {
        "title": "Product",
        "links": [
            { "name": "Features", "href": "/#features" },
            { "name": "Pricing", "href": "/pricing" },
            { "name": "Changelog", "href": "/changelog" },
            { "name": "Status", "href": "/status" }
        ]
    },
    {
        "title": "Company",
        "links": [
            { "name": "About", "href": "/about" },
            { "name": "Blog", "href": "/blog" },
            { "name": "Careers", "href": "/careers" },
            { "name": "Contact", "href": "/contact" }
        ]
    },
    {
        "title": "Resources",
        "links": [
            { "name": "Help Center", "href": "/help" },
            { "name": "Docs", "href": "/docs" },
            { "name": "API Reference", "href": "/api" },
            { "name": "Community", "href": "/community" }
        ]
    },
    {
        "title": "Legal",
        "links": [
            { "name": "Privacy Policy", "href": "/privacy" },
            { "name": "Terms of Service", "href": "/terms" },
            { "name": "Security", "href": "/security" },
            { "name": "Cookies", "href": "/cookies" }
        ]
    }
];

const FooterNav = () => {
    return (
        <div
            className="grid grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-5 
            gap-6 place-items-start"
        >
            {footerLinks.map(section => (
                <div key={section.title}>
                    <h4 className="font-semibold mb-2">{section.title}</h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                        {section.links.map(link => (
                            <li className='mb-3' key={link.name}>{link.name}</li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
    )
}

export default FooterNav