import styles from './App.module.css';
import { createSignal, Switch } from 'solid-js';

const [incidentType, setIncidentType] = createSignal(null);

const sleuthImpactIncident = async (passedType) => {
    //call out Netlify function to trigger or resolve our incident
    fetch("./.netlify/functions/sleuthImpactIncident", {
      method: "POST",
      body: JSON.stringify({
        type: passedType
      })
    })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log("[Incident] Response from Sleuth for " + incidentType() + " action:", data);
    })
    .catch((error) => {
      console.log("[Incident] Error when sending request to Sleuth API: ", error);
    });
};

const sleuthImpactMetric = async (passedMetric) => {
    //call out Netlify function to add a custom metric
    fetch("./.netlify/functions/sleuthImpactMetric", {
      method: "POST",
      body: JSON.stringify({
        value: passedMetric
      })
    })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log("[Metric] Response from Sleuth", data);
    })
    .catch((error) => {
      console.log("[Metric] Error when sending request to Sleuth API: ", error);
    });
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

const handleMetricClick = (event) => {
  let metricToPass = 10;

  sleuthImpactMetric(metricToPass)
};

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>
          DevOps Testing Sample - Webhook Edition
        </h1>
        <p class={styles.environmentText}>Current Environment: Prod</p>
        <div>
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
        </div>
        <div>
          <button class={styles.triggerButton} onClick={handleMetricClick}>Add Metric</button>
        </div>
      </header>
    </div>
  );
}

export default App;
