-- Drop foreign key constraint first
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables
DROP TABLE IF EXISTS project_images;
DROP TABLE IF EXISTS projects;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    completion_date DATE NOT NULL,
    description TEXT,
    location VARCHAR(255),
    category ENUM('water_treatment', 'waste_management', 'air_quality', 'environmental_consulting', 'renewable_energy', 'other') DEFAULT 'other',
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
