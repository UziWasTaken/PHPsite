<?php

namespace App\Config;

use PDO;
use PDOException;

class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        try {
            // Build proper PostgreSQL connection string
            $host = getenv('DB_HOST') ?: 'localhost';
            $port = getenv('DB_PORT') ?: '5432';
            $dbname = getenv('DB_DATABASE') ?: 'imageboard';
            $user = getenv('DB_USERNAME') ?: 'postgres';
            $password = getenv('DB_PASSWORD') ?: 'postgres';
            
            $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password";
            
            $this->connection = new PDO($dsn);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
} 