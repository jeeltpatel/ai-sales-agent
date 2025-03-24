const axios = require('axios');
require('dotenv').config();

const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

async function fetchLeadsFromHunter(domain) {
  try {
    const response = await axios.get('https://api.hunter.io/v2/domain-search', {
      params: {
        domain: domain,
        api_key: HUNTER_API_KEY
      }
    });

   
    if (response.data && response.data.data) {
      console.log('Fetched Leads:', response.data.data);
      return response.data.data;
    } else {
      console.error('No leads found for domain:', domain);
      return [];
    }
  } catch (error) {
    console.error('Error fetching leads from Hunter.io:', error.message);
    return null;
  }
}


fetchLeadsFromHunter('stripe.com').then((leads) => {
  if (leads) {
    console.log('Leads:', leads);
  } else {
    console.log('No leads were fetched.');
  }
});
