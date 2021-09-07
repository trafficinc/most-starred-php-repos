
SET NAMES utf8mb4;

CREATE DATABASE githubex;

CREATE TABLE `repos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `repo_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL DEFAULT '',
  `url` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `push_date` timestamp NULL DEFAULT NULL,
  `description` text,
  `stars_count` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;