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
CREATE TABLE balances (
                        id BIGINT IDENTITY(1,1) PRIMARY KEY,
                        cur_value FLOAT             NULL,
                        unit NVARCHAR(255)          NULL,
                        pay_type NVARCHAR(255)      NULL,

                        created_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE universities (
                        id BIGINT IDENTITY(1,1) PRIMARY KEY,
                        uni_code NVARCHAR(15)       UNIQUE NULL,
                        name NVARCHAR(255)          NOT NULL,
                        address NVARCHAR(255)       NULL,
                        website NVARCHAR(255)       NULL,
                        description NVARCHAR(MAX)   NULL,
                        image_id BIGINT             NULL,




                        created_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME2        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        CONSTRAINT fk_uni_image_id FOREIGN KEY (image_id) REFERENCES images(id)
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
                    CONSTRAINT fk_user_image_id FOREIGN KEY (image_id) REFERENCES images(id),
                    CONSTRAINT fk_balance_id FOREIGN KEY (balance_id) REFERENCES balances(id),
                    CONSTRAINT fk_faculty_id FOREIGN KEY (faculty_id) REFERENCES faculties(id),
                    CONSTRAINT fk_uni_id FOREIGN KEY (university_id) REFERENCES universities(id)
);
CREATE TABLE item_categories (
                                 id BIGINT IDENTITY(1,1) PRIMARY KEY,
                                 name NVARCHAR(255)              NOT NULL,
                                 description NVARCHAR(MAX)       NULL,
                                 parent_category_id BIGINT       NULL,
                                 image_id BIGINT                 NULL,



                                 created_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 updated_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 CONSTRAINT fk_parent_category FOREIGN KEY (parent_category_id) REFERENCES item_categories(id),
                                 CONSTRAINT fk_category_image_id FOREIGN KEY (image_id) REFERENCES images(id)
);
CREATE TABLE items (
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    name NVARCHAR(255)              NOT NULL,
                    description NVARCHAR(MAX)       NULL,
                    cost_per_day  FLOAT             NULL,
                    availability INT                NULL,
                    image_id BIGINT                 NULL,



                    created_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2            NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
                    id BIGINT IDENTITY(1,1) PRIMARY KEY,
                    transaction_type NVARCHAR(255)      NULL,
                    status NVARCHAR(255)                NULL,
                    rented_item_id BIGINT               NULL,
                    renter_user_id BIGINT               NULL,
                    start_date_time DATETIME2           NULL,
                    end_date_time DATETIME2             NULL,
                    number_of_items INT                 NULL,
                    remaining_days INT                  NULL,
                    cost_per_day  FLOAT                 NULL,
                    cur_cost FLOAT                      NULL,



                    created_at DATETIME2                NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME2                NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_item_id FOREIGN KEY (rented_item_id) REFERENCES items(id),
                    CONSTRAINT fk_user_id FOREIGN KEY (renter_user_id) REFERENCES app_users(id)
);

PRINT '<-- Tables created';