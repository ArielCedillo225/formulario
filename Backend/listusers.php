<?php
header("Access-Control-Allow-Origin: *");
$dsn= "mysql:dbname=store;host=localhost:3306";
$username="root";
$password="12341";
$connection= new PDO($dsn, $username, $password);

$query="SELECT * FROM users";

$connection->query($query);

$result = $connection->query($query);

$users = [];

foreach($result as $item){
    $users[] = $item;
}
print json_encode($users);

