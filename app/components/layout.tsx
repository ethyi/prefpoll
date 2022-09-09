import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pref Poll</title>
        <meta name="description" content="Free and quick preference polls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Pref Poll</Link>
        </h1>

        <h2 className={styles.description}>
          The place to create quick preference polls for free!
        </h2>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <a
          href="https://ethyi.de/posts/prefpoll"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by ethyi &copy; {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
}

export default Layout;
