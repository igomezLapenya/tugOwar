# Task 3.4 — Manual Verification: GitHub Login

## Status: PENDING (requires user action)

This task cannot be automated because it requires:
- A real GitHub account
- The GitHub OAuth App configured (see task 2.4)
- Browser interaction with the GitHub authorization flow

---

## Checklist for user

- [ ] Complete task 2.4 (GitHub OAuth App + Supabase provider setup)
- [ ] Start the app: `ng serve`
- [ ] Open `http://localhost:4200` in browser
- [ ] Click **"Iniciar sesión con GitHub"**
- [ ] Authorize the app on GitHub
- [ ] Verify redirect back to app and user is shown as logged in
- [ ] Reload the page and verify session persists (no re-login required)
- [ ] Click **"Cerrar sesión"** and verify app returns to anonymous state

## Notes

- Session persistence is handled by `@supabase/supabase-js` via localStorage
- If login fails, check browser console for errors and verify the GitHub OAuth callback URL matches `http://localhost:4200/**`
