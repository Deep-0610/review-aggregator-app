'use client';

import React, { useState } from 'react';
import { MessageSquare, CheckCircle, Send } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlatformBadge, StarRating } from './ReviewBadge';

export function ReviewCard({ review, onSendReply }) {
  const [replyText, setReplyText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onSendReply(review.id, replyText);
    setIsOpen(false);
    setReplyText('');
  };

  return (
    <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.avatarUrl} alt={review.authorName} />
            <AvatarFallback>{review.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">{review.authorName}</h4>
            <p className="text-xs text-slate-500">
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <PlatformBadge platform={review.platform} />
      </CardHeader>

      <CardContent className="space-y-3">
        <StarRating rating={review.rating} />
        <p className="text-sm text-slate-700 leading-relaxed">{review.comment}</p>

        {review.status === 'replied' && (
          <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium text-slate-800 mb-1">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>Business Response</span>
            </div>
            <p>{review.replyText}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {review.status === 'unreplied' ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-2 text-xs' })}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Reply to Review
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Reply to {review.authorName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-500 italic">"{review.comment}"</p>
                <textarea
                  className="w-full min-h-[120px] p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your official response here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" className="gap-2" onClick={handleReplySubmit}>
                    <Send className="h-3.5 w-3.5" />
                    Post Response
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> Replied
          </span>
        )}
      </CardFooter>
    </Card>
  );
}