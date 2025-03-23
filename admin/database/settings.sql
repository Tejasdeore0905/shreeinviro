-- Create settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_group VARCHAR(50) NOT NULL,
    setting_label VARCHAR(100) NOT NULL,
    setting_type ENUM('text', 'textarea', 'email', 'phone', 'image', 'color', 'url') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO site_settings (setting_key, setting_value, setting_group, setting_label, setting_type) VALUES
-- Company Information
('company_name', 'Shree Enviro Tech', 'company', 'Company Name', 'text'),
('company_tagline', 'Your Environmental Technology Partner', 'company', 'Company Tagline', 'text'),
('company_address', '123 Green Street, Eco City, State 12345', 'company', 'Company Address', 'textarea'),
('company_email', 'contact@shreeenvirotech.com', 'company', 'Company Email', 'email'),
('company_phone', '+1234567890', 'company', 'Company Phone', 'phone'),
('company_logo', '../assets/logo.png', 'company', 'Company Logo', 'image'),

-- Social Media Links
('facebook_url', 'https://facebook.com/shreeenvirotech', 'social', 'Facebook URL', 'url'),
('twitter_url', 'https://twitter.com/shreeenvirotech', 'social', 'Twitter URL', 'url'),
('linkedin_url', 'https://linkedin.com/company/shreeenvirotech', 'social', 'LinkedIn URL', 'url'),
('instagram_url', 'https://instagram.com/shreeenvirotech', 'social', 'Instagram URL', 'url'),

-- Theme Settings
('primary_color', '#4CAF50', 'theme', 'Primary Color', 'color'),
('secondary_color', '#2196F3', 'theme', 'Secondary Color', 'color'),
('accent_color', '#FF9800', 'theme', 'Accent Color', 'color'),

-- Footer Settings
('footer_text', '© 2025 Shree Enviro Tech. All rights reserved.', 'footer', 'Footer Copyright Text', 'text'),
('footer_about', 'Leading provider of environmental technology solutions.', 'footer', 'Footer About Text', 'textarea')

ON DUPLICATE KEY UPDATE
setting_value = VALUES(setting_value),
setting_group = VALUES(setting_group),
setting_label = VALUES(setting_label),
setting_type = VALUES(setting_type);
