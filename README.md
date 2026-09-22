# venue-ops-mcp

An [MCP](https://modelcontextprotocol.io) server for indoor sports and simulator venue operations: golf sims, batting cages, pickleball courts, and the like. This build ships with hardcoded sample bays only; there is no live venue behind it.

Built by [Matthew Myers](https://github.com/martianclaw-spec) as a small, public demonstration of a real MCP server.

## What it does today

One tool:

- `list_bays` — returns the venue's bays, cages, and courts with current status and hourly rate.

## Protocol target

- Target revision: **2026-07-28** (no sampling, no MCP logging, stdio transport).
- Actual SDK: `@modelcontextprotocol/sdk` v1.30.0, which targets protocol revision `2025-11-25`. Modern-era `server/discover` and per-request `_meta` are pending an SDK update or a manual layer on top of the SDK. When that lands, this server will move to the modern handshake without changing its tool surface.
- Remote transport: not enabled. If a remote build is ever added, it will use **Streamable HTTP**, not the deprecated HTTP+SSE transport, with the Authorization framework for auth.

## Run it

```bash
npm install
npm run build
npm start
```

## Use it from Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "venue-ops": {
      "command": "node",
      "args": ["C:\\path\\to\\venue-ops-mcp\\dist\\index.js"]
    }
  }
}
```

Restart Claude Desktop. Ask "list the bays" to confirm it's wired up.

## Repo rules

This repo is public. Nothing real goes in it:

- No real venue data, bookings, customers, or bay configurations.
- No API keys, tokens, or credentials of any kind.
- Any future secrets go in a gitignored `.env` (already ignored).

Hardcoded sample bays only.

## License

MIT
