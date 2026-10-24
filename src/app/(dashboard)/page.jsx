'use client';

import React from 'react';
import { KPI_DATA, MONTHLY_TREND_DATA, PLATFORM_DISTRIBUTION } from '@/lib/mockAnalyticsData';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reputation Overview</h1>
          <p className="text-slate-500 text-sm">
            Real-time insights across your online review channels and SMS outreach campaigns.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/reviews">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <MessageSquare className="h-3.5 w-3.5" />
              View Inbox
            </Button>
          </Link>
          <Link href="/sms-campaigns">
            <Button size="sm" className="gap-2 text-xs">
              <Send className="h-3.5 w-3.5" />
              Manage SMS
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <KpiCards kpiData={KPI_DATA} />

      {/* Recharts Data Visualizations */}
      <AnalyticsCharts trendData={MONTHLY_TREND_DATA} platformData={PLATFORM_DISTRIBUTION} />
    </div>
  );
}