import Head from 'next/head'
import GuineaPigNotes from './components/GuineaPigNotes';
import { app, db } from '../firebaseConfig';
import styles from '../styles/Home.module.css'
import { HeaderSection } from './components/Header';

export default function Home() {
  return (
   <div className={styles.page}>
      <Head>
        <title>Marsvinsdatabasen</title>
        <meta name="description" content="Marsvinsdatabasen nummer 1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSection />
      <main className={styles.main}>
        <GuineaPigNotes/>
      </main>
   </div>
  )
}