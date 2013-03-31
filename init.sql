CREATE DATABASE IF NOT EXISTS bbn;

USE bbn;

CREATE TABLE IF NOT EXISTS user (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	username VARCHAR(50) NOT NULL, 
	password VARCHAR(255), 
	email VARCHAR(50), 
	current_game INT,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);

SELECT COUNT(*) FROM user WHERE username = 'admin';

SELECT username, password, email, create_date, create_by 
	FROM user 
	WHERE username = 'admin';

INSERT INTO user (username, password, email, create_date, create_by)
	SELECT * FROM 
		(SELECT 'admin', 'password', 'bbn@philpill.net', now(), 0) AS tmp
		WHERE NOT EXISTS 
			(SELECT username FROM user WHERE username = 'admin') LIMIT 1;

CREATE TABLE IF NOT EXISTS race (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS position (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR (30) NOT NULL,
	race INT,
	movement INT,
	strength INT,
	agility INT,
	armour INT,
	cost INT,
	quantity INT,
	general_skills INT,
	agility_skills INT,
	strength_skills INT,
	passing_skills INT,
	mutation_skills INT,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS race_position (
	race INT NOT NULL,
	position INT NOT NULL,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS team (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	fan_factor INT,
	treasury INT,
	played INT,
	won INT,
	lost INT,
	drawn INT,
	race INT,
	owner INT NOT NULL,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS player (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	number INT,
	star_player_points INT,
	movement INT,
	strength INT,
	agility INT,
	armour INT,
	skills INT,
	is_star_player BOOL,
	touchdowns INT,
	race INT,
	team INT,
	position INT,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS player_skill (
	player INT NOT NULL,
	skill INT NOT NULL,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS game (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	host INT,
	client INT,
	game_turn INT,
	create_date TIMESTAMP,
	create_by INT,
	edit_date TIMESTAMP,
	edit_by INT,
	description VARCHAR(255)
);
