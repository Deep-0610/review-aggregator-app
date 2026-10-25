import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { recipientName, phoneNumber, campaignName, message } = await request.json();

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromPhone) {
      return NextResponse.json(
        { error: 'Twilio credentials missing in environment variables.' },
        { status: 500 }
      );
    }

    // Call Twilio REST API using standard HTTP basic auth
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const params = new URLSearchParams({
      To: phoneNumber,
      From: fromPhone,
      Body: message || `Hi ${recipientName}, thanks for visiting! Please leave us a review.`,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Twilio Error Response:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to dispatch SMS' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, sid: data.sid });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}