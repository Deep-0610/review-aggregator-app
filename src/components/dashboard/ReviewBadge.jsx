import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function PlatformBadge({ platform }) {
  const configs = {
    google: { label: 'Google', className: 'bg-red-500/10 text-red-600 border-red-200' },
    yelp: { label: 'Yelp', className: 'bg-rose-500/10 text-rose-700 border-rose-200' },
    facebook: { label: 'Facebook', className: 'bg-blue-500/10 text-blue-600 border-blue-200' },
  };

  const config = configs[platform] || { label: platform, className: 'bg-gray-100 text-gray-700' };

  return (
    <Badge variant="outline" className={`font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
}

export function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  );
}