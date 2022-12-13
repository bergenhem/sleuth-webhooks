import styles from './App.module.css';
import { onMount, createSignal, Switch } from 'solid-js';

const [impactType, setImpactType] = createSignal(null);

const sleuthImpact = async (passedType) => {
    const sleuthUrl = "https://app.sleuth.io/api/1/deployments/bergenhemcorp/gitlab-devops/production/pagerduty-webhooks/register_impact/" + import.meta.env.VITE_SLEUTH_API;
    
    fetch(sleuthUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: passedType
      })
    })
    .then((response) => {
      console.log("Response from Sleuth for " + impactType() + " action:", response);
    })
    .catch((error) => {
      console.log("Error when sending request to Sleuth API: ", error);
    });
};

const handleImpactClick = (event) => {
  
  // logic to "toggle" between triggered and resolved.
  // Default should only happen upon initial load and therefore should switch to "triggered"
  switch(impactType()) {
    case "triggered":
      setImpactType("resolved");
      break;
    case "resolved":
      setImpactType("triggered");
      break;
    default:
      setImpactType("triggered");
  }

  sleuthImpact(impactType());
};

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>
          DevOps Testing Sample - Webhook Edition
        </h1>
        <p class={styles.environmentText}>Current Environment: Prod</p>
        <Switch fallback={<p>Something went wrong.</p>}>
          <Match when={impactType() === null}>
            <button class={styles.sampleButton} onClick={handleImpactClick}>Trigger Impact</button>
          </Match>
          <Match when={impactType() === "resolved"}>
            <button class={styles.sampleButton} onClick={handleImpactClick}>Trigger Impact</button>
          </Match>
          <Match when={impactType() === "triggered"}>
            <button class={styles.sampleButton} onClick={handleImpactClick}>Resolve Impact</button>
          </Match>
        </Switch>
      </header>
    </div>
  );
}

export default App;
