-- Bismillah Jadi Mediaku (Termokimia) - Supabase Schema
-- Jalankan kode ini di SQL Editor Supabase Anda.

-- ==========================================
-- 1. Table: users
-- ==========================================
CREATE TABLE users (
    email TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'visitor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 2. Table: results
-- ==========================================
CREATE TABLE results (
    email TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    s1 INT,
    s2 INT,
    s3 INT,
    s4 INT,
    eval INT,
    total INT,
    summary TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY (email)
        REFERENCES users(email)
        ON DELETE CASCADE
);

