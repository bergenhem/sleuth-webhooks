import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>
          DevOps Testing Sample - Webhook Edition
        </h1>
        <p class={styles.environmentText}>Current Environment: Prod</p>
        <button class={styles.sampleButton}>Do Stuff</button>
      </header>
    </div>
  );
}

export default App;
