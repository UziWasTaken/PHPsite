import { useState } from 'react';
import { prisma } from '../../lib/prisma';
import styles from '../../styles/Posts.module.css';
import Link from 'next/link';

export default function Posts({ initialPosts, totalPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [page, setPage] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.tags}>
          <h3>Tags</h3>
          <div className={styles.tagList}>
            {/* Tag filtering UI */}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className={styles.thumbnail}>
                <img src={post.thumbnail || post.imageUrl} alt={`Post ${post.id}`} />
                <div className={styles.tagOverlay}>
                  {post.tags?.slice(0, 3).map((tag) => (
                    <span key={tag.id} className={styles.tag}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.pagination}>
          {/* Pagination controls */}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const page = parseInt(query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        take: limit,
        skip,
        include: {
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.post.count(),
    ]);

    return {
      props: {
        initialPosts: JSON.parse(JSON.stringify(posts)),
        totalPosts,
      },
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      props: {
        initialPosts: [],
        totalPosts: 0,
        error: 'Failed to load posts'
      },
    };
  }
} 