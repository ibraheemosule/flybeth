-- Initialize travel platform database
-- This script runs when the PostgreSQL container starts

-- Create additional schemas if needed
-- CREATE SCHEMA IF NOT EXISTS analytics;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE flybeth TO travel_admin;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";