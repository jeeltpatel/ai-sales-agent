const axios = require('axios');
require('dotenv').config();

const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY;

async function scheduleMeeting(startTime, endTime, inviteeEmail) {
  try {
    const response = await axios.post('https://api.calendly.com/scheduled_events', {
      headers: {
        'Authorization': `Bearer ${CALENDLY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        start_time: startTime, 
        end_time: endTime,     
        location: 'Zoom',
        invitee_email: inviteeEmail,
      },
    });
    console.log('Meeting scheduled:', response.data);
  } catch (error) {
    console.error('Error scheduling meeting:', error);
  }
}


scheduleMeeting('2025-03-19T12:00:00Z', '2025-03-19T13:00:00Z', 'invitee@example.com');
