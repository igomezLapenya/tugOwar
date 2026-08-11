# Task 2.5 — Supabase Schema Verification

## Migration Applied

**Method**: Supabase MCP `execute_sql` (remote SQL execution via API)
**Project**: `REDACTED_PROJECT_REF`
**Migration file**: `supabase/migrations/0001_votes.sql`

---

## Verification Results

### 1. Table `votes` exists

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'votes';
```

**Result**: `votes` table found.

**Schema**:
- `user_id` uuid PRIMARY KEY references `auth.users(id)` ON DELETE CASCADE
- `vote` boolean NOT NULL
- `created_at` timestamptz NOT NULL DEFAULT now()
- `updated_at` timestamptz NOT NULL DEFAULT now()

### 2. RLS Enabled and Policies Exist

```sql
SELECT policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies WHERE schemaname = 'public' AND tablename = 'votes';
```

**Result**: 3 policies found.

| Policy | Command | Role | Using / With Check |
|--------|---------|------|-------------------|
| Users can select their own vote | SELECT | authenticated | `auth.uid() = user_id` |
| Users can insert their own vote | INSERT | authenticated | `auth.uid() = user_id` |
| Users can update their own vote | UPDATE | authenticated | `auth.uid() = user_id` |

### 3. RPC Function `get_poll_results()` exists

```sql
SELECT routine_name, routine_type, security_type
FROM information_schema.routines
WHERE routine_schema = 'public' AND routine_name = 'get_poll_results';
```

**Result**: Function found with `security_type = DEFINER`.

**Definition**:
- Returns `TABLE(yes_count int, no_count int)`
- Language: SQL
- Security: DEFINER
- Grants: EXECUTE to `authenticated`

---

## Conclusion

All schema objects created successfully. Migration is live on the remote Supabase project.
