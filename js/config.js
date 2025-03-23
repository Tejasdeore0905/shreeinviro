// Client-side configuration and data management
const config = {
    // Storage keys
    storageKeys: {
        projects: 'shree_enviro_projects',
        events: 'shree_enviro_events',
        contacts: 'shree_enviro_contacts',
        testimonials: 'shree_enviro_testimonials'
    },
    
    // API endpoints (for future server integration)
    api: {
        baseUrl: 'https://api.shreeenvirotech.com',
        endpoints: {
            projects: '/api/projects',
            events: '/api/events',
            contact: '/api/contact',
            testimonials: '/api/testimonials'
        }
    },
    
    // Default data
    defaultData: {
        projects: [
            {
                id: 1,
                title: "Industrial Water Treatment Plant",
                location: "Mumbai, Maharashtra",
                client: "ABC Industries Ltd",
                capacity: "500 KLD",
                description: "Design and implementation of a comprehensive water treatment solution.",
                image: "images/projects/project1.jpg",
                category: "WTP"
            },
            {
                id: 2,
                title: "Sewage Treatment Plant",
                location: "Pune, Maharashtra",
                client: "XYZ Corporation",
                capacity: "1000 KLD",
                description: "Installation of modern STP with advanced treatment technologies.",
                image: "images/projects/project2.jpg",
                category: "STP"
            }
        ],
        events: [
            {
                id: 1,
                title: "Environmental Technology Expo",
                date: "2025-04-15",
                location: "Mumbai Convention Center",
                description: "Showcasing latest environmental technologies and solutions.",
                image: "images/events/event1.jpg"
            }
        ],
        testimonials: [
            {
                id: 1,
                name: "John Doe",
                position: "Plant Manager, ABC Industries",
                content: "Excellent service and professional team.",
                image: "images/testimonials/testimonial1.jpg"
            }
        ]
    }
};

// Initialize local storage with default data if empty
function initializeStorage() {
    Object.entries(config.storageKeys).forEach(([key, storageKey]) => {
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(config.defaultData[key] || []));
        }
    });
}

// Get data from storage
function getFromStorage(key) {
    const data = localStorage.getItem(config.storageKeys[key]);
    return data ? JSON.parse(data) : [];
}

// Save data to storage
function saveToStorage(key, data) {
    localStorage.setItem(config.storageKeys[key], JSON.stringify(data));
}

// Initialize storage when the script loads
initializeStorage();
