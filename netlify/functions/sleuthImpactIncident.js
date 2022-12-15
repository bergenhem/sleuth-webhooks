import axios from 'axios';

exports.handler = async (event, context) => {
  let triggerType = JSON.parse(event.body).type;
  
  const sleuthImpactIncidentUrl = "https://app.sleuth.io/api/1/deployments/bergenhemcorp/gitlab-devops/production/pagerduty-webhooks/register_impact/" + process.env.VITE_SLEUTH_API;
    
  const sleuthResponse = await axios.post(sleuthImpactIncidentUrl,
    { type: triggerType }, 
    { headers: { "Content-Type": "application/json" } }
  );

  let responseText = await sleuthResponse.data;

  let sleuthStatusCode;
  if(responseText === "Success") {
    sleuthStatusCode = 200;
  }
  else {
    sleuthStatusCode = 400;
  }

  return {
    statusCode: sleuthStatusCode,
    body: responseText
  }
};