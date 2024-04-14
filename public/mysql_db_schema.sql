-- Use test database
USE test;

-- Create user table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some data
INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john.doe@gmail.com', 'password'),
('Jane Doe', 'jane.doe@gmail.com', 'password'),
('Mike Doe', 'mike.doe@gmail.com', 'password');
