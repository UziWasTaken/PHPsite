import Head from 'next/head';
import styles from '../styles/ApiDocs.module.css';

export default function ApiDocs() {
  return (
    <div className={styles.container}>
      <Head>
        <title>API Documentation - Image Board</title>
      </Head>

      <main className={styles.main}>
        <h1>API Documentation</h1>

        <section className={styles.section}>
          <h2>Endpoints</h2>

          <div className={styles.endpoint}>
            <h3>GET /api/posts</h3>
            <p>Retrieve a list of posts</p>
            <h4>Query Parameters:</h4>
            <ul>
              <li><code>page</code> - Page number (default: 1)</li>
              <li><code>limit</code> - Posts per page (default: 20)</li>
              <li><code>tags</code> - Filter by tags (comma-separated)</li>
            </ul>
            <pre className={styles.code}>
              {JSON.stringify({
                "posts": [
                  {
                    "id": 1,
                    "imageUrl": "https://example.com/image.jpg",
                    "tags": ["tag1", "tag2"],
                    "createdAt": "2024-01-01T00:00:00Z"
                  }
                ],
                "total": 100,
                "page": 1,
                "pages": 5
              }, null, 2)}
            </pre>
          </div>

          <div className={styles.endpoint}>
            <h3>POST /api/posts</h3>
            <p>Upload a new post</p>
            <h4>Request Body:</h4>
            <pre className={styles.code}>
              {JSON.stringify({
                "image": "base64_encoded_image",
                "tags": ["tag1", "tag2"],
                "source": "https://source.com",
                "rating": "SAFE"
              }, null, 2)}
            </pre>
          </div>

          <div className={styles.endpoint}>
            <h3>GET /api/tags</h3>
            <p>Get list of all tags</p>
            <h4>Query Parameters:</h4>
            <ul>
              <li><code>type</code> - Filter by tag type</li>
              <li><code>search</code> - Search tags by name</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Authentication</h2>
          <p>No authentication required for GET requests. POST requests require an API key.</p>
        </section>

        <section className={styles.section}>
          <h2>Rate Limiting</h2>
          <p>100 requests per minute per IP address.</p>
        </section>
      </main>
    </div>
  );
} 