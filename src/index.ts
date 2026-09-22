#!/usr/bin/env node
/**
 * venue-ops-mcp
 *
 * An MCP server for indoor sports and simulator venue operations.
 * Stdio transport only. Sample data hardcoded; no real venue data,
 * customer info, or credentials in this repo.
 *
 * Target MCP revision: 2026-07-28 (no sampling, no MCP logging).
 * Note: @modelcontextprotocol/sdk 1.30.0 targets protocol 2025-11-25.
 * server/discover and per-request _meta will land when the SDK ships
 * 2026-07-28 support, or via a manual implementation layered on the SDK.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

type Bay = {
  id: string;
  name: string;
  kind: "golf_simulator" | "batting_cage" | "pickleball_court";
  status: "available" | "in_use" | "maintenance";
  hourly_rate_usd: number;
};

const SAMPLE_BAYS: Bay[] = [
  { id: "bay-1", name: "Bay 1",     kind: "golf_simulator",   status: "available",   hourly_rate_usd: 60 },
  { id: "bay-2", name: "Bay 2",     kind: "golf_simulator",   status: "in_use",      hourly_rate_usd: 60 },
  { id: "cage-1", name: "Cage 1",   kind: "batting_cage",     status: "maintenance", hourly_rate_usd: 45 },
];

const server = new McpServer(
  { name: "venue-ops-mcp", version: "0.0.2" },
  {
    instructions:
      "Venue operations for indoor sports and simulator businesses. This build ships with sample bays only; there is no live venue behind it. Use list_bays to see what's available.",
  },
);

server.registerTool(
  "list_bays",
  {
    title: "List bays",
    description:
      "Returns every bay, cage, or court the venue has, with its current status and hourly rate. Sample data only in this build.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({ bays: SAMPLE_BAYS }, null, 2),
      },
    ],
  }),
);

await server.connect(new StdioServerTransport());
