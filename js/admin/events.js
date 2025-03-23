// Events management functionality
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    initializeEventForm();
});

// Load all events
function loadEvents() {
    const events = getFromStorage('events') || [];
    const tableBody = document.getElementById('eventsTableBody');
    
    if (events.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="no-data">No events found</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = events.map(event => {
        const eventDate = new Date(event.date);
        const today = new Date();
        const status = eventDate >= today ? 'Upcoming' : 'Past';
        const statusClass = eventDate >= today ? 'status-upcoming' : 'status-past';

        return `
            <tr>
                <td>${event.title}</td>
                <td>${new Date(event.date).toLocaleDateString()}</td>
                <td>${event.location}</td>
                <td><span class="status ${statusClass}">${status}</span></td>
                <td class="actions">
                    <button class="edit-btn" onclick="editEvent('${event.id}')">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteEvent('${event.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Initialize event form
function initializeEventForm() {
    const modal = document.getElementById('eventModal');
    const addBtn = document.getElementById('addEventBtn');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('eventForm');

    // Show modal on add button click
    addBtn.addEventListener('click', () => {
        document.getElementById('modalTitle').textContent = 'Add New Event';
        form.reset();
        document.getElementById('eventId').value = '';
        modal.style.display = 'block';
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            id: document.getElementById('eventId').value || Date.now().toString(),
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            image: document.getElementById('eventImage').value
        };

        saveEvent(formData);
        modal.style.display = 'none';
        loadEvents();
    });
}

// Save event
function saveEvent(eventData) {
    const events = getFromStorage('events') || [];
    const index = events.findIndex(e => e.id === eventData.id);

    if (index === -1) {
        events.push(eventData);
    } else {
        events[index] = eventData;
    }

    saveToStorage('events', events);
}

// Edit event
function editEvent(eventId) {
    const events = getFromStorage('events') || [];
    const event = events.find(e => e.id === eventId);
    
    if (!event) return;

    document.getElementById('modalTitle').textContent = 'Edit Event';
    document.getElementById('eventId').value = event.id;
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventDescription').value = event.description;
    document.getElementById('eventImage').value = event.image;

    document.getElementById('eventModal').style.display = 'block';
}

// Delete event
function deleteEvent(eventId) {
    if (!confirm('Are you sure you want to delete this event?')) return;

    const events = getFromStorage('events') || [];
    const updatedEvents = events.filter(e => e.id !== eventId);
    saveToStorage('events', updatedEvents);
    loadEvents();
}
