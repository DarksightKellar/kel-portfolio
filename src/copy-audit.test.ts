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

  it("keeps quick-scan copy concrete without reading like a CV sidebar", () => {
    expect(quickScanProof).toEqual([
      { label: "Bring me", value: "messy builds, weird bugs, brittle systems" },
      { label: "You get", value: "shipped software with a debug trail" },
      { label: "I work by", value: "reproduce, test, cut, ship" },
      { label: "Open for", value: "remote roles + serious contract builds" },
    ]);
  });

  it("keeps the site in Kelvin's voice rather than CV voice", () => {
    const copy = userFacingDataCopy();

    expect(copy).toMatch(/Give me the rough version/i);
    expect(copy).toMatch(/the bug that only appears when it matters/i);
    expect(copy).toMatch(/I like the work/i);
    expect(copy).not.toMatch(/Senior product engineer for complex product systems/i);
    expect(copy).not.toMatch(/Open to remote senior\/staff engineering roles/i);
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

    expect(hero).toContain("Give me the rough version.");
    expect(hero).toContain("I'll make it real, make it reliable");
    expect(hero).toContain("Show me the work");
    expect(projectsSource).toContain("Work that had to hold.");
    expect(projectsSource).not.toMatch(/selected work with public evidence/i);
    expect(openSource).toContain("Code you can inspect.");
    expect(openSource).toContain("The repos I can show cover product surfaces");
    expect(openSource).not.toMatch(/uneven|not just private work|public repositories show/i);
    expect(experience).toContain("Where I've done this.");
    expect(contact).toContain("Send me the messy version.");
    expect(footer).toContain("Built as a static Next.js portfolio with test coverage.");
  });

  it("keeps metadata concrete and searchable", () => {
    const layout = readSource("src/app/layout.tsx");

    expect(layout).toContain("Kelvin Lartey — builder for messy product systems");
    expect(layout).toContain("rough ideas, brittle workflows, and production bugs");
    expect(layout).not.toMatch(/hard, ambiguous systems|tests-first rigor|Senior product engineer for complex product systems/i);
  });
});
