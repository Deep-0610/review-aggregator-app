'use client';

import React from 'react';
import { Star, MessageSquare, TrendingUp, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function KpiCards({ kpiData }) {
  const cards = [
    {
      title: 'Average Rating',
      value: `${kpiData.averageRating} / 5.0`,
      description: '+0.3 from last month',
      icon: Star,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Total Reviews',
      value: kpiData.totalReviews,
      description: 'Across Google, Yelp, Facebook',
      icon: MessageSquare,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Response Rate',
      value: `${kpiData.responseRate}%`,
      description: 'Reviews replied within 48h',
      icon: TrendingUp,
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'SMS Conversion',
      value: `${kpiData.smsConversionRate}%`,
      description: 'Text links resulting in reviews',
      icon: Send,
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{card.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
                <p className="text-[11px] text-slate-400 mt-1">{card.description}</p>
              </div>
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}