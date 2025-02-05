import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Safebooru - Anime and Manga Images</title>
        <meta name="description" content="Anime and Manga image board" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <img 
            src="/angel.png" 
            alt="Safebooru" 
            className={styles.logoImage}
          />
        </div>

        <div className={styles.menu}>
          <Link href="/posts">Browse</Link>
          <Link href="/comments">Comments</Link>
          <Link href="/account">My Account</Link>
          <Link href="/forum">Forums</Link>
          <Link href="/radio">Radio</Link>
          <Link href="/api-docs">API</Link>
        </div>

        <div className={styles.searchBox}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>Search</button>
        </div>

        <div className={styles.mascots}>
          <img 
            src="/mascots.png" 
            alt="Mascots" 
            className={styles.mascotsImage}
          />
        </div>

        <div className={styles.stats}>
          <p>Serving 4,569,420 posts - Running Gelbooru 0.2.5</p>
          <p>Have you tried our search plugin available for Firefox?</p>
        </div>
      </main>
    </div>
  );
} 