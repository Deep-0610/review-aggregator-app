'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

export function SmsLogsTable({ logs }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="text-xs font-semibold text-slate-700">Recipient</TableHead>
            <TableHead className="text-xs font-semibold text-slate-700">Phone</TableHead>
            <TableHead className="text-xs font-semibold text-slate-700">Sequence / Campaign</TableHead>
            <TableHead className="text-xs font-semibold text-slate-700">Status</TableHead>
            <TableHead className="text-xs font-semibold text-slate-700 text-right">Link Clicked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id} className="hover:bg-slate-50/50">
              <TableCell className="font-medium text-sm text-slate-900">{log.recipientName}</TableCell>
              <TableCell className="text-xs text-slate-600">{log.phoneNumber}</TableCell>
              <TableCell className="text-xs text-slate-600">{log.campaignName}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[11px]">
                  {log.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {log.linkClicked ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <XCircle className="h-3.5 w-3.5" /> No
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}