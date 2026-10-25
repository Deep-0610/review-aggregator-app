'use client';

import React, { useState, useEffect } from 'react';
import { fetchReviews, postReviewReply } from '@/lib/supabase/queries';
import { ReviewCard } from '@/components/dashboard/ReviewCard';
import { ReviewFilters } from '@/components/dashboard/ReviewFilters';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      const data = await fetchReviews();
      setReviews(data);
      setLoading(false);
    }
    loadReviews();
  }, []);

  const handleSendReply = async (reviewId, text) => {
    // Optimistic UI Update
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, status: 'replied', replyText: text } : r
      )
    );
    // Persist to Supabase Database
    await postReviewReply(reviewId, text);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform =
      selectedPlatform === 'all' || review.platform === selectedPlatform;

    const matchesStatus =
      selectedStatus === 'all' || review.status === selectedStatus;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Unified Reviews Inbox</h1>
        <p className="text-slate-500 text-sm">
          Manage and respond to feedback across Google, Yelp, and Facebook.
        </p>
      </div>

      <ReviewFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          Loading live reviews...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} onSendReply={handleSendReply} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-dashed text-slate-500">
              No reviews match your current filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}