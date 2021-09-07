<?php

$host = 'localhost';
$port = '3306';
$db_user = '';
$db_password = '';
$db_table = 'githubex';

return new PDO(sprintf("mysql:dbname=%s;host=%s;port=%s", $db_table,$host,$port), $db_user, $db_password, [PDO::ATTR_PERSISTENT => true]);
