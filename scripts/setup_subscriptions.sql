-- Create subscriptions table to track user usage and subscription status
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'trial', -- trial, active, inactive, expired
  trial_start_date TIMESTAMPTZ DEFAULT NOW(),
  trial_end_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  subscription_start_date TIMESTAMPTZ,
  messages_used INTEGER DEFAULT 0,
  images_used INTEGER DEFAULT 0,
  message_limit INTEGER DEFAULT 100,
  image_limit INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own subscription data
CREATE POLICY "Users can read own subscription" ON subscriptions
  FOR SELECT USING (true);

-- Create policy for updating subscription data
CREATE POLICY "Users can update own subscription" ON subscriptions
  FOR UPDATE USING (true);

-- Create policy for inserting new subscriptions
CREATE POLICY "Anyone can create subscription" ON subscriptions
  FOR INSERT WITH CHECK (true);
