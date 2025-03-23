// Clients management functionality
document.addEventListener('DOMContentLoaded', () => {
    loadClients();
    initializeClientForm();
});

// Load all clients
function loadClients() {
    const clients = getFromStorage('testimonials') || [];
    const tableBody = document.getElementById('clientsTableBody');
    
    if (clients.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="no-data">No clients found</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = clients.map(client => {
        const stars = '★'.repeat(client.rating) + '☆'.repeat(5 - client.rating);
        
        return `
            <tr>
                <td>${client.name}</td>
                <td>${client.company}</td>
                <td>${client.position}</td>
                <td><span class="rating">${stars}</span></td>
                <td class="actions">
                    <button class="edit-btn" onclick="editClient('${client.id}')">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteClient('${client.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Initialize client form
function initializeClientForm() {
    const modal = document.getElementById('clientModal');
    const addBtn = document.getElementById('addClientBtn');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('clientForm');

    // Show modal on add button click
    addBtn.addEventListener('click', () => {
        document.getElementById('modalTitle').textContent = 'Add New Client';
        form.reset();
        document.getElementById('clientId').value = '';
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
            id: document.getElementById('clientId').value || Date.now().toString(),
            name: document.getElementById('clientName').value,
            company: document.getElementById('clientCompany').value,
            position: document.getElementById('clientPosition').value,
            rating: parseInt(document.getElementById('clientRating').value),
            testimonial: document.getElementById('clientTestimonial').value,
            image: document.getElementById('clientImage').value
        };

        saveClient(formData);
        modal.style.display = 'none';
        loadClients();
    });
}

// Save client
function saveClient(clientData) {
    const clients = getFromStorage('testimonials') || [];
    const index = clients.findIndex(c => c.id === clientData.id);

    if (index === -1) {
        clients.push(clientData);
    } else {
        clients[index] = clientData;
    }

    saveToStorage('testimonials', clients);
}

// Edit client
function editClient(clientId) {
    const clients = getFromStorage('testimonials') || [];
    const client = clients.find(c => c.id === clientId);
    
    if (!client) return;

    document.getElementById('modalTitle').textContent = 'Edit Client';
    document.getElementById('clientId').value = client.id;
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientCompany').value = client.company;
    document.getElementById('clientPosition').value = client.position;
    document.getElementById('clientRating').value = client.rating;
    document.getElementById('clientTestimonial').value = client.testimonial;
    document.getElementById('clientImage').value = client.image;

    document.getElementById('clientModal').style.display = 'block';
}

// Delete client
function deleteClient(clientId) {
    if (!confirm('Are you sure you want to delete this client?')) return;

    const clients = getFromStorage('testimonials') || [];
    const updatedClients = clients.filter(c => c.id !== clientId);
    saveToStorage('testimonials', updatedClients);
    loadClients();
}
