<?php
require 'vendor/autoload.php';

use Src\DbConnect;

$dbConnection = (new DbConnect())->getConnection();
