# Task 2.4 — Manual Steps Pending: GitHub OAuth Setup

## Status: PENDING (requires user action)

These steps cannot be automated by the implementer because they require:
- A GitHub account with permissions to create OAuth Apps
- Manual configuration in the Supabase Dashboard

---

## Step-by-step instructions

### 1. Create a GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"** (or "Register a new application")
3. Fill in the form:
   - **Application name**: `OpenSpec Poll` (or any name you prefer)
   - **Homepage URL**: `http://localhost:4200`
   - **Application description**: (optional) "Voting app for OpenSpec adoption"
   - **Authorization callback URL**: `http://localhost:4200/**`
4. Click **"Register application"**
5. On the next page, click **"Generate a new client secret"**
6. **Copy the Client ID and Client Secret** — you will need them in Supabase

### 2. Configure GitHub Provider in Supabase Auth

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/REDACTED_PROJECT_REF
2. Navigate to **Authentication → Providers**
3. Find **GitHub** in the list and click to expand it
4. Toggle **Enabled** to ON
5. Paste the values from step 1:
   - **Client ID**: (from GitHub OAuth App)
   - **Client Secret**: (from GitHub OAuth App)
6. Set **Redirect URL** to: `http://localhost:4200/**`
7. Click **Save**

### 3. Verify the setup

1. Start the Angular app locally: `ng serve`
2. Open `http://localhost:4200` in your browser
3. Click **"Iniciar sesión con GitHub"**
4. You should be redirected to GitHub to authorize the app
5. After authorizing, you should be redirected back to `http://localhost:4200` with an active session

---

## Checklist for user

- [ ] GitHub OAuth App created with correct callback URL
- [ ] Client ID and Client Secret copied
- [ ] Supabase Auth GitHub provider enabled and configured
- [ ] Login flow tested manually in browser
- [ ] Session persists after page reload
