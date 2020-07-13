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

INSERT INTO Score (user_id, game_id, score) VALUES (1, 1, 57);
INSERT INTO Score (user_id, game_id, score) VALUES (1, 2, 33);
INSERT INTO Score (user_id, game_id, score) VALUES (1, 3, 14);
INSERT INTO Score (user_id, game_id, score) VALUES (2, 1, 12);
INSERT INTO Score (user_id, game_id, score) VALUES (3, 3, 44);