exports.handler = async (event, context) => {
  let passedMetric = JSON.parse(event.body).value;
  
  const sleuthImpactMetricUrl = "https://app.sleuth.io/api/1/impact/3654/register_impact";
    
  const sleuthResponse = await fetch(sleuthImpactMetricUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        value: passedMetric,
        api_key: process.env.VITE_SLEUTH_API
      })
    });
    
  let responseText = await sleuthResponse.text();

  console.log("responseText", responseText);

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