import Head from "next/head";
import Login from "./components/Login";
import styles from "../styles/Home.module.css";
import { HeaderSection } from "./components/Header";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Marsvinsdatabasen</title>
        <meta name="description" content="Marsvinsdatabasen nummer 1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSection />
      <main className={styles.main}>
        <Login />
      </main>
    </div>
  );
}
