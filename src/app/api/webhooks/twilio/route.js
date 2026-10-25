import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.formData();
    const fromNumber = body.get('From');
    const messageBody = body.get('Body');
    const messageStatus = body.get('MessageStatus');

    console.log(`[Twilio Webhook Received] From: ${fromNumber} | Message: ${messageBody} | Status: ${messageStatus}`);

    // You can process customer OPT-OUT responses or review ratings here

    return NextResponse.json({ success: true, message: 'Webhook processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing Twilio webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}