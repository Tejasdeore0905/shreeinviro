// Projects management functionality
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initializeProjectForm();
});

// Load all projects
function loadProjects() {
    const projects = getFromStorage('projects') || [];
    const tableBody = document.getElementById('projectsTableBody');
    
    if (projects.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="no-data">No projects found</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = projects.map(project => `
        <tr>
            <td>${project.title}</td>
            <td>${project.location}</td>
            <td>${project.client}</td>
            <td>${project.category}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editProject('${project.id}')">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteProject('${project.id}')">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Initialize project form
function initializeProjectForm() {
    const modal = document.getElementById('projectModal');
    const addBtn = document.getElementById('addProjectBtn');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('projectForm');

    // Show modal on add button click
    addBtn.addEventListener('click', () => {
        document.getElementById('modalTitle').textContent = 'Add New Project';
        form.reset();
        document.getElementById('projectId').value = '';
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
            id: document.getElementById('projectId').value || Date.now().toString(),
            title: document.getElementById('projectTitle').value,
            location: document.getElementById('projectLocation').value,
            client: document.getElementById('projectClient').value,
            capacity: document.getElementById('projectCapacity').value,
            category: document.getElementById('projectCategory').value,
            description: document.getElementById('projectDescription').value,
            image: document.getElementById('projectImage').value
        };

        saveProject(formData);
        modal.style.display = 'none';
        loadProjects();
    });
}

// Save project
function saveProject(projectData) {
    const projects = getFromStorage('projects') || [];
    const index = projects.findIndex(p => p.id === projectData.id);

    if (index === -1) {
        projects.push(projectData);
    } else {
        projects[index] = projectData;
    }

    saveToStorage('projects', projects);
}

// Edit project
function editProject(projectId) {
    const projects = getFromStorage('projects') || [];
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;

    document.getElementById('modalTitle').textContent = 'Edit Project';
    document.getElementById('projectId').value = project.id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectLocation').value = project.location;
    document.getElementById('projectClient').value = project.client;
    document.getElementById('projectCapacity').value = project.capacity;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectImage').value = project.image;

    document.getElementById('projectModal').style.display = 'block';
}

// Delete project
function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const projects = getFromStorage('projects') || [];
    const updatedProjects = projects.filter(p => p.id !== projectId);
    saveToStorage('projects', updatedProjects);
    loadProjects();
}
