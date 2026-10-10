
"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  saveReviewAction,
  deleteReviewAction,
  type ReviewState,
} from "@/lib/actions";

interface Review {
  rating: number;
  content: string;
}

interface ReviewSectionProps {
  bookId: number;
  review: Review | null;
}

const initialState: ReviewState = {
  message: null,
  success: false,
};

// Separate component: fresh action state on every open
function ReviewForm({
  bookId,
  review,
  onCancel,
  onSaved,
}: ReviewSectionProps & {
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [rating, setRating] = useState(review?.rating ?? 5);
  const [content, setContent] = useState(review?.content ?? "");

  const [state, formAction, isPending] = useActionState(
    saveReviewAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      onSaved();
    }
  }, [state.success, onSaved]);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <input type="hidden" name="bookId" value={bookId} />
      <input type="hidden" name="rating" value={rating} />
      <input
        type="hidden"
        name="mode"
        value={review ? "update" : "create"}
      />

      <fieldset disabled={isPending} className="space-y-5">
        <legend className="mb-2 text-sm font-semibold">
          Select your rating
        </legend>

        <div className="flex gap-2" aria-label="Book rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              aria-pressed={rating === star}
              className={`text-3xl transition-colors ${
                star <= rating
                  ? "text-[#A2674A]"
                  : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <div>
          <label
            htmlFor="review-content"
            className="mb-2 block text-sm font-semibold"
          >
            Your review
          </label>

          <textarea
            id="review-content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={4}
            required
            placeholder="What did you think about this book?"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
          />
        </div>
      </fieldset>

      {state.message && !state.success && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-full border border-gray-300 px-5 py-2 font-semibold"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="rounded-full bg-[#355E3B] px-5 py-2 font-semibold text-white hover:bg-[#24452A] disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Review"}
        </button>
      </div>
    </form>
  );
}

export default function ReviewSection({
  bookId,
  review,
}: ReviewSectionProps) {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, startDelete] = useTransition();

  function openForm() {
    setError(null);
    setFormKey((previous) => previous + 1);
    setEditing(true);
  }

  function handleSaved() {
    setEditing(false);
    router.refresh();
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    setError(null);

    startDelete(async () => {
      const result = await deleteReviewAction(bookId);

      if (result.success) {
        setEditing(false);
        router.refresh();
      } else {
        setError(result.message ?? "Could not delete review.");
      }
    });
  }

  return (
    <section className="mt-10 rounded-2xl bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#A2674A]">
          Your rating
        </h2>

        {!editing && (
          <div className="flex gap-2">
            {!review ? (
              <button
                type="button"
                onClick={openForm}
                className="rounded-full bg-[#355E3B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#24452A]"
              >
                + Add Review
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={openForm}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {editing ? (
        <ReviewForm
          key={formKey}
          bookId={bookId}
          review={review}
          onCancel={() => setEditing(false)}
          onSaved={handleSaved}
        />
      ) : review ? (
        <div className="mt-4">
          <div
            className="text-2xl text-[#A2674A]"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>

          <p className="mt-4 whitespace-pre-wrap text-gray-600">
            {review.content}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">
          You have not reviewed this book yet.
        </p>
      )}
    </section>
  );
}
