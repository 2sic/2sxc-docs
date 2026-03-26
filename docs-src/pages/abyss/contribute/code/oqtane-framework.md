---
uid: Abyss.Contribute.Code.OqtaneFramework
---

# How update `Oqtane.Framework` source code for 2sxc Oqtane development

[!include[""](../../_contributors-only.md)]

For **2sxc Oqtane development**, we work against the official [**Oqtane Framework master branch**](https://github.com/oqtane/oqtane.framework/tree/master), which contains the source code for the latest release (`Oqtane.Client`, `Oqtane.Server`, `Oqtane.Shared`).

In our locally cloned `oqtane.framework` git repository, on top of the official Oqtane commits, we typically maintain **one local commit** (never pushed to remote) with custom modifications such as changes in `appsettings.json`, `Oqtane.Server.csproj`, etc.

When a new Oqtane version is released, we need to pull the latest commits from `master` so we can test and develop 2sxc source code against the newest Oqtane release.  
The goal is to keep our local commit as the **latest commit on top of all official Oqtane commits**. Using `git pull --rebase` ensures this by keeping the history linear.

---

## Recommended Practice: Rebase on Pull

### Global Git Configuration

```bash
# Rebase by default on pull for all repositories
git config --global pull.rebase true
```

**Effect:**
  
- `git pull` behaves like `git pull --rebase` by default.  
- You can still override per repository or per command when needed.

---

### Per-Repository Configuration

Inside a specific repo (e.g., `oqtane.framework`):

```bash
# Enable rebase only for this repository
git config pull.rebase true
```

Or for fine-grained control:

```bash
# Always rebase when pulling from master
git config branch.master.rebase true
```

---

### One-Off Usage

```bash
git pull --rebase
```

Useful if you normally merge, but want a one-time rebase.

---

## When to Use Rebase vs Merge

### ✅ Use Rebase When

- You want a **clean, linear history**.  
- You have **local commits** that are not pushed to remote.  
- Before pushing, you need to **integrate the latest remote changes** without merge commits.  
- After rebasing, always **build and test** to ensure nothing breaks.

### ⚠️ Use Merge When

- You want to **preserve the exact integration history**.  
- Merge commits are valuable for showing when and how changes were combined (though this can complicate the Oqtane repo history).

---

## Summary

- Default to **`git pull --rebase`** for 2sxc Oqtane development to keep your local commit on top of official upstream changes.  
- Configure globally for convenience, but override per repo or per branch if needed.  
- Rebase for clarity and linearity; merge only when historical integration context is important.
