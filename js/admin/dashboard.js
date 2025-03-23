// Admin dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardCounts();
    loadRecentProjects();
    loadUpcomingEvents();
});

// Update dashboard counts
function updateDashboardCounts() {
    const projects = getFromStorage('projects') || [];
    const events = getFromStorage('events') || [];
    const clients = getFromStorage('testimonials') || [];
    const messages = getFromStorage('contacts') || [];

    document.getElementById('projectCount').textContent = projects.length;
    document.getElementById('eventCount').textContent = events.length;
    document.getElementById('clientCount').textContent = clients.length;
    document.getElementById('messageCount').textContent = messages.filter(m => !m.read).length;
}

// Load recent projects
function loadRecentProjects() {
    const projects = getFromStorage('projects') || [];
    const recentProjects = projects.slice(0, 5); // Get last 5 projects
    const container = document.getElementById('recentProjects');
    
    if (recentProjects.length === 0) {
        container.innerHTML = '<p class="no-data">No projects found</p>';
        return;
    }

    container.innerHTML = recentProjects.map(project => `
        <div class="widget-item">
            <div class="item-icon">
                <i class="fa fa-briefcase"></i>
            </div>
            <div class="item-info">
                <h4>${project.title}</h4>
                <p>${project.location}</p>
            </div>
        </div>
    `).join('');
}

// Load upcoming events
function loadUpcomingEvents() {
    const events = getFromStorage('events') || [];
    const today = new Date();
    const upcomingEvents = events
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5); // Get next 5 events

    const container = document.getElementById('upcomingEvents');
    
    if (upcomingEvents.length === 0) {
        container.innerHTML = '<p class="no-data">No upcoming events</p>';
        return;
    }

    container.innerHTML = upcomingEvents.map(event => `
        <div class="widget-item">
            <div class="item-icon">
                <i class="fa fa-calendar"></i>
            </div>
            <div class="item-info">
                <h4>${event.title}</h4>
                <p>${new Date(event.date).toLocaleDateString()} - ${event.location}</p>
            </div>
        </div>
    `).join('');
}

// Handle sidebar navigation
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') return;
        e.preventDefault();
        sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
        this.parentElement.classList.add('active');
    });
});
