'use client';

import React, { useState } from 'react';
import { MOCK_SMS_CAMPAIGNS, MOCK_SMS_LOGS } from '@/lib/mockSmsData';
import { SmsTemplateCard } from '@/components/dashboard/SmsTemplateCard';
import { SmsLogsTable } from '@/components/dashboard/SmsLogsTable';
import { SendSmsModal } from '@/components/dashboard/SendSmsModal';

export default function SmsCampaignsPage() {
  const [campaigns, setCampaigns] = useState(MOCK_SMS_CAMPAIGNS);
  const [logs, setLogs] = useState(MOCK_SMS_LOGS);

  const handleSaveTemplate = (id, newTemplate) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, template: newTemplate } : c))
    );
  };

  const handleSendSms = (newLog) => {
    setLogs((prev) => [{ ...newLog, id: `log-${Date.now()}` }, ...prev]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SMS Review Automation</h1>
          <p className="text-slate-500 text-sm">
            Configure review request sequences and track outgoing customer SMS messages.
          </p>
        </div>
        <SendSmsModal onSendSms={handleSendSms} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Sequences</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <SmsTemplateCard
              key={campaign.id}
              campaign={campaign}
              onSaveTemplate={handleSaveTemplate}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Outbound SMS Logs</h2>
        <SmsLogsTable logs={logs} />
      </div>
    </div>
  );
}