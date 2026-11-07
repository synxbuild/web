@AGENTS.md

# synx build · website

Official site for synx build at synxbuild.com. Its only goal is to bring in new clients: every section pushes one final action (to be confirmed: book a call, WhatsApp or a form).

## Context
- Separate from the panel on purpose: the panel (app.synxbuild.com) is the repo `synxbuild/synxbuild`, project `app-synxbuild`. Never mix the two.
- Hosting: Vercel team "Synx Build" (Pro, one seat). This site needs its own project there (not created yet).
- Domain: synxbuild.com DNS lives in Cloudflare. The root still points to Spaceship parking. `app.` and `clientes.` belong to the panel: don't touch them.
- Brand: lowercase "synx build". Palette and Geist tracking are tokens in `app/globals.css`. Logos are in `public/brand` (use the PNGs, the SVG exports are huge rasters).
- Commits use `synxbuild@gmail.com`. Node 22 (`.nvmrc`), pnpm.

## Status (2026-11-07)
- Scaffold done and builds. The home is a placeholder with the logo only.
- First commit is local only: the push failed with 403 because the GitHub account on this machine (`Lavreano`) is not a collaborator on `synxbuild/web` yet.
- Waiting on the user: the copy and the final call to action. Don't invent copy.
- Next: push, create the Vercel project, preview, then point synxbuild.com and www to it.
