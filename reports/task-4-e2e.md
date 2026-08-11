# Task 4.6 — Manual E2E Verification

## Status: PENDING (requires user action)

This task requires two real GitHub accounts and browser interaction. It cannot be automated.

---

## Prerequisites

- Complete tasks 2.4 and 3.4 (GitHub OAuth configured and login working)
- Two distinct GitHub accounts (Account A and Account B)

---

## Checklist

### (a) Each account votes once

- [ ] Account A logs in and votes **Sí**
- [ ] Account B logs in (in an incognito window or different browser) and votes **No**
- [ ] Both accounts see their own vote reflected in the UI

### (b) Changing vote updates the tally

- [ ] Account A changes vote from **Sí** to **No**
- [ ] Verify the tally updates: yes count decreases by 1, no count increases by 1
- [ ] Total vote count remains 2

### (c) RLS isolation between users

- [ ] Account A opens browser DevTools → Network tab
- [ ] Account A cannot see Account B's individual vote row (only aggregated results via RPC)
- [ ] Any direct `select * from votes` attempt via Supabase client is blocked by RLS for rows where `user_id != auth.uid()`

### (d) Anonymous user cannot see tally

- [ ] Open the app in a fresh incognito window without logging in
- [ ] Verify: no vote buttons, no tally results are shown
- [ ] Only the login button and landing illustration are visible

---

## Notes

- The tally is only visible to authenticated users who have already voted
- RLS policies ensure users can only read/write their own `votes` row
- The `get_poll_results()` RPC uses `security definer` to bypass RLS and return aggregates
