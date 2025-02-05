<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Models\Image;
use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Initialize Image model
$imageModel = new Image();

// Get current page and tags from query parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$tags = isset($_GET['tags']) ? explode(',', $_GET['tags']) : [];

// Handle image upload
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    try {
        $tags = isset($_POST['tags']) ? explode(',', $_POST['tags']) : [];
        $description = $_POST['description'] ?? '';
        $imageModel->uploadImage($_FILES['image'], $tags, $description);
        header('Location: /');
        exit;
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

// Get images for current page
$images = $imageModel->getImages($page, 20, $tags);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Board</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8 text-center">Image Board</h1>

        <!-- Upload Form -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-2xl font-semibold mb-4">Upload Image</h2>
            <form action="/" method="POST" enctype="multipart/form-data" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" name="image" accept="image/*" required
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                    <input type="text" name="tags" 
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" 
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <button type="submit" 
                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Upload
                </button>
            </form>
        </div>

        <!-- Image Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <?php foreach ($images as $image): ?>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="<?= htmlspecialchars($image['url']) ?>" 
                     alt="<?= htmlspecialchars($image['description']) ?>"
                     class="w-full h-48 object-cover">
                <div class="p-4">
                    <p class="text-sm text-gray-600"><?= htmlspecialchars($image['description']) ?></p>
                    <div class="mt-2 flex flex-wrap gap-2">
                        <?php foreach (json_decode($image['tags']) as $tag): ?>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            #<?= htmlspecialchars($tag) ?>
                        </span>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center space-x-4">
            <?php if ($page > 1): ?>
            <a href="/?page=<?= $page - 1 ?><?= !empty($tags) ? '&tags=' . implode(',', $tags) : '' ?>"
               class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Previous
            </a>
            <?php endif; ?>
            <a href="/?page=<?= $page + 1 ?><?= !empty($tags) ? '&tags=' . implode(',', $tags) : '' ?>"
               class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Next
            </a>
        </div>
    </div>
</body>
</html> 