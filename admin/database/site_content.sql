-- Create site_content table for managing website content
CREATE TABLE IF NOT EXISTS site_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    section VARCHAR(50) NOT NULL,
    type ENUM('text', 'html', 'image', 'file') DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default content
INSERT INTO site_content (name, value, section, type) VALUES
('hero_title', 'Welcome to Shree Enviro Tech', 'home', 'text'),
('hero_subtitle', 'Your Partner in Environmental Solutions', 'home', 'text'),
('about_content', 'We are a leading environmental technology company...', 'about', 'html'),
('company_vision', 'To be the leading provider of environmental solutions...', 'about', 'text'),
('company_mission', 'To deliver innovative and sustainable environmental solutions...', 'about', 'text'),
('contact_address', '123 Green Street, Eco City, 12345', 'contact', 'text'),
('contact_email', 'info@shreeenvirotech.com', 'contact', 'text'),
('contact_phone', '+1 234 567 8900', 'contact', 'text')
ON DUPLICATE KEY UPDATE id=id;
