-- ROLES TABLE

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL CHECK (role_name IN ('Admin', 'Customer', 'Agent'))
);

-- DEPARTMENT TABLE
CREATE TABLE department (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);

-- URGENCY TABLE
CREATE TABLE urgency (
    urgency_id SERIAL PRIMARY KEY,
    urgency_name VARCHAR(100) NOT NULL CHECK (urgency_name IN ('Critical', 'High', 'Medium','Low')),
    duration INTEGER
);

-- CATEGORY TABLE (related to urgency)
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(150) NOT NULL,
    urgency_id INTEGER,
    CONSTRAINT fk_category_urgency FOREIGN KEY (urgency_id) REFERENCES urgency(urgency_id)
);

-- FAQ TABLE
CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    question VARCHAR(250) NOT NULL,
    answer VARCHAR(250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS TABLE
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',
    is_temp_pass CHAR(1) DEFAULT 'N',
    role_id INTEGER,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- USER-DEPARTMENT RELATION
CREATE TABLE user_department (
    user_id INTEGER NOT NULL,
    dept_id INTEGER NOT NULL,
    CONSTRAINT fk_ud_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_ud_dept FOREIGN KEY (dept_id) REFERENCES department(dept_id),
    PRIMARY KEY (user_id, dept_id)
);

-- CUSTOMER SURVEY TABLE
CREATE TABLE customer_survey (
    id SERIAL PRIMARY KEY,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    feedback VARCHAR(250),
	satisfaction CHAR(1),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    CONSTRAINT fk_survey_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- TICKET TABLE
CREATE TABLE ticket (
    ticket_id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INTEGER,
    urgency_id INTEGER,
    dept_id INTEGER,
    user_id INTEGER,
    CONSTRAINT fk_ticket_category FOREIGN KEY (category_id) REFERENCES category(category_id),
    CONSTRAINT fk_ticket_urgency FOREIGN KEY (urgency_id) REFERENCES urgency(urgency_id),
    CONSTRAINT fk_ticket_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_ticket_dept FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

-- REPLY TICKETS TABLE
CREATE TABLE reply_tickets (
    id SERIAL PRIMARY KEY,
    reply_message VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ticket_id INTEGER NOT NULL,
    user_id INTEGER,
    CONSTRAINT fk_reply_ticket FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id),
    CONSTRAINT fk_reply_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- TICKET ATTACHMENTS TABLE
CREATE TABLE ticket_attach (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    ticket_id INTEGER NOT NULL,
	reply_id INTEGER,
    CONSTRAINT fk_attachment_ticket FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id),
	CONSTRAINT fk_attachment_reply FOREIGN KEY (reply_id) REFERENCES reply_tickets(id)
);

-- CUSTOMER SUPPORT TABLE
CREATE TABLE customer_complaint (
    id SERIAL PRIMARY KEY,
    message VARCHAR(250) NOT NULL,
    user_id INTEGER,
    ticket_id INTEGER,
    CONSTRAINT fk_support_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_support_ticket FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id)
);
