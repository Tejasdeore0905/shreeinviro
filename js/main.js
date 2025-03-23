// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Handling
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // Store in localStorage for demo purposes
        // In a real application, you would send this to a server
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
            ...formObject,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Dynamic Content Loading
const loadProjects = async () => {
    const projectsContainer = document.querySelector('#projects-container');
    if (projectsContainer) {
        // In a real application, this would be loaded from a server
        // For now, we'll use localStorage as a demo
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `).join('');
    }
};

// Initialize dynamic content
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});
