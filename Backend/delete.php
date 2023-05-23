<?php

header("Access-Control-Allow-Origin: *");

$dsn= "mysql:dbname=store;host=localhost:3306";
$username="root";
$password="12341";
$connection= new PDO($dsn, $username, $password);

$id=$_GET['id'];

$query="DELETE FROM users WHERE id = $id ";

echo $query;

$connection->query($query);