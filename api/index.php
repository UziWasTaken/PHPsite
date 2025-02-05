<?php
header('Content-Type: application/json');
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'API is working',
    'php_version' => PHP_VERSION
]); 