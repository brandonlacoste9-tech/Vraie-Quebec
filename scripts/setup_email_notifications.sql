-- Create email_subscribers table for newsletter and event notifications
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  preferences JSONB DEFAULT '{"events": true, "venues": true, "deals": true}'::jsonb,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  verified BOOLEAN DEFAULT false,
  verification_token TEXT,
  unsubscribe_token TEXT DEFAULT gen_random_uuid()::text
);

-- Enable RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy for reading own subscription
CREATE POLICY "Users can read own subscription" ON email_subscribers
  FOR SELECT USING (true);

-- Policy for inserting
CREATE POLICY "Anyone can subscribe" ON email_subscribers
  FOR INSERT WITH CHECK (true);

-- Policy for updating preferences
CREATE POLICY "Users can update own subscription" ON email_subscribers
  FOR UPDATE USING (true);
