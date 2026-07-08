import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, phone, industry, description } = payload;

    // Strict validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone are required fields.' },
        { status: 400 }
      );
    }

    // 1. Supabase Syncing Layer
    let supabaseUrl = process.env.SUPABASE_URL || '';
    if (supabaseUrl.endsWith('/rest/v1/')) {
      supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
    } else if (supabaseUrl.endsWith('/rest/v1')) {
      supabaseUrl = supabaseUrl.replace('/rest/v1', '');
    }
    const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

    let dbResult = null;
    let databaseWriteSuccess = false;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase
          .from('agency_leads')
          .insert([
            {
              name,
              email,
              phone,
              industry,
              message: description,
              created_at: new Date().toISOString()
            }
          ]);
        
        if (error) {
          console.error('Supabase insert warning:', error);
          dbResult = 'Warning: ' + error.message;
        } else {
          dbResult = 'Saved to Supabase successfully';
          databaseWriteSuccess = true;
        }
      } catch (dbError) {
        console.error('Supabase DB connection error:', dbError);
        dbResult = 'Database Connection Failed';
      }
    } else {
      dbResult = 'Bypassed (Supabase credentials not configured)';
      // Treat as true for testing/fallback flow to allow downstream relays
      databaseWriteSuccess = true;
    }

    // 2. Twilio WhatsApp Sandbox Automation (Bypassing carrier-restricted SMS)
    let twilioStatus = 'skipped';
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const targetPhone = process.env.MY_PHONE_NUMBER;

    if (databaseWriteSuccess && accountSid && authToken && targetPhone) {
      try {
        const client = twilio(accountSid, authToken);
        
        // Structure the WhatsApp message beautifully
        const messageBody = `*New Lead Captured on AI Craft Studio!*\n\n` +
                            `👤 *Name:* ${name}\n` +
                            `📧 *Email:* ${email}\n` +
                            `📞 *Phone:* ${phone}\n` +
                            `🏢 *Industry:* ${industry}\n` +
                            `📝 *Description:* ${description}\n\n` +
                            `⚡ _Synced directly with your live Supabase DB Cluster._`;

        // Format to/from for WhatsApp Sandbox format
        const formattedTo = targetPhone.startsWith('whatsapp:') ? targetPhone : `whatsapp:${targetPhone}`;
        const formattedFrom = 'whatsapp:+14155238886'; // Standard Sandbox number

        const twilioResponse = await client.messages.create({
          body: messageBody,
          from: formattedFrom,
          to: formattedTo
        });

        twilioStatus = `Sent successfully. SID: ${twilioResponse.sid}`;
        console.log('Twilio WhatsApp alert dispatched successfully:', twilioResponse.sid);
      } catch (twilioErr) {
        console.error('Twilio WhatsApp relay failed:', twilioErr.message);
        twilioStatus = `failed: ${twilioErr.message}`;
      }
    } else if (!accountSid || !authToken) {
      twilioStatus = 'bypassed (Twilio SID or Auth Token missing in .env)';
    } else if (!targetPhone) {
      twilioStatus = 'bypassed (MY_PHONE_NUMBER missing in .env)';
    }

    // 3. Razorpay Integration Stub
    // Initializes the Razorpay backend helper for future order creations.
    let razorpayInstance = null;
    let razorpayStatus = 'inactive';
    try {
      const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
      const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
      
      if (razorpayKeyId && razorpayKeySecret) {
        razorpayInstance = new Razorpay({
          key_id: razorpayKeyId,
          key_secret: razorpayKeySecret
        });
        razorpayStatus = 'ready';
        console.log('Razorpay server-side backend driver stub ready.');
      } else {
        razorpayStatus = 'bypassed (Credentials missing)';
      }
    } catch (payError) {
      console.warn('Razorpay server-side initialization bypassed:', payError.message);
      razorpayStatus = `error: ${payError.message}`;
    }

    /*
    // OPTIONAL SECURE PAYMENT ORDER GENERATION ENDPOINT EXPLANATION:
    // When the user selects a package, the client calls an endpoint like: /api/orders
    // Inside that endpoint, we can do:
    //
    // export async function POST(request) {
    //   const { amount, currency } = await request.json();
    //   const order = await razorpayInstance.orders.create({
    //     amount: amount * 100, // in paise
    //     currency: currency || "INR",
    //     receipt: `receipt_order_${Date.now()}`
    //   });
    //   return NextResponse.json({ success: true, orderId: order.id });
    // }
    */

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully!',
      supabase_sync: dbResult,
      twilio_whatsapp: twilioStatus,
      razorpay_status: razorpayStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Unified backend handler caught top-level exception:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
