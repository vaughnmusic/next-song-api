DROP SCHEMA IF EXISTS `next_song`;

CREATE SCHEMA `next_song`;

CREATE TABLE `next_song`.`performer` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `profile_image` VARCHAR(50), 
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `next_song`.`gigs` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    -- `performer_id` VARCHAR(50) NOT NULL,
    `spotify_playlist_id` VARCHAR(50) NOT NULL,
    `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `location` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
    -- FOREIGN KEY (`performer_id`) REFERENCES `performer`(`id`)
);

CREATE TABLE `next_song`.`song_requests` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `song_id` VARCHAR(50) NOT NULL ,
    `gig_id` VARCHAR(50) NOT NULL  ,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`gig_id`) REFERENCES `gigs`(`id`)
);
