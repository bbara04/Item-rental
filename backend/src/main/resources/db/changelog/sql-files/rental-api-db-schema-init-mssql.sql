-- Kép tábla

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(255),
    entity_id BIGINT,
    image_data BYTEA,
    content_type VARCHAR(255),
    file_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_entity ON images(entity_type, entity_id);

CREATE TABLE balances (
    id SERIAL PRIMARY KEY,
    cur_value FLOAT,
    unit VARCHAR(255),
    pay_type VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    uni_code VARCHAR(15) UNIQUE,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    website VARCHAR(255),
    description TEXT,
    image_id BIGINT REFERENCES images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faculties (
    id SERIAL PRIMARY KEY,
    university_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_faculty_university FOREIGN KEY (university_id) REFERENCES universities(id)
);

CREATE TABLE app_users(
    id SERIAL PRIMARY KEY,
    balance_id BIGINT UNIQUE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    login_type VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    university_id BIGINT NOT NULL,
    faculty_id BIGINT NOT NULL,
    image_id BIGINT,
    ratings FLOAT,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_image_id FOREIGN KEY (image_id) REFERENCES images(id),
    CONSTRAINT fk_balance_id FOREIGN KEY (balance_id) REFERENCES balances(id),
    CONSTRAINT fk_faculty_id FOREIGN KEY (faculty_id) REFERENCES faculties(id),
    CONSTRAINT fk_uni_id FOREIGN KEY (university_id) REFERENCES universities(id)
);

CREATE TABLE item_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_category_id BIGINT,
    image_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_parent_category FOREIGN KEY (parent_category_id) REFERENCES item_categories(id),
    CONSTRAINT fk_category_image_id FOREIGN KEY (image_id) REFERENCES images(id)
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cost_per_day FLOAT,
    availability INT,
    image_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_image_id FOREIGN KEY (image_id) REFERENCES images(id)
);

-- kapcsolotabla (items és item_categories kozott)
CREATE TABLE item_category_mappings (
    item_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (item_id, category_id),
    CONSTRAINT fk_mapping_item FOREIGN KEY (item_id) REFERENCES items(id),
    CONSTRAINT fk_mapping_category FOREIGN KEY (category_id) REFERENCES item_categories(id)
);

-- kapcsolotabla (items és faculties kozott)
CREATE TABLE item_faculty_mappings (
    item_id BIGINT NOT NULL,
    faculty_id BIGINT NOT NULL,
    PRIMARY KEY (item_id, faculty_id),
    CONSTRAINT fk_item_faculty_item FOREIGN KEY (item_id) REFERENCES items(id),
    CONSTRAINT fk_item_faculty_faculty FOREIGN KEY (faculty_id) REFERENCES faculties(id)
);

CREATE TABLE renting_transactions (
    id SERIAL PRIMARY KEY,
    transaction_type VARCHAR(255),
    status VARCHAR(255),
    rented_item_id BIGINT,
    renter_user_id BIGINT,
    start_date_time TIMESTAMP,
    end_date_time TIMESTAMP,
    number_of_items INT,
    remaining_days INT,
    cost_per_day FLOAT,
    cur_cost FLOAT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_id FOREIGN KEY (rented_item_id) REFERENCES items(id),
    CONSTRAINT fk_user_id FOREIGN KEY (renter_user_id) REFERENCES app_users(id)
);