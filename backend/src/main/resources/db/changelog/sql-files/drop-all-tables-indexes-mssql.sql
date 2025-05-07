-- Drop tables and indexes if they exist

-- First drop foreign key constraints
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_user_image_id')
ALTER TABLE app_users DROP CONSTRAINT fk_user_image_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_balance_id')
ALTER TABLE app_users DROP CONSTRAINT fk_balance_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_faculty_id')
ALTER TABLE app_users DROP CONSTRAINT fk_faculty_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_uni_id')
ALTER TABLE app_users DROP CONSTRAINT fk_uni_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_uni_image_id')
ALTER TABLE universities DROP CONSTRAINT fk_uni_image_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_faculty_university')
ALTER TABLE faculties DROP CONSTRAINT fk_faculty_university;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_parent_category')
ALTER TABLE item_categories DROP CONSTRAINT fk_parent_category;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_category_image_id')
ALTER TABLE item_categories DROP CONSTRAINT fk_category_image_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_item_image_id')
ALTER TABLE items DROP CONSTRAINT fk_item_image_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_mapping_item')
ALTER TABLE item_category_mappings DROP CONSTRAINT fk_mapping_item;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_mapping_category')
ALTER TABLE item_category_mappings DROP CONSTRAINT fk_mapping_category;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_item_id')
ALTER TABLE renting_transactions DROP CONSTRAINT fk_item_id;

IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_user_id')
ALTER TABLE renting_transactions DROP CONSTRAINT fk_user_id;

-- Drop indexes
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_entity' AND object_id = OBJECT_ID('images'))
    DROP INDEX idx_entity ON images;

-- Drop tables in reverse order of creation (to avoid dependency conflicts)
IF OBJECT_ID('renting_transactions', 'U') IS NOT NULL
    DROP TABLE renting_transactions;

IF OBJECT_ID('item_category_mappings', 'U') IS NOT NULL
    DROP TABLE item_category_mappings;

IF OBJECT_ID('items', 'U') IS NOT NULL
    DROP TABLE items;

IF OBJECT_ID('item_categories', 'U') IS NOT NULL
    DROP TABLE item_categories;

IF OBJECT_ID('app_users', 'U') IS NOT NULL
    DROP TABLE app_users;

IF OBJECT_ID('faculties', 'U') IS NOT NULL
    DROP TABLE faculties;

IF OBJECT_ID('universities', 'U') IS NOT NULL
    DROP TABLE universities;

IF OBJECT_ID('balances', 'U') IS NOT NULL
    DROP TABLE balances;

IF OBJECT_ID('images', 'U') IS NOT NULL
    DROP TABLE images;

PRINT '<-- Tables and indexes dropped';