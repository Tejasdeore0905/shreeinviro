// Form submission handler
async function handleFormSubmission(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        message: document.getElementById('message').value
    };

    // Validate data
    const errors = [];
    if (!formData.name) errors.push("Name is required");
    if (!formData.company) errors.push("Company name is required");
    if (!formData.email || !isValidEmail(formData.email)) errors.push("Valid email is required");
    if (!formData.mobile) errors.push("Mobile number is required");
    if (!formData.message) errors.push("Message is required");

    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return;
    }

    try {
        // Store in localStorage (for demo purposes)
        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        submissions.push({
            ...formData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));

        // Show success message
        showNotification('Thank you for your message. We will get back to you shortly.', 'success');
        
        // Send auto-reply email (in production, this would be handled by a server)
        const emailContent = `
            <h2>Thank You for Contacting Us</h2>
            <p>Dear ${formData.name},</p>
            <p>We have received your message and will get back to you shortly.</p>
            <p>Best regards,<br>Shree Enviro Tech Team</p>
        `;
        
        // Clear form
        event.target.reset();
        
    } catch (error) {
        showNotification('An error occurred. Please try again later.', 'error');
        console.error('Form submission error:', error);
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification to user
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    color: white;
    z-index: 1000;
    animation: slideIn 0.5s ease-out;
}

.notification.success {
    background-color: #4CAF50;
}

.notification.error {
    background-color: #f44336;
}

.notification.info {
    background-color: #2196F3;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

document.head.appendChild(style);

// Initialize form handlers
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
});
