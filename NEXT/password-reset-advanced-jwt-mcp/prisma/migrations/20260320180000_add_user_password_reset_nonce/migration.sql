-- Aplicada vía MCP Supabase (add_user_password_reset_nonce)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "passwordResetNonce" TEXT;
