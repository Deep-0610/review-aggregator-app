'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_SMS_CAMPAIGNS } from '@/lib/mockSmsData';
import { fetchSmsLogs, recordSmsLog } from '@/lib/supabase/queries';
import { SmsTemplateCard } from '@/components/dashboard/SmsTemplateCard';
import { SmsLogsTable } from '@/components/dashboard/SmsLogsTable';
import { SendSmsModal } from '@/components/dashboard/SendSmsModal';

export default function SmsCampaignsPage() {
  const [campaigns, setCampaigns] = useState(MOCK_SMS_CAMPAIGNS);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      setLoading(true);
      const data = await fetchSmsLogs();
      setLogs(data);
      setLoading(false);
    }
    loadLogs();
  }, []);

  const handleSaveTemplate = (id, newTemplate) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, template: newTemplate } : c))
    );
  };

  const handleSendSms = async (newLog) => {
    // Optimistic UI Update
    setLogs((prev) => [{ ...newLog, id: `log-${Date.now()}` }, ...prev]);
    // Persist to Supabase Database
    await recordSmsLog(newLog);
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
        {loading ? (
          <div className="text-center py-8 text-slate-500 text-sm">Loading logs...</div>
        ) : (
          <SmsLogsTable logs={logs} />
        )}
      </div>
    </div>
  );
}