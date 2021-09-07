<?php

namespace Src\Repository;

class RepoRepository
{

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
          SELECT
              id, repo_id, name, url, created_date, push_date, description, stars_count
          FROM
              repos
          ORDER BY stars_count DESC;
      ";

        try {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException$e) {
            exit($e->getMessage());
        }
    }

}
