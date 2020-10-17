INSERT INTO ROLE (name) VALUES ("ROLE_ADMIN");
INSERT INTO ROLE (name) VALUES ("ROLE_USER");

INSERT INTO USER (username, password, email, secret_code) VALUES ('Agnieszka', '$2y$10$CkDoe1NOD0QbpAf4Dpbt7Od1T.TZCLKDbeViQ5FmJg2mO7VxwjB56', 'agnieszka@onboard.com', '1234567890');
INSERT INTO USER (username, password, email, secret_code) VALUES ('Andrzej', '$2y$10$mnXcZR1DHjQGq8r7osfmU..akhe5E//oW2pltq2z7Js9aktLKaFma', 'andrzej@gmail.com', '1234567890');
INSERT INTO USER (username, password, email, secret_code) VALUES ('Ania', '$2y$10$mnXcZR1DHjQGq8r7osfmU..akhe5E//oW2pltq2z7Js9aktLKaFma', 'anie@gmail.com', '1234567890');

INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1);
INSERT INTO USER_ROLE (user_id, role_id) VALUES (2, 2);
INSERT INTO USER_ROLE (user_id, role_id) VALUES (3, 2);

INSERT INTO GAME (api_id, name) VALUES ('F1aw7kyGTA', 'Bohnanza');
INSERT INTO GAME (api_id, name) VALUES ('M5treAlrHc', 'Agricola');
INSERT INTO GAME (api_id, name) VALUES ('0sd39XHoO7', 'Saboteur');

INSERT INTO USER_GAME (user_id, game_id) VALUES (1,1);
INSERT INTO USER_GAME (user_id, game_id) VALUES (1,2);
INSERT INTO USER_GAME (user_id, game_id) VALUES (1,3);
INSERT INTO USER_GAME (user_id, game_id) VALUES (2,1);
INSERT INTO USER_GAME (user_id, game_id) VALUES (3,3);

INSERT INTO WIN (user_id, game_id, date) VALUES (1, 1, DATE('2020-07-13'));
INSERT INTO WIN (user_id, game_id, date) VALUES (1, 1, DATE('2020-08-26'));
INSERT INTO WIN (user_id, game_id, date) VALUES (1, 1, DATE('2020-09-29'));
INSERT INTO WIN (user_id, game_id, date) VALUES (1, 2, DATE('2020-07-17'));
INSERT INTO WIN (user_id, game_id, date) VALUES (1, 3, DATE('2020-09-28'));
INSERT INTO WIN (user_id, game_id, date) VALUES (2, 1, DATE('2020-07-18'));
INSERT INTO WIN (user_id, game_id, date) VALUES (3, 3, DATE('2020-07-14'));
INSERT INTO WIN (user_id, game_id, date) VALUES (3, 3, DATE('2020-08-15'));