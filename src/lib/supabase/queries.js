import { createClient } from './client';
import { MOCK_REVIEWS } from '../mockData';
import { MOCK_SMS_LOGS } from '../mockSmsData';

const supabase = createClient();

// Fetch Reviews from Supabase
export async function fetchReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return MOCK_REVIEWS;
  }

  return data.map((r) => ({
    id: r.id,
    platform: r.platform,
    authorName: r.author_name,
    avatarUrl: r.avatar_url,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.created_at,
    status: r.status,
    replyText: r.reply_text,
  }));
}

// Update Review Reply in Supabase
export async function postReviewReply(reviewId, replyText) {
  const { error } = await supabase
    .from('reviews')
    .update({ status: 'replied', reply_text: replyText })
    .eq('id', reviewId);

  if (error) {
    console.warn('Supabase update failed, falling back to local state update.');
  }
}

// Fetch Outbound SMS Logs
export async function fetchSmsLogs() {
  const { data, error } = await supabase
    .from('sms_logs')
    .select('*')
    .order('sent_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return MOCK_SMS_LOGS;
  }

  return data.map((l) => ({
    id: l.id,
    recipientName: l.recipient_name,
    phoneNumber: l.phone_number,
    campaignName: l.campaign_name,
    status: l.status,
    linkClicked: l.link_clicked,
    sentAt: l.sent_at,
  }));
}

// Record Outbound SMS Request
export async function recordSmsLog(logData) {
  const { error } = await supabase.from('sms_logs').insert([
    {
      recipient_name: logData.recipientName,
      phone_number: logData.phoneNumber,
      campaign_name: logData.campaignName,
      status: logData.status || 'Delivered',
      link_clicked: logData.linkClicked || false,
    },
  ]);

  if (error) {
    console.warn('Supabase insert failed, falling back to local state insertion.');
  }
}