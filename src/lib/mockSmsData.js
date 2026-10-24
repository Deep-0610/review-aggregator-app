export const MOCK_SMS_CAMPAIGNS = [
  {
    id: 'camp-1',
    name: 'Post-Appointment Review Request',
    trigger: 'Appointment Completed',
    delay: '2 Hours After Event',
    status: 'active',
    sentCount: 142,
    clickRate: '38%',
    template: 'Hi {first_name}, thanks for visiting {business_name}! We would love your feedback. Please take 30 seconds to review us here: {review_link}',
  },
  {
    id: 'camp-2',
    name: 'Follow-up Unopened Request',
    trigger: 'No Link Clicked in 48h',
    delay: '48 Hours',
    status: 'active',
    sentCount: 54,
    clickRate: '22%',
    template: 'Hi {first_name}, just a quick check-in from {business_name}. Your experience matters to us: {review_link}',
  },
];

export const MOCK_SMS_LOGS = [
  {
    id: 'log-101',
    recipientName: 'Alice Walker',
    phoneNumber: '+1 (555) 234-5678',
    campaignName: 'Post-Appointment Review Request',
    sentAt: '2026-10-24T10:15:00Z',
    status: 'Delivered',
    linkClicked: true,
  },
  {
    id: 'log-102',
    recipientName: 'Robert Vance',
    phoneNumber: '+1 (555) 876-5432',
    campaignName: 'Post-Appointment Review Request',
    sentAt: '2026-10-24T09:00:00Z',
    status: 'Delivered',
    linkClicked: false,
  },
  {
    id: 'log-103',
    recipientName: 'Elena Rostova',
    phoneNumber: '+1 (555) 345-6789',
    campaignName: 'Follow-up Unopened Request',
    sentAt: '2026-10-23T16:45:00Z',
    status: 'Delivered',
    linkClicked: true,
  },
];