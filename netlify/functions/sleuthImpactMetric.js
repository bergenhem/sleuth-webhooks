import axios from 'axios';

exports.handler = async (event, context) => {
  let passedMetric = JSON.parse(event.body).value;
  
  const sleuthImpactMetricUrl = "https://app.sleuth.io/api/1/impact/3654/register_impact";
    
  const sleuthResponse = await axios.post(sleuthImpactMetricUrl,
    {
      value: passedMetric,
      api_key: process.env.VITE_SLEUTH_API
    },
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