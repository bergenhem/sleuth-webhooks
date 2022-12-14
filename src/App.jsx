import styles from './App.module.css';
import { createSignal, Switch } from 'solid-js';

const [incidentType, setIncidentType] = createSignal(null);

const sleuthImpactIncident = async (passedType) => {
    const sleuthImpactIncidentUrl = "https://app.sleuth.io/api/1/deployments/bergenhemcorp/gitlab-devops/production/pagerduty-webhooks/register_impact/" + import.meta.env.VITE_SLEUTH_API;
    
    fetch(sleuthImpactIncidentUrl, {
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
      console.log("Response from Sleuth for " + incidentType() + " action:", response);
    })
    .catch((error) => {
      console.log("Error when sending request to Sleuth API: ", error);
    });
};

const sleuthImpactMetric = async (metric) => {
  const sleuthImpactMetricUrl = "https://app.sleuth.io/api/1/impact/3654/register_impact";

  fetch(sleuthImpactMetricUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      value: metric,
      api_key: import.meta.env.VITE_SLEUTH_API
    })
  })
  .then((response) => {
    console.log("Response from Sleuth:", response);
  })
  .catch((error) => { 
    console.log("Error from Sleuth: ", error);
  })
};

const handleIncidentClick = (event) => {
  
  // logic to "toggle" between triggered and resolved.
  // Default should only happen upon initial load and therefore should switch to "triggered"
  switch(incidentType()) {
    case "triggered":
      setIncidentType("resolved");
      break;
    case "resolved":
      setIncidentType("triggered");
      break;
    default:
      setIncidentType("triggered");
  }

  sleuthImpactIncident(incidentType());
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
          <Match when={incidentType() === null}>
            <button class={styles.triggerButton} onClick={handleIncidentClick}>Trigger Impact</button>
          </Match>
          <Match when={incidentType() === "resolved"}>
            <button class={styles.triggerButton} onClick={handleIncidentClick}>Trigger Impact</button>
          </Match>
          <Match when={incidentType() === "triggered"}>
            <button class={styles.resolveButton} onClick={handleIncidentClick}>Resolve Impact</button>
          </Match>
        </Switch>
      </header>
    </div>
  );
}

export default App;
