-- Drop tables and indexes if they exist

-- Drop foreign key constraints
ALTER TABLE IF EXISTS app_users DROP CONSTRAINT IF EXISTS fk_user_image_id;
ALTER TABLE IF EXISTS app_users DROP CONSTRAINT IF EXISTS fk_balance_id;
ALTER TABLE IF EXISTS app_users DROP CONSTRAINT IF EXISTS fk_faculty_id;
ALTER TABLE IF EXISTS app_users DROP CONSTRAINT IF EXISTS fk_uni_id;
ALTER TABLE IF EXISTS universities DROP CONSTRAINT IF EXISTS fk_uni_image_id;
ALTER TABLE IF EXISTS faculties DROP CONSTRAINT IF EXISTS fk_faculty_university;
ALTER TABLE IF EXISTS item_categories DROP CONSTRAINT IF EXISTS fk_parent_category;
ALTER TABLE IF EXISTS item_categories DROP CONSTRAINT IF EXISTS fk_category_image_id;
ALTER TABLE IF EXISTS items DROP CONSTRAINT IF EXISTS fk_item_image_id;
ALTER TABLE IF EXISTS item_category_mappings DROP CONSTRAINT IF EXISTS fk_mapping_item;
ALTER TABLE IF EXISTS item_category_mappings DROP CONSTRAINT IF EXISTS fk_mapping_category;
ALTER TABLE IF EXISTS renting_transactions DROP CONSTRAINT IF EXISTS fk_item_id;
ALTER TABLE IF EXISTS renting_transactions DROP CONSTRAINT IF EXISTS fk_user_id;

-- Drop indexes
DROP INDEX IF EXISTS idx_entity;

-- Drop tables
DROP TABLE IF EXISTS renting_transactions;
DROP TABLE IF EXISTS item_category_mappings;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS item_categories;
DROP TABLE IF EXISTS app_users;
DROP TABLE IF EXISTS faculties;
DROP TABLE IF EXISTS universities;
DROP TABLE IF EXISTS balances;
DROP TABLE IF EXISTS images;