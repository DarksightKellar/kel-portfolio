// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  experiences,
  openSourceSignals,
  operatingPrinciples,
  profile,
  projects,
  quickScanProof,
} from "./lib/data";

const root = process.cwd();

function readSource(path: string) {
  return readFileSync(join(root, path), "utf8");
}

function userFacingDataCopy() {
  return [
    profile.title,
    profile.positioning,
    profile.summary,
    profile.availability,
    ...quickScanProof.flatMap((item) => [item.label, item.value]),
    ...operatingPrinciples.flatMap((principle) => [principle.title, principle.body]),
    ...projects.flatMap((project) => [
      project.title,
      project.role,
      project.description,
      project.highlight,
      ...project.proof,
      ...project.evidence.flatMap((item) => [item.label, item.href]),
    ]),
    ...openSourceSignals.flatMap((signal) => [signal.repo, signal.note]),
    ...experiences.flatMap((experience) => [experience.company, experience.role, experience.period, ...experience.highlights]),
  ].join("\n");
}

describe("portfolio copy audit", () => {
  it("keeps data copy client-facing instead of audit-note or anti-hype defensive language", () => {
    const copy = userFacingDataCopy();

    expect(copy).not.toMatch(/portfolio signal|good portfolio signal|strong signal/i);
    expect(copy).not.toMatch(/parts hiring teams care about/i);
    expect(copy).not.toMatch(/patch by vibe|no theatre|no mythology|not a toy script/i);
    expect(copy).not.toMatch(/bloated task-management theatre|portfolio garnish/i);
    expect(copy).not.toMatch(/public signal|github signal/i);
    expect(copy).not.toMatch(/not just|not only|not a /i);
  });

  it("keeps quick-scan copy sharp for hiring managers and contract clients", () => {
    expect(quickScanProof).toEqual([
      { label: "Best at", value: "Unclear products, broken systems, rescue" },
      { label: "Evidence", value: "522 + 254 contributions on V2 repos" },
      { label: "Work mode", value: "Find the fault line, test it, ship" },
      { label: "Available for", value: "Remote roles, contracts, stabilization" },
    ]);
  });

  it("keeps the positioning direct, human, and sober", () => {
    const copy = userFacingDataCopy();

    expect(copy).toMatch(/Senior product engineer for ambiguous builds and brittle systems/i);
    expect(copy).toMatch(/I build what is still stuck in people's heads/i);
    expect(copy).toMatch(/Open to remote senior\/staff roles, contract builds, stabilization work, and product-heavy debugging/i);
    expect(copy).not.toMatch(/10x|rockstar|ninja|wizard|genius|guru/i);
  });

  it("labels private or local product evidence honestly without fake public proof", () => {
    const furoo = projects.find((project) => project.slug === "furoo");
    const clinic = projects.find((project) => project.slug === "clinic-ms");

    expect(furoo?.evidence.map((item) => item.label)).not.toEqual(expect.arrayContaining(["Local product context", "Portfolio repo"]));
    expect(furoo?.evidence.map((item) => item.label).join(" ")).toMatch(/private product|walkthrough|demo/i);
    expect(clinic?.evidence.map((item) => item.label).join(" ")).toMatch(/private repo|walkthrough/i);
  });

  it("speaks as Kelvin instead of narrating his work from the outside", () => {
    const prose = [
      ...projects.flatMap((project) => [project.description, project.highlight, ...project.proof]),
      ...openSourceSignals.map((signal) => signal.note),
      ...experiences.flatMap((experience) => experience.highlights),
    ].join("\n");

    expect(prose).not.toMatch(/public repos list DarksightKellar|lists DarksightKellar|activity shows recent commits to DarksightKellar/i);
    expect(prose).not.toMatch(/public (repos|github activity) (show|shows|list|lists)/i);
    expect(prose).toMatch(/I was one of the top contributors/i);
    expect(prose).toMatch(/I contributed/i);
  });

  it("keeps component headings and calls to action clear instead of self-conscious", () => {
    const hero = readSource("src/components/Hero.tsx");
    const projectsSource = readSource("src/components/Projects.tsx");
    const openSource = readSource("src/components/OpenSource.tsx");
    const experience = readSource("src/components/Experience.tsx");
    const contact = readSource("src/components/Contact.tsx");
    const footer = readSource("src/components/Footer.tsx");

    expect(hero).toContain("Bring me the thing that still lives in your head.");
    expect(hero).toContain("I’ll turn it into working software, then make it reliable.");
    expect(hero).toContain("Talk through the rough version");
    expect(projectsSource).toContain("Work that had to hold.");
    expect(openSource).toContain("Code you can inspect.");
    expect(openSource).toContain("The public trail is partial, but the useful parts are inspectable");
    expect(openSource).not.toMatch(/uneven|not just private work|public repositories show/i);
    expect(experience).toContain("Where I’ve done this.");
    expect(contact).toContain("Send the messy version.");
    expect(footer).toContain("Static Next.js portfolio. Tested because the words matter too.");
  });

  it("adds a fast-fit section for the situations Kelvin is unusually useful in", () => {
    const page = readSource("src/app/page.tsx");
    const fit = readSource("src/components/FitHighlights.tsx");

    expect(page).toContain("<FitHighlights />");
    expect(fit).toContain("When I’m the right person");
    expect(fit).toContain("A product is still mostly in someone’s head");
    expect(fit).toContain("A bug is real, expensive, and hard to reproduce");
    expect(fit).toContain("A workflow has grown around spreadsheets, Slack threads, and tribal knowledge");
  });

  it("keeps metadata concrete and searchable", () => {
    const layout = readSource("src/app/layout.tsx");

    expect(layout).toContain("Kelvin Lartey — Senior product engineer for ambiguous builds and brittle systems");
    expect(layout).toContain("builds unclear product ideas, debugs brittle systems, and ships tested web, mobile, payments, automation, and protocol software");
    expect(layout).not.toMatch(/10x|rockstar|ninja|wizard|guru/i);
  });
});
