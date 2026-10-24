'use client';

import React, { useState } from 'react';
import { Send, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SmsTemplateCard({ campaign, onSaveTemplate }) {
  const [template, setTemplate] = useState(campaign.template);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSaveTemplate(campaign.id, template);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900">
            {campaign.name}
          </CardTitle>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            {campaign.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-4 text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-500" /> Trigger: {campaign.trigger}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-blue-500" /> Delay: {campaign.delay}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs font-medium text-slate-700 mb-1 block">
            SMS Template Message
          </label>
          <textarea
            rows={3}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-2.5 border rounded-lg text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-200"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Available tags: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">{'{first_name}'}</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">{'{business_name}'}</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">{'{review_link}'}</code>
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex gap-4">
            <span>Sent: <strong className="text-slate-900">{campaign.sentCount}</strong></span>
            <span>Click Rate: <strong className="text-slate-900">{campaign.clickRate}</strong></span>
          </div>
          <Button size="sm" onClick={handleSave} className="gap-1.5 h-8 text-xs">
            {isSaved ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Saved
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}