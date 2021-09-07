<?php
// can put this on cronjob to update x number of days week.
// repository ID, name, URL, created date, last push date, description, number of stars

date_default_timezone_set('America/New_York');

$pdo = require('config/db-connection.php');

$url = "https://api.github.com/search/repositories?per_page=15&sort=stars&order=desc&q=". urlencode("stars:>=500 language:php");

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json', 'Content-Type: application/json','User-Agent: Awesome-Octocat-App']);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
curl_close($ch);

$api = json_decode($result);


if (count($api->items) > 0):

  $stmt = $pdo->prepare("TRUNCATE TABLE repos");
  $stmt->execute();

  foreach($api->items as $api) {
    $sql = "INSERT INTO repos (repo_id,name,url,created_date,push_date,description,stars_count,updated_at) VALUES (?,?,?,?,?,?,?,?)";
    $stmt = $pdo->prepare($sql);
    $res = $stmt->execute([$api->id,$api->full_name,$api->html_url,date('Y-m-d H:i:s',strtotime($api->created_at)),date('Y-m-d H:i:s',strtotime($api->pushed_at)),$api->description,$api->stargazers_count,date('Y-m-d H:i:s')]);
    //var_dump($res);
  }

  echo "Upload completed.\n";

endif;
