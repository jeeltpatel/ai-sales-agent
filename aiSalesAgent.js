const fetchLeadsFromHunter = require('./fetchLeads'); // Ensure this is correct
const sendEmail = require('./sendEmail');
const scheduleMeeting = require('./scheduleMeeting');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateSalesPitch(lead) {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Generate a personalized sales pitch for a potential lead. Lead: ${lead.name}, Company: ${lead.company}, Email: ${lead.email}`,
    max_tokens: 100,
  });

  return response.choices[0].text.trim();
}

async function processLeads() {
  const leads = await fetchLeadsFromHunter('stripe.com');
  if (leads && leads.length > 0) {
    for (const lead of leads) {
      const salesPitch = await generateSalesPitch(lead);
      await sendEmail(lead.email, 'Personalized Sales Pitch', salesPitch);
      await scheduleMeeting('2025-03-19T12:00:00Z', '2025-03-19T13:00:00Z', lead.email);
    }
  }
}

processLeads();
