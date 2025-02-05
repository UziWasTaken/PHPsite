<?php

namespace App\Models;

use App\Config\Database;
use PDO;
use Cloudinary\Cloudinary;

class Image {
    private $db;
    private $cloudinary;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => getenv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
                'api_key' => getenv('NEXT_PUBLIC_CLOUDINARY_API_KEY'),
                'api_secret' => getenv('CLOUDINARY_API_SECRET')
            ]
        ]);
    }

    public function uploadImage($file, $tags = [], $description = '') {
        try {
            // Upload to Cloudinary
            $result = $this->cloudinary->uploadApi()->upload($file['tmp_name'], [
                'folder' => 'imageboard',
                'tags' => $tags
            ]);

            // Store in database
            $stmt = $this->db->prepare(
                "INSERT INTO images (url, public_id, tags, description, created_at) 
                VALUES (:url, :public_id, :tags, :description, NOW())"
            );

            return $stmt->execute([
                ':url' => $result['secure_url'],
                ':public_id' => $result['public_id'],
                ':tags' => json_encode($tags),
                ':description' => $description
            ]);
        } catch (\Exception $e) {
            throw new \Exception("Failed to upload image: " . $e->getMessage());
        }
    }

    public function getImages($page = 1, $perPage = 20, $tags = []) {
        $offset = ($page - 1) * $perPage;
        $query = "SELECT * FROM images";
        
        if (!empty($tags)) {
            $tagConditions = array_map(function($tag) {
                return "tags @> :tag" . md5($tag);
            }, $tags);
            $query .= " WHERE " . implode(" AND ", $tagConditions);
        }
        
        $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        
        if (!empty($tags)) {
            foreach ($tags as $tag) {
                $stmt->bindValue(':tag' . md5($tag), json_encode([$tag]));
            }
        }
        
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function deleteImage($id) {
        try {
            $stmt = $this->db->prepare("SELECT public_id FROM images WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $image = $stmt->fetch();

            if ($image) {
                // Delete from Cloudinary
                $this->cloudinary->uploadApi()->destroy($image['public_id']);

                // Delete from database
                $stmt = $this->db->prepare("DELETE FROM images WHERE id = :id");
                return $stmt->execute([':id' => $id]);
            }
            return false;
        } catch (\Exception $e) {
            throw new \Exception("Failed to delete image: " . $e->getMessage());
        }
    }
} 