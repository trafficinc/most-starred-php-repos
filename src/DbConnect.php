<?php

namespace Src;

class DbConnect
{

    private $dbConnection = null;

    public function __construct()
    {
        $this->dbConnection = require dirname(__DIR__) . '/config/db-connection.php';
    }

    public function getConnection()
    {
        return $this->dbConnection;
    }

}
