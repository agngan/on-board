INSERT INTO User (username, password, email) VALUES ('Agnieszka', 'admin', 'agnieszka@onboard.com');
INSERT INTO User (username, password, email) VALUES ('Andrzej', 'user', 'andrzej@gmail.com');
INSERT INTO User (username, password, email) VALUES ('Ania', 'user', 'anie@gmail.com');

INSERT INTO Game (api_id) VALUES ('F1aw7kyGTA');
INSERT INTO Game (api_id) VALUES ('M5treAlrHc');
INSERT INTO Game (api_id) VALUES ('0sd39XHoO7');

INSERT INTO USER_GAME (user_id, game_id) VALUES (1,1);
INSERT INTO USER_GAME (user_id, game_id) VALUES (1,2);
INSERT INTO USER_GAME (user_id, game_id) VALUES (1,3);
INSERT INTO USER_GAME (user_id, game_id) VALUES (2,1);
INSERT INTO USER_GAME (user_id, game_id) VALUES (3,3);

INSERT INTO Win (user_id, game_id, date) VALUES (1, 1, DATE('2020-07-13'));
INSERT INTO Win (user_id, game_id, date) VALUES (1, 2, DATE('2020-07-13'));
INSERT INTO Win (user_id, game_id, date) VALUES (1, 3, DATE('2020-07-13'));
INSERT INTO Win (user_id, game_id, date) VALUES (2, 1, DATE('2020-07-13'));
INSERT INTO Win (user_id, game_id, date) VALUES (3, 3, DATE('2020-07-13'));