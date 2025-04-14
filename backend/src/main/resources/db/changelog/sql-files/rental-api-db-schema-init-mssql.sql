CREATE TABLE app_users(
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    balance_id BIGINT                   UNIQUE NOT NULL,
                    user_name NVARCHAR(255)             NOT NULL,
                    email NVARCHAR(255)                 NOT NULL,
                    first_name NVARCHAR(255)            NOT NULL,
                    last_name NVARCHAR(255)             NOT NULL,
                    password_hash NVARCHAR(MAX)         NOT NULL,
                    login_type NVARCHAR(255)            NOT NULL,
                    role NVARCHAR(255)                  NOT NULL,
                    university_id BIGINT                NOT NULL,
                    faculty_id BIGINT                   NOT NULL,
                    image_id BIGINT                     NULL,
                    ratings FLOAT                       NULL,
                    description NVARCHAR(MAX)           NULL,



                    created_at DATETIME2                NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2                NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_image_id FOREIGN KEY (image_id) REFERENCES images(id),
                    CONSTRAINT fk_balance_id FOREIGN KEY (balance_id) REFERENCES balances(id),
                    CONSTRAINT fk_faculty_id FOREIGN KEY (faculty_id) REFERENCES faculties(id),
                    CONSTRAINT fk_uni_id FOREIGN KEY (university_id) REFERENCES universities(id)
);
CREATE TABLE items (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    name NVARCHAR(255)              NOT NULL,
                    description NVARCHAR(MAX)       NULL,
                    category_id BIGINT              UNIQUE NOT NULL,
                    cost_per_day  FLOAT             NULL,
                    availability INT                NULL,
                    image_id BIGINT                 NULL,



                    created_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_item_category FOREIGN KEY (category_id) REFERENCES item_categories(id),
                    CONSTRAINT fk_image_id FOREIGN KEY (image_id) REFERENCES images(id)
);
CREATE TABLE item_categories (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    description NVARCHAR(MAX)       NULL,
                    parent_category_id BIGINT       NULL,
                    image_id BIGINT                 NULL,



                    created_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_parent_category FOREIGN KEY (parent_category_id) REFERENCES item_categories(id),
                    CONSTRAINT fk_image_id FOREIGN KEY (image_id) REFERENCES images(id)
);
CREATE TABLE balances (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    owner_user_id BIGINT        NULL,
                    cur_value FLOAT             NULL,
                    unit NVARCHAR(255)          NULL,
                    pay_type NVARCHAR(255)      NULL,


                    created_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_owner FOREIGN KEY (owner_user_id) REFERENCES app_users(id)
);
-- Kép tábla
CREATE TABLE images (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    entity_type NVARCHAR(255)   NULL, -- 'item', 'app_user', 'category', stb.
                    entity_id BIGINT            NULL,-- az adott entitás ID-ja
                    image_data VARBINARY(MAX)   NULL,
                    content_type NVARCHAR(255)  NULL,  -- pl. "image/jpeg", "image/png"
                    file_name NVARCHAR(255)     NULL,



                    created_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_entity (entity_type, entity_id) -- Kombinált index a gyors lekérdezéshez
);
CREATE TABLE universities (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    uni_code NVARCHAR(15)       UNIQUE NOT NULL,
                    name NVARCHAR(255)          NOT NULL,
                    address NVARCHAR(255)       NULL,
                    website NVARCHAR(255)       NULL,
                    description NVARCHAR(MAX)   NULL,
                    image_id BIGINT             NULL




                    created_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_image_id FOREIGN KEY (image_id) REFERENCES images(id)
);
CREATE TABLE faculties (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    university_id BIGINT        NOT NULL,
                    name NVARCHAR(255)          NOT NULL,
                    code NVARCHAR(50)           NULL,-- rövidítés: BTK, TTK
                    description NVARCHAR(MAX)   NULL,



                    created_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_faculty_university FOREIGN KEY (university_id) REFERENCES universities(id)
);
CREATE TABLE renting_transactions (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    transaction_type NVARCHAR(255)      NULL,
                    status NVARCHAR(255)                NULL,
                    rented_item_id BIGINT               NULL,
                    renter_user_id BIGINT               NULL,
                    start_date_time DATETIME2           NULL,
                    end_date_time DATETIME2             NULL,
                    remaining_days INT                  NULL,
                    cost_per_day  FLOAT                 NULL,
                    cur_cost FLOAT                      NULL,



                    created_at DATETIME2                NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2                NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_item_id FOREIGN KEY (rented_item_id) REFERENCES items(id),
                    CONSTRAINT fk_user_id FOREIGN KEY (renter_user_id) REFERENCES app_users(id)
);

PRINT '<-- Tables created';