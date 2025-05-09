INSERT INTO images (entity_type, content_type, file_name) VALUES
                                                              ('university', 'image/jpeg', 'bme_logo.jpg'),
                                                              ('university', 'image/jpeg', 'elte_logo.jpg'),
                                                              ('faculty', 'image/png', 'vik_logo.png'),
                                                              ('faculty', 'image/png', 'ttk_logo.png'),
                                                              ('item', 'image/jpeg', 'laptop.jpg'),
                                                              ('item', 'image/jpeg', 'konyv.jpg'),
                                                              ('appuser', 'image/png', 'user1_avatar.png'),
                                                              ('appuser', 'image/png', 'user2_avatar.png');
INSERT INTO universities (uni_code, name, address, website, description, image_id) VALUES
                                                                                       ('BME', 'Budapesti Műszaki és Gazdaságtudományi Egyetem', '1111 Budapest, Műegyetem rkp. 3.', 'https://www.bme.hu', 'A BME Magyarország legrégebbi műszaki felsőoktatási intézménye.', 1),
                                                                                       ('ELTE', 'Eötvös Loránd Tudományegyetem', '1053 Budapest, Egyetem tér 1-3.', 'https://www.elte.hu', 'Az ELTE Magyarország legrégebbi, folyamatosan működő egyeteme.', 2);
INSERT INTO faculties (university_id, name, code, description) VALUES
                                                                   (1, 'Villamosmérnöki és Informatikai Kar', 'VIK', 'A BME legnagyobb kara, villamosmérnöki és informatikai képzést nyújt.'),
                                                                   (1, 'Gépészmérnöki Kar', 'GPK', 'Gépészmérnöki képzést nyújtó kar.'),
                                                                   (2, 'Természettudományi Kar', 'TTK', 'Természettudományi képzéseket nyújtó kar.'),
                                                                   (2, 'Informatikai Kar', 'IK', 'Informatikai képzéseket nyújtó kar.');
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
                                                                                ('Lenovo ThinkPad X1', 'Kiváló állapotú üzleti laptop, i7 processzor, 16GB RAM, 512GB SSD', 2500.0, 1, 5),
                                                                                ('Programozás C nyelven', 'Az alapoktól a haladó technikákig, egyetemi tankönyv', 500.0, 3, 6),
                                                                                ('Samsung Galaxy S21', 'Jó állapotú okostelefon, 128GB tárhely', 1500.0, 1, NULL),
                                                                                ('Teniszütő Wilson', 'Profi teniszütő kezdőknek és haladóknak', 800.0, 2, NULL);
INSERT INTO item_categories (name, description, image_id) VALUES
                                                        ('Elektronikai eszközök', 'Elektronikai eszközök sok fajtában', NULL),
                                                        ('Könyvek', 'Könyvek sok fajtában',NULL),
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
                                                              (4, 3), -- Teniszütő -> Sport eszközök
                                                              (4, 9); -- Teniszütő -> Tenisz kellékek
INSERT INTO renting_transactions (transaction_type, status, rented_item_id, renter_user_id, start_date_time, end_date_time, remaining_days, cost_per_day, cur_cost) VALUES
                                                                                                                                                                        ('RENTAL', 'PENDING', 1, 1, '2023-11-01 10:00:00', '2023-11-08 10:00:00', 7, 2500.0, 17500.0),
                                                                                                                                                                        ('RENTAL', 'APPROVED', 2, 2, '2023-10-15 14:30:00', '2023-10-30 14:30:00', 0, 500.0, 7500.0),
                                                                                                                                                                        ('RENTAL', 'PENDING', 3, 3, '2023-11-10 09:00:00', '2023-11-17 09:00:00', 7, 1500.0, 10500.0),
                                                                                                                                                                        ('RENTAL', 'DECLINED', 4, 1, '2023-10-01 16:45:00', '2023-10-05 16:45:00', 0, 800.0, 0.0);