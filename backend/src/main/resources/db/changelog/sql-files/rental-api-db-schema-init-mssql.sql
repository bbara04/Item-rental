CREATE TABLE app_user(
                      id BIGINT IDENTITY(1,1) PRIMARY KEY,
                      username VARCHAR(255) NOT NULL UNIQUE,
                      email VARCHAR(255) NOT NULL UNIQUE,
                      password_hash VARCHAR(255) NOT NULL,
                      created_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE item (
                      id BIGINT IDENTITY(1,1) PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      description TEXT,
                      daily_rate DECIMAL(10,2) NOT NULL,
                      owner_id BIGINT NOT NULL,
                      created_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      updated_at DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      CONSTRAINT fk_item_owner FOREIGN KEY (owner_id) REFERENCES app_user(id)
);