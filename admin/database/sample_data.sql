-- Insert default admin user
INSERT INTO admin_users (username, password, email, full_name) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@example.com', 'Administrator')
ON DUPLICATE KEY UPDATE id=id;

-- Insert sample project categories
INSERT INTO project_categories (name, description) VALUES
('Water Treatment', 'Projects related to water treatment and purification'),
('Industrial Waste', 'Industrial waste management and treatment projects'),
('Environmental', 'Environmental conservation and protection projects'),
('Sewage Treatment', 'Sewage and wastewater treatment projects')
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- Insert sample clients
INSERT INTO clients (name, website, description, status) VALUES
('ABC Industries', 'https://example.com', 'Leading manufacturer in industrial sector', 'active'),
('XYZ Corporation', 'https://example.com', 'Environmental solutions provider', 'active'),
('Green Solutions Ltd', 'https://example.com', 'Sustainable technology company', 'active')
ON DUPLICATE KEY UPDATE id=id;

-- Insert sample projects
INSERT INTO projects (title, subheading, overview, features, benefits, category, status, client_id) VALUES
('Industrial Waste Treatment Plant', 
 'State-of-the-art waste treatment facility',
 'A comprehensive waste treatment solution for industrial applications',
 'Advanced filtration system\nAutomated monitoring\nReal-time analytics',
 'Reduced environmental impact\nCost-effective operation\nCompliance with regulations',
 'Industrial Waste',
 'completed',
 1),
('Water Purification System',
 'Modern water purification facility',
 'Advanced water purification system for municipal use',
 'Multi-stage filtration\nUV treatment\nRemote monitoring',
 'Clean drinking water\nReduced maintenance\nEnergy efficient',
 'Water Treatment',
 'ongoing',
 2)
ON DUPLICATE KEY UPDATE id=id;

-- Insert sample events
INSERT INTO events (title, date, description, status) VALUES
('Environmental Technology Expo', 
 DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY),
 'Annual exhibition of environmental technologies and solutions',
 'upcoming'),
('Waste Management Workshop', 
 DATE_ADD(CURRENT_DATE, INTERVAL 15 DAY),
 'Workshop on modern waste management techniques',
 'upcoming')
ON DUPLICATE KEY UPDATE id=id;

-- Insert sample services
INSERT INTO services (title, description, icon, status) VALUES
('Water Treatment', 'Comprehensive water treatment solutions', 'fas fa-tint', 'active'),
('Waste Management', 'Industrial waste management services', 'fas fa-recycle', 'active'),
('Environmental Consulting', 'Expert environmental consulting services', 'fas fa-leaf', 'active')
ON DUPLICATE KEY UPDATE id=id;
