// Contact form submissions management functionality
document.addEventListener('DOMContentLoaded', () => {
    loadSubmissions();
    initializeFilters();
    initializeMessageModal();
});

// Load all submissions
function loadSubmissions(filter = 'all') {
    const submissions = getFromStorage('contacts') || [];
    const tableBody = document.getElementById('submissionsTableBody');
    
    let filteredSubmissions = submissions;
    if (filter === 'unread') {
        filteredSubmissions = submissions.filter(s => !s.read);
    } else if (filter === 'read') {
        filteredSubmissions = submissions.filter(s => s.read);
    }

    if (filteredSubmissions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="no-data">No submissions found</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = filteredSubmissions.map(submission => {
        const date = new Date(submission.timestamp);
        const statusClass = submission.read ? 'status-read' : 'status-unread';
        const status = submission.read ? 'Read' : 'Unread';

        return `
            <tr class="${statusClass}">
                <td>${submission.name}</td>
                <td>${submission.email}</td>
                <td>${submission.subject}</td>
                <td>${date.toLocaleDateString()}</td>
                <td><span class="status ${statusClass}">${status}</span></td>
                <td class="actions">
                    <button class="view-btn" onclick="viewMessage('${submission.id}')">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteMessage('${submission.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Initialize filters
function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    statusFilter.addEventListener('change', (e) => {
        loadSubmissions(e.target.value);
    });
}

// Initialize message modal
function initializeMessageModal() {
    const modal = document.getElementById('messageModal');
    const closeBtn = document.getElementById('closeModal');
    const replyBtn = document.getElementById('replyBtn');
    const deleteBtn = document.getElementById('deleteMessageBtn');

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

    // Handle reply button click
    replyBtn.addEventListener('click', () => {
        const email = document.getElementById('messageEmail').textContent;
        window.location.href = `mailto:${email}`;
    });

    // Handle delete button click
    deleteBtn.addEventListener('click', () => {
        const messageId = modal.getAttribute('data-message-id');
        if (messageId) {
            deleteMessage(messageId);
            modal.style.display = 'none';
        }
    });
}

// View message details
function viewMessage(messageId) {
    const submissions = getFromStorage('contacts') || [];
    const message = submissions.find(s => s.id === messageId);
    
    if (!message) return;

    // Mark message as read
    if (!message.read) {
        message.read = true;
        const updatedSubmissions = submissions.map(s => 
            s.id === messageId ? message : s
        );
        saveToStorage('contacts', updatedSubmissions);
        loadSubmissions(document.getElementById('statusFilter').value);
    }

    // Populate modal
    const modal = document.getElementById('messageModal');
    document.getElementById('messageFrom').textContent = message.name;
    document.getElementById('messageEmail').textContent = message.email;
    document.getElementById('messageDate').textContent = new Date(message.timestamp).toLocaleString();
    document.getElementById('messageSubject').textContent = message.subject;
    document.getElementById('messageContent').textContent = message.message;

    modal.setAttribute('data-message-id', messageId);
    modal.style.display = 'block';
}

// Delete message
function deleteMessage(messageId) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const submissions = getFromStorage('contacts') || [];
    const updatedSubmissions = submissions.filter(s => s.id !== messageId);
    saveToStorage('contacts', updatedSubmissions);
    loadSubmissions(document.getElementById('statusFilter').value);
}
