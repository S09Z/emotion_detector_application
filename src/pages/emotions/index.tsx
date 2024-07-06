// pages/index.js
import Head from 'next/head';
import Camera from '@/components/CameraDetector';
import VoiceDetector from '@/components/VoiceDetector';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Emotion Detection App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.camera}>
            <Camera />
          </div>
          <div className={styles.details}>
            <VoiceDetector />
          </div>
        </div>
      </main>
    </div>
  );
}
