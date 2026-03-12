require("dotenv").config();

const { Client } = require("pg");

const SQL = `
 CREATE TABLE developer(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,developer varchar (50) UNIQUE not null);
 CREATE TABLE genre(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,genre varchar (20) UNIQUE not null);
 CREATE TABLE game(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,title varchar (176) NOT NULL,description varchar (1000),price DECIMAL(4,2),rating INTEGER);
 create table genre_game(game_id integer references game(id) on delete cascade,genre_id integer references genre(id) on delete cascade);
 create table dev_game(game_id integer references game(id) on delete cascade,dev_id integer references developer(id) on delete cascade);

INSERT INTO game(title, description, price, rating) VALUES
('Super Mario Galaxy', 'The ultimate Nintendo hero is taking the ultimate step... out into space. Join Mario as he ushers in a new era of video games, defying gravity across all the planets in the galaxy. When some creature escapes into space with Princess Peach, Mario gives chase, exploring bizarre planets all across the galaxy. Players run, jump and battle enemies as they explore the many planets. For Mario to succeed, gamers will press buttons, swing the Wii Remote and Nunchuk controllers and even use the Wii Remote to point at and drag things on-screen.', '19.99','10'),
('Majora''s Mask 3DS', 'Traverse time and the puzzling world of Termina in the remastered version of the most suspenseful apocalyptic adventure Nintendos ever made.', '29.99','8'),
('God of War 2018', 'In God of War - PlayStation 4 it’s a new beginning for Kratos. He’s a father again. As mentor and protector to Atreus, a son determined to earn his respect, he is forced to deal with and control the rage that has long defined him while out in a very dangerous world with his son. Living as a man outside the shadow of the gods, he ventures into the brutal Norse wilds with his son, fighting to fulfill a deeply personal quest.', '39.99','9'),
('Call of Duty: World At War', 'Call of Duty: World at War completely changes the rules of engagement by redefining WWII gaming and thrusting players into the final tension-filled, unforgiving battles against a new ferocious enemy in the most dangerous and suspenseful action ever seen in WWII.', '14.99','9'),
('Bioshock', 'BioShock is the genetically enhanced first person shooter that lets you do things never before possible in the genre: turn everything into a weapon, biologically mod your body with plasmids, hack devices and systems, upgrade your weapons and craft new ammo variants, and experiment with different battle techniques. You are a cast-away in Rapture, an underwater Utopia torn apart by civil war. Caught between powerful forces, and hunted down by genetically modified splicers and deadly security systems, you have to come to grips with a deadly, mysterious world filled with powerful technology and fascinating characters. No encounter ever plays out the same, and no two gamers will play the game the same way.', '29.99','10');

INSERT INTO genre(genre) VALUES
('Platformer'),
('Adventure'),
('Action'),
('Story'),
('FPS'),
('Violent'),
('History'),
('Horror'),
('Mystery');
;

INSERT INTO developer(developer) VALUES
('Nintendo'),
('Santa Monica'),
('Sony'),
('Treyarch'),
('Activision'),
('2k Games'),
('Irrational Games');

INSERT INTO GENRE_GAME(game_id, genre_id) VALUES
(1,1),
(1,2),
(2,2),
(3,3),
(3,4),
(3,7),
(4,5),
(4,6),
(4,7),
(5,4),
(5,8),
(5,9);

INSERT INTO DEV_GAME(game_id,dev_id) VALUES
(1,1),
(2,1),
(3,2),
(3,3),
(4,5),
(4,6),
(5,6),
(5,7);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
