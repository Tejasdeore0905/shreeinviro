// Admin authentication module
const AUTH_KEY = 'shree_enviro_auth';
const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123', // This should be changed in production
    name: 'Administrator'
};

// Check if user is logged in
function isLoggedIn() {
    const auth = localStorage.getItem(AUTH_KEY);
    return !!auth;
}

// Handle login
function handleLogin(username, password) {
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
        const authData = {
            username: username,
            name: DEFAULT_ADMIN.name,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
        return true;
    }
    return false;
}

// Handle logout
function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'login.html';
}

// Get current admin info
function getCurrentAdmin() {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
}

// Protect admin routes
function protectAdminRoute() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Initialize login form
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (handleLogin(username, password)) {
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password');
        }
    });
}

// Initialize logout button
if (document.getElementById('logoutBtn')) {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });
}

// Set admin name in header if available
if (document.getElementById('adminName')) {
    const admin = getCurrentAdmin();
    if (admin) {
        document.getElementById('adminName').textContent = admin.name;
    }
}

// Protect admin routes except login page
if (!window.location.pathname.includes('login.html')) {
    protectAdminRoute();
}
