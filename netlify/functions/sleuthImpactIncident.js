exports.handler = async (event, context) => {
  let triggerType = JSON.parse(event.body).type;
  
  const sleuthImpactIncidentUrl = "https://app.sleuth.io/api/1/deployments/bergenhemcorp/gitlab-devops/production/pagerduty-webhooks/register_impact/" + process.env.VITE_SLEUTH_API;
    
  const sleuthResponse = await fetch(sleuthImpactIncidentUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: triggerType
      })
    });

  let responseText = await sleuthResponse.text();

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