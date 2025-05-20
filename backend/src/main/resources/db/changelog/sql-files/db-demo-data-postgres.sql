-- Insert demo data (compatible with PostgreSQL)
INSERT INTO images (entity_type, content_type, file_name) VALUES
    ('university', 'image/png', 'bme_logo.png'), -- Corrected file name to .png and content_type to image/png
    ('university', 'image/png', 'elte_logo.png'), -- Corrected file name to .png and content_type to image/png
    ('faculty', 'image/png', 'vik_logo.png'),
    ('faculty', 'image/png', 'ttk_logo.png'),
    ('item', 'image/jpeg', 'laptop.jpg'), -- ID 5
    ('item', 'image/jpeg', 'konyv.jpg'), -- ID 6
    ('appuser', 'image/png', 'user1_avatar.png'), -- ID 7
    ('appuser', 'image/png', 'user2_avatar.png'), -- ID 8
    ('university', 'image/png', 'corvinus_logo.png'), -- ID 9
    ('item', 'image/jpeg', 'szamologep_kep.jpg'), -- Új ID 10 (korábban mikrookonomia_tankonyv.jpg)
    ('item', 'image/jpeg', 'statisztika_gyujtemeny.jpg'); -- Új ID 11 (korábban vallalati_penzugyek_peldatar.jpg)

INSERT INTO universities (uni_code, name, address, website, description, image_id, color_code) VALUES
    ('BME', 'Budapesti Műszaki és Gazdaságtudományi Egyetem', '1111 Budapest, Műegyetem rkp. 3.', 'https://www.bme.hu', 'A BME Magyarország legrégebbi műszaki felsőoktatási intézménye.', 1, '#993333'),
    ('ELTE', 'Eötvös Loránd Tudományegyetem', '1053 Budapest, Egyetem tér 1-3.', 'https://www.elte.hu', 'Az ELTE Magyarország legrégebbi, folyamatosan működő egyeteme.', 2, '#022951'),
    ('CORVINUS', 'Budapesti Corvinus Egyetem', '1093 Budapest, Fővám tér 8.', 'https://www.uni-corvinus.hu', 'A Budapesti Corvinus Egyetem Magyarország egyik vezető gazdaságtudományi és társadalomtudományi egyeteme.', 9, '#BF8F55');

INSERT INTO faculties (university_id, name, code, description) VALUES
    (1, 'Villamosmérnöki és Informatikai Kar', 'VIK', 'A BME legnagyobb kara, villamosmérnöki és informatikai képzést nyújt.'),
    (1, 'Gépészmérnöki Kar', 'GPK', 'Gépészmérnöki képzést nyújtó kar.'),
    (2, 'Természettudományi Kar', 'TTK', 'Természettudományi képzéseket nyújtó kar.'),
    (2, 'Informatikai Kar', 'IK', 'Informatikai képzéseket nyújtó kar.'),
    (3, 'Gazdálkodástudományi Kar', 'GTK', 'A Corvinus Egyetem gazdasági képzéseit összefogó kar.');

INSERT INTO balances (cur_value, unit, pay_type) VALUES
    (10000.0, 'HUF', 'CREDIT'),
    (5000.0, 'HUF', 'CREDIT'),
    (7500.0, 'HUF', 'CREDIT'),
    (15000.0, 'HUF', 'CREDIT');

INSERT INTO app_users (balance_id, user_name, email, first_name, last_name, password_hash, login_type, role, university_id, faculty_id, image_id, ratings, description) VALUES
    (1, 'tesztelek', 'teszt.elek@gmail.com', 'Teszt', 'Elek', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', 'LOCAL', 'STUDENT', 1, 1, 7, 4.5, 'Villamosmérnök hallgató a BME-n.'),
    (2, 'nagyjanos', 'nagy.janos@gmail.com', 'Nagy', 'János', '$2a$10$abcdefghijklmnopqrstuvwxyz987654321', 'LOCAL', 'COORDINATOR', 1, 2, 8, 4.8, 'Gépészmérnök kari koordinátor a BME-n.'),
    (3, 'kisanna', 'kis.anna@gmail.com', 'Kis', 'Anna', '$2a$10$abcdefghijklmnopqrstuvwxyz123123123', 'GOOGLE', 'GUEST', 2, 3, NULL, 4.2, 'Biológia szakos hallgató az ELTE-n, vendéghallgató a BME-n.'),
    (4, 'admin', 'admin@rentalapp.com', 'Admin', 'Admin', '$2a$10$abcdefghijklmnopqrstuvwxyz456456456', 'FACEBOOK', 'ADMIN', 1, 1, NULL, NULL, 'Rendszeradminisztrátor');

INSERT INTO items (name, description, cost_per_day, availability, image_id) VALUES
    ('Lenovo ThinkPad X1', 'Kiváló állapotú üzleti laptop, i7 processzor, 16GB RAM, 512GB SSD', 2500.0, 1, 5), -- ID 1
    ('Programozás C nyelven', 'Az alapoktól a haladó technikákig, egyetemi tankönyv', 500.0, 3, 6), -- ID 2
    ('Samsung Galaxy S21', 'Jó állapotú okostelefon, 128GB tárhely', 1500.0, 1, NULL), -- ID 3
    ('Számológép', 'Tudományos, 668 funkció', 300.0, 2, 10), -- ID 4, image_id frissítve az új szamologep_kep.jpg ID-jére (10)
    ('Statisztika képletek és táblázatok gyűjteménye', 'Fontos képletek és táblázatok statisztika tanulmányokhoz', 400.0, 5, 11); -- Új ID 5, image_id az új statisztika_gyujtemeny.jpg ID-je (11)

INSERT INTO item_categories (name, description, image_id) VALUES
    ('Elektronikai eszközök', 'Elektronikai eszközök sok fajtában', NULL),
    ('Könyvek', 'Könyvek sok fajtában', NULL),
    ('Sport eszközök', 'Sport eszközök sok fajtában', NULL);

INSERT INTO item_categories (name, description, parent_category_id, image_id) VALUES
    ('Laptopok','Laptopok sok fajtában', 1, NULL),
    ('Mobiltelefonok','Mobiltelefonok sok fajtában', 1, NULL),
    ('Tankönyvek','Tankönyvek sok fajtában', 2, NULL),
    ('Szépirodalmi könyvek','Szépirodalmi könyvek sok fajtában', 2, NULL),
    ('Foci kellékek', 'Foci kellékek sok fajtában', 3, NULL),
    ('Tenisz kellékek','Tenisz kellékek sok fajtában', 3, NULL);

INSERT INTO item_category_mappings (item_id, category_id) VALUES
    (1, 1), -- Lenovo laptop -> Elektronikai eszközök
    (1, 4), -- Lenovo laptop -> Laptopok
    (2, 2), -- Programozás könyv -> Könyvek
    (2, 6), -- Programozás könyv -> Tankönyvek
    (3, 1), -- Samsung telefon -> Elektronikai eszközök
    (3, 5), -- Samsung telefon -> Mobiltelefonok
    (4, 1), -- Számológép -> Elektronikai eszközök
    (5, 2), -- Statisztika gyűjtemény -> Könyvek
    (5, 6); -- Statisztika gyűjtemény -> Tankönyvek

INSERT INTO item_faculty_mappings (item_id, faculty_id) VALUES
    (1, 1), -- Lenovo ThinkPad X1 -> BME VIK
    (1, 2), -- Lenovo ThinkPad X1 -> BME GPK
    (1, 5), -- Lenovo ThinkPad X1 -> Corvinus GTK (Új mapolás)
    (2, 1), -- Programozás C nyelven -> BME VIK
    (2, 4), -- Programozás C nyelven -> ELTE IK
    (3, 1), -- Samsung Galaxy S21 -> BME VIK
    (3, 3), -- Samsung Galaxy S21 -> ELTE TTK
    (4, 1), -- Számológép -> BME VIK
    (4, 3), -- Számológép -> ELTE TTK
    (4, 4), -- Számológép -> ELTE IK
    (4, 5), -- Számológép -> Corvinus GTK
    (5, 3), -- Statisztika gyűjtemény -> ELTE TTK
    (5, 4), -- Statisztika gyűjtemény -> ELTE IK
    (5, 5); -- Statisztika gyűjtemény -> Corvinus GTK

INSERT INTO renting_transactions (transaction_type, status, rented_item_id, renter_user_id, start_date_time, end_date_time, number_of_items, remaining_days, cost_per_day, cur_cost) VALUES
    ('RENTAL', 'PENDING', 1, 1, '2025-11-01 10:00:00', '2025-11-08 10:00:00', 1, 7, 2500.0, 0.0),
    ('RENTAL', 'ARCHIVED', 4, 2, '2023-10-15 14:30:00', '2023-10-30 14:30:00', 2, 0, 500.0, 7500.0),
    ('RENTAL', 'STARTED', 3, 3, '2025-05-10 09:00:00', '2025-05-17 09:00:00', 1, 4, 1500.0, 0.0),
    ('RENTAL', 'APPROVED', 4, 2, '2025-10-01 16:45:00', '2025-10-05 16:45:00', 2, 4, 800.0, 0.0);
