import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Image Board</title>
        <meta name="description" content="A safe image board" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </div>

        <div className={styles.navigation}>
          <Link href="/posts">Browse</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/tags">Tags</Link>
        </div>

        <div className={styles.search}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className={styles.searchInput}
          />
          <Link href={`/posts?tags=${searchQuery}`}>
            <button className={styles.searchButton}>Search</button>
          </Link>
        </div>

        <div className={styles.stats}>
          <p>Serving 4,569,420 posts - Running Gelbooru 0.2.5</p>
        </div>
      </main>
    </div>
  );
} 