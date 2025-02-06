import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Posts.module.css';

export default function Posts({ initialPosts = [] }) {
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
  const { default: prisma } = await import('../../lib/prisma');
  
  try {
    const posts = await prisma.post.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    return {
      props: {
        initialPosts: JSON.parse(JSON.stringify(posts))
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      props: {
        initialPosts: []
      },
    };
  }
} 