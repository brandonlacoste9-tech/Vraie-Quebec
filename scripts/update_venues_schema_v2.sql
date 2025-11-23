-- Add address and opening_hours columns to venues table
ALTER TABLE venues 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS opening_hours JSONB;

-- Update existing venues with some dummy data for testing
UPDATE venues 
SET 
  address = CASE 
    WHEN name LIKE '%La Banquise%' THEN '994 Rue Rachel E, Montréal, QC H2J 2J3'
    WHEN name LIKE '%Schwartz%' THEN '3895 St Laurent Blvd, Montreal, Quebec H2W 1X9'
    WHEN name LIKE '%Piknic%' THEN 'Parc Jean-Drapeau, Montréal, QC'
    WHEN name LIKE '%New City Gas%' THEN '950 Ottawa St, Montreal, Quebec H3C 1S4'
    WHEN name LIKE '%Terrasse Nelligan%' THEN '106 Saint-Paul St W, Montreal, Quebec H2Y 1Z3'
    ELSE 'Montréal, QC'
  END,
  opening_hours = '{"monday": "11:00-03:00", "tuesday": "11:00-03:00", "wednesday": "11:00-03:00", "thursday": "11:00-03:00", "friday": "11:00-03:00", "saturday": "11:00-03:00", "sunday": "11:00-03:00"}'::jsonb
WHERE opening_hours IS NULL;
