-- Run once in Supabase SQL editor (after setup_subscriptions.sql)
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id
  ON public.subscriptions (stripe_subscription_id);
