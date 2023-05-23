<?php
//Permite recibir peticiones desde cualquier direccion
header("Access-Control-Allow-Origin: *");
//Para recibir datos enviados en el cuerpo de la peticion
$rawData = file_get_contents("php://input");
//Transformar el raw data en objeto PHP
$user = json_decode($rawData);
//Para ver en pantalla que estamos recibiendo
print_r($rawData);
print_r($user);
$dsn= "mysql:dbname=store;host=localhost:3306";
$username="root";
$password="12341";
$connection= new PDO($dsn, $username, $password);
$name = $user->name;
$email = $user->email;
$birthdate = $user->birthDate;
$sex = $user->sex;

$query="INSERT INTO users
    (username, email, birthdate, sex)
    VALUES('$name', '$email', '$birthdate', '$sex')";

echo $query;

$connection->query($query);