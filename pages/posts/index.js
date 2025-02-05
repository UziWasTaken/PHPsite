import { useState } from 'react';
import prisma from '../../lib/prisma';
import styles from '../../styles/Posts.module.css';
import Link from 'next/link';

export default function Posts({ initialPosts = [], totalPosts = 0 }) {
  const [posts] = useState(initialPosts);

  if (!posts.length) {
    return <div>No posts found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className={styles.thumbnail}>
                <img src={post.thumbnail || post.imageUrl} alt="" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const posts = await prisma.post.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    return {
      props: {
        initialPosts: JSON.parse(JSON.stringify(posts)),
        totalPosts: posts.length,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        initialPosts: [],
        totalPosts: 0,
      },
    };
  }
} 