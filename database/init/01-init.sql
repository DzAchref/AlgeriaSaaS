-- Algeria SaaS Ecosystem — Database Initialization
-- This script runs on first docker compose up

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create schemas for each core service
CREATE SCHEMA IF NOT EXISTS payment;
CREATE SCHEMA IF NOT EXISTS identity;
CREATE SCHEMA IF NOT EXISTS notification;
CREATE SCHEMA IF NOT EXISTS compliance;
CREATE SCHEMA IF NOT EXISTS invoicing;

-- Grant usage
GRANT USAGE ON SCHEMA payment TO algeria_saas_user;
GRANT USAGE ON SCHEMA identity TO algeria_saas_user;
GRANT USAGE ON SCHEMA notification TO algeria_saas_user;
GRANT USAGE ON SCHEMA compliance TO algeria_saas_user;
GRANT USAGE ON SCHEMA invoicing TO algeria_saas_user;

-- Grant all privileges on schemas
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA payment TO algeria_saas_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA identity TO algeria_saas_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA notification TO algeria_saas_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA compliance TO algeria_saas_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA invoicing TO algeria_saas_user;

-- Default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA payment GRANT ALL ON TABLES TO algeria_saas_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA identity GRANT ALL ON TABLES TO algeria_saas_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA notification GRANT ALL ON TABLES TO algeria_saas_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA compliance GRANT ALL ON TABLES TO algeria_saas_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA invoicing GRANT ALL ON TABLES TO algeria_saas_user;
