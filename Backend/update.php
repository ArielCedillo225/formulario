<?php
//Permite recibir peticiones desde cualquier direccion
header("Access-Control-Allow-Origin: *");
//Para recibir datos enviados en el cuerpo de la peticion
$rawData = file_get_contents("php://input");
//Transformar el raw data en objeto PHP
$user = json_decode($rawData);
print_r($user);
$dsn= "mysql:dbname=store;host=localhost:3306";
$username="root";
$password="12341";
$connection= new PDO($dsn, $username, $password);

$id=$user->id;
$name = $user->name;
$email = $user->email;
$birthdate = $user->birthdate;
$sex = $user->sex;

$query="UPDATE users SET
    username = '$name', email='$email', birthdate='$birthdate', sex='$sex'
    WHERE id = $id";

echo($query);
$connection->query($query);