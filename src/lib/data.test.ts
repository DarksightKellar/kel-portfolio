import { describe, expect, it } from "vitest";
import {
  openSourceSignals,
  operatingPrinciples,
  profile,
  projects,
  quickScanProof,
} from "./data";

describe("portfolio positioning data", () => {
  it("positions Kelvin as a senior builder for ambiguous, hard-to-debug systems without hype language", () => {
    expect(profile.positioning).toContain("ambiguous");
    expect(profile.positioning).toContain("debug");
    expect(profile.positioning).toContain("shipped");
    expect(`${profile.positioning} ${profile.summary}`.toLowerCase()).not.toMatch(/10x|rockstar|ninja|wizard/);
  });

  it("makes working principles scan-visible", () => {
    expect(operatingPrinciples).toHaveLength(5);
    expect(operatingPrinciples.map((principle) => principle.title)).toEqual(
      expect.arrayContaining([
        "Test the claim before changing the code",
        "Make the unclear executable",
        "Leave systems sharper than I found them",
      ]),
    );
  });

  it("backs the front-page proof with public client/project context and GitHub evidence", () => {
    const slugs = projects.map((project) => project.slug);

    expect(slugs).toEqual(
      expect.arrayContaining([
        "sarcophagus-v2",
        "decent-azorius",
        "frostbyte",
        "orobopay",
        "post-mortem",
        "furoo",
      ]),
    );

    for (const project of projects) {
      expect(project.proof.length).toBeGreaterThanOrEqual(2);
      expect(project.evidence.some((item) => item.href.startsWith("https://"))).toBe(true);
    }
  });

  it("surfaces Clinic-MS with client-facing product copy, not audit-note copy", () => {
    const clinicMs = projects.find((project) => project.slug === "clinic-ms");
    const copy = `${clinicMs?.description} ${clinicMs?.proof.join(" ")}`;

    expect(clinicMs).toBeDefined();
    expect(clinicMs?.description).toMatch(/clinic|patient|operations/i);
    expect(clinicMs?.tech).toEqual(expect.arrayContaining(["Next.js 16", "Supabase", "RLS", "Vitest"]));
    expect(copy).toMatch(/change requests|preview|patients|staff/i);
    expect(copy.toLowerCase()).not.toMatch(/cloned codebase|codebase shows|test files|supabase migrations|hardening work is visible|visible in the code shape/);
  });

  it("surfaces GitHub contribution signals beyond personal demo projects", () => {
    expect(openSourceSignals.map((signal) => signal.repo)).toEqual(
      expect.arrayContaining([
        "sarcophagus-org/sarcophagus-v2-app",
        "sarcophagus-org/sarcophagus-v2-contracts",
        "decentdao/decent-contracts",
        "DarksightKellar/cardano_wallet_sdk",
      ]),
    );
  });

  it("keeps quick-scan proof concise enough for hiring managers", () => {
    expect(quickScanProof).toHaveLength(4);
    for (const item of quickScanProof) {
      expect(item.label.length).toBeLessThanOrEqual(32);
      expect(item.value.length).toBeLessThanOrEqual(42);
    }
  });
});
