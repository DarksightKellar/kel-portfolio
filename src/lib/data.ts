export type EvidenceLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  slug: string;
  role: string;
  kind: "client" | "personal" | "open-source" | "product";
  description: string;
  proof: string[];
  tech: string[];
  highlight: string;
  evidence: EvidenceLink[];
  cover: {
    from: string;
    to: string;
    accent: string;
    shape: "grid" | "orbit" | "vault" | "ledger" | "pulse" | "timeline" | "atelier";
  };
};

export const profile = {
  name: "Kelvin Lartey",
  initials: "KL",
  title: "Senior product engineer for hard, ambiguous systems",
  email: "kelvinklartey@gmail.com",
  phone: "+44 7944 702 387",
  github: "https://github.com/DarksightKellar",
  linkedin: "https://www.linkedin.com/in/kelvin-lartey-851a6996/",
  positioning:
    "I turn ambiguous ideas, failing systems, debug trails, and half-spoken product instincts into shipped, test-backed software people can trust.",
  summary:
    "I am strongest where the problem is not yet clean: debugging brittle systems, shaping rough product intent, cutting through vague requirements, and building the version that survives contact with real users. No theatre. No mythology. Just clear thinking, careful execution, and code that holds up.",
  availability:
    "Open to remote senior/staff engineering roles, contract builds, rescue missions, and product-heavy debugging work.",
};

export const quickScanProof = [
  { label: "Best at", value: "Ambiguous product + hard debugging" },
  { label: "Delivery style", value: "Tests first, evidence before fixes" },
  { label: "Public signal", value: "Web3, mobile, infra, automation" },
  { label: "Mode", value: "Calm, exact, owner-minded" },
];

export const operatingPrinciples = [
  {
    title: "Test the claim before changing the code",
    body:
      "I do not patch by vibe. Reproduce, isolate, write the failing test, then fix the smallest real cause.",
  },
  {
    title: "Make the unclear executable",
    body:
      "A useful engineer turns fog into interfaces, acceptance criteria, tradeoffs, and running software.",
  },
  {
    title: "Leave systems sharper than I found them",
    body:
      "Refactors are not cosmetic. They should reduce future mistakes, clarify ownership, or remove hidden coupling.",
  },
  {
    title: "Build for the person who inherits it",
    body:
      "Readable boundaries, boring verification, good names, and no placeholder paths pretending to be architecture.",
  },
  {
    title: "Say what is weak while it is still cheap",
    body:
      "I would rather surface risk early than let a team purchase comfort with future rework.",
  },
];

export const capabilities = [
  {
    category: "Product engineering",
    items: ["Next.js", "React", "TypeScript", "Flutter", "React Native", "Clean Architecture", "UI systems"],
  },
  {
    category: "Debugging + quality",
    items: ["TDD", "integration tests", "regression harnesses", "root-cause analysis", "CI", "performance triage"],
  },
  {
    category: "Web3 + security-shaped systems",
    items: ["Solidity", "Safe modules", "DAO governance", "account abstraction", "ethers", "wagmi", "viem"],
  },
  {
    category: "Automation + infrastructure",
    items: ["Python", "FFmpeg", "API orchestration", "GitHub Actions", "Docker", "Supabase", "PostgreSQL"],
  },
];

export const projects: Project[] = [
  {
    title: "Sarcophagus V2",
    slug: "sarcophagus-v2",
    role: "Core contributor across interface and contracts",
    kind: "client",
    description:
      "A decentralized dead man's switch built on Ethereum and Arweave. The interesting work lives where product UX, contract state, storage permanence, and adversarial failure modes meet.",
    proof: [
      "Public repos list DarksightKellar among top contributors on the V2 app and contracts.",
      "The protocol protects information release through time-delayed, encrypted, on-chain conditions.",
      "Work spans the parts hiring teams care about: frontend flows, contract integration, local development, and system reliability.",
    ],
    tech: ["TypeScript", "React", "Solidity", "Hardhat", "Ethereum", "Arweave"],
    highlight: "Privacy-critical product with contract-backed behavior",
    evidence: [
      { label: "V2 app repo", href: "https://github.com/sarcophagus-org/sarcophagus-v2-app" },
      { label: "V2 contracts repo", href: "https://github.com/sarcophagus-org/sarcophagus-v2-contracts" },
      { label: "Protocol site", href: "https://sarcophagus.io/" },
    ],
    cover: { from: "#111827", to: "#312e81", accent: "#a78bfa", shape: "vault" },
  },
  {
    title: "Decent DAO / Azorius governance",
    slug: "decent-azorius",
    role: "Governance product + smart-contract contributor",
    kind: "client",
    description:
      "Composable DAO governance around Safe modules, proposal execution, voting strategies, and sponsored voting. This is infrastructure where UX mistakes become governance mistakes.",
    proof: [
      "decentdao/decent-contracts lists DarksightKellar as a contributor.",
      "Azorius is a Safe Zodiac module framework for modular DAO proposal and voting execution.",
      "Gasless voting documentation shows the product goal: reduce voter friction with shared paymaster funding.",
    ],
    tech: ["Solidity", "TypeScript", "Safe", "Zodiac", "Account abstraction", "Next.js"],
    highlight: "Governance systems with real execution risk",
    evidence: [
      { label: "Decent contracts", href: "https://github.com/decentdao/decent-contracts" },
      { label: "Gasless voting docs", href: "https://docs.decentdao.org/app/user-guide/gasless-voting" },
      { label: "Decent app", href: "https://app.decentdao.org" },
    ],
    cover: { from: "#082f49", to: "#0f766e", accent: "#67e8f9", shape: "grid" },
  },
  {
    title: "FrostByte",
    slug: "frostbyte",
    role: "Lead mobile engineer",
    kind: "client",
    description:
      "Offline data encryption and secret management for sensitive user data. The public product centers on self-sovereign storage, offline vaults, multi-user access, and no third-party custody.",
    proof: [
      "Google Play lists 100K+ downloads and no data collection declared.",
      "Product materials describe offline vault encryption, QR backups, and multi-authorized access.",
      "The engineering challenge is simple to say and hard to make safe: help ordinary users hold sensitive secrets without training them to be security engineers.",
    ],
    tech: ["Flutter", "Dart", "React Native", "Cryptography", "Mobile release", "Firebase"],
    highlight: "100K+ public Android downloads; offline-first security UX",
    evidence: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.frostbyte.app.frostbyte" },
      { label: "App Store", href: "https://apps.apple.com/us/app/frostbyte-app/id1594909728" },
      { label: "How it works", href: "https://www.frostbyte.app/how-it-works" },
    ],
    cover: { from: "#0f172a", to: "#164e63", accent: "#7dd3fc", shape: "vault" },
  },
  {
    title: "OroboPay",
    slug: "orobopay",
    role: "Fintech product engineering",
    kind: "client",
    description:
      "Cross-border digital financial services for African payments, bill payment, mobile money, cards, and business batch payment workflows. A product where trust, auditability, and operational clarity matter more than novelty.",
    proof: [
      "Public site describes cross-border payments across Africa, the US, Europe, and Asia.",
      "The platform claims RBAC, audit capability, regulated transactions, and PCI DSS alignment.",
      "Good portfolio signal because it shows practical financial workflows, not only crypto-native systems.",
    ],
    tech: ["Fintech", "Payments", "RBAC", "Audit trails", "Mobile money", "Merchant workflows"],
    highlight: "Regulated payment workflows across African corridors",
    evidence: [
      { label: "OroboPay site", href: "http://orobopay.com/" },
      { label: "OroboPay FAQs", href: "http://orobopay.com/faqs.html" },
      { label: "OpenWay coverage", href: "https://paymentsindustryintelligence.com/orobo-and-openway-to-power-cross-border-money-transfers/" },
    ],
    cover: { from: "#422006", to: "#854d0e", accent: "#facc15", shape: "ledger" },
  },
  {
    title: "Clinic-MS",
    slug: "clinic-ms",
    role: "Product engineer for clinical operations",
    kind: "client",
    description:
      "A clinic operations product for the messy middle of care: keeping front desk, clinicians, dispensary, finance, theatre, and patients aligned without making staff fight the software.",
    proof: [
      "Turned day-to-day clinic work into role-aware flows: booking, queueing, consultation notes, prescriptions, invoices, surgery scheduling, stock, reports, and a patient portal.",
      "Built an in-app change-request loop so staff can ask for fixes from inside the product, get preview builds, and track the request back to merge without leaving operations.",
      "Focused reliability where real clinics feel pain: access control, patient-file retention, deletion paths, slow-network feedback, noisy error filtering, and regression coverage around fragile workflows.",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Chakra UI", "Supabase", "RLS", "Vitest", "Sentry"],
    highlight: "Clinic ops + AI-assisted change requests",
    evidence: [{ label: "Private GitHub repo", href: "https://github.com/DarksightKellar/clinic-ms" }],
    cover: { from: "#052e2b", to: "#155e75", accent: "#67e8f9", shape: "pulse" },
  },
  {
    title: "Post-Mortem AI video pipeline",
    slug: "post-mortem",
    role: "Solo engineer",
    kind: "personal",
    description:
      "An automation pipeline that ingests Reddit discussions, produces scripts, generates narrated audio, renders captioned videos, and packages the result as a repeatable content system.",
    proof: [
      "Public GitHub activity shows recent commits to DarksightKellar/post-mortem.",
      "Locally developed with strict TDD around pipeline stages and media rendering contracts.",
      "It is a strong signal for turning messy, multi-stage workflows into observable machinery.",
    ],
    tech: ["Python", "FFmpeg", "TTS", "YouTube API", "pipeline testing", "automation"],
    highlight: "A product-shaped automation engine, not a toy script",
    evidence: [{ label: "GitHub repo", href: "https://github.com/DarksightKellar/post-mortem" }],
    cover: { from: "#1e1b4b", to: "#581c87", accent: "#e879f9", shape: "pulse" },
  },
  {
    title: "Furoo",
    slug: "furoo",
    role: "Founder / product engineer",
    kind: "product",
    description:
      "A mobile-first Flutter product for learning how time actually gets spent. The build is intentionally boring in the right places: clean architecture, strict tests, and no placeholder paths masquerading as progress.",
    proof: [
      "MVP scope is Learn Mode: logging what happened, not bloated task-management theatre.",
      "Architecture work emphasizes durable local data shape and future sync without leaking vendor semantics into domain rules.",
      "This reflects how I like to build: narrow the product, protect the core, and make correctness cheap to verify.",
    ],
    tech: ["Flutter", "Dart", "Drift", "Clean Architecture", "TDD", "Mobile UX"],
    highlight: "A personal product shaped by unusually strict delivery standards",
    evidence: [
      { label: "Local product context", href: "https://github.com/DarksightKellar" },
      { label: "Portfolio repo", href: "https://dskellar.netlify.app" },
    ],
    cover: { from: "#022c22", to: "#065f46", accent: "#6ee7b7", shape: "timeline" },
  },
  {
    title: "Vienne Attire",
    slug: "vienne-attire",
    role: "Solo product engineer",
    kind: "product",
    description:
      "A production-minded e-commerce system for handmade Ghanaian dresses: product presentation, ordering, payments, admin flows, and the operational seams behind a small brand.",
    proof: [
      "Local README describes a production-ready e-commerce platform built with Next.js 16, Chakra UI v3, Supabase, and Stripe.",
      "Relevant because it shows product taste and business workflow thinking, not just infrastructure work.",
    ],
    tech: ["Next.js 16", "TypeScript", "Chakra UI", "Supabase", "Stripe", "Framer Motion"],
    highlight: "A real business product, not just portfolio garnish",
    evidence: [{ label: "GitHub repo", href: "https://github.com/DarksightKellar/vienne-dresses" }],
    cover: { from: "#3f1d2d", to: "#7f1d1d", accent: "#f9a8d4", shape: "atelier" },
  },
];

export const openSourceSignals = [
  {
    repo: "sarcophagus-org/sarcophagus-v2-app",
    note: "Top contributor on the public V2 interface repository for a decentralized Ethereum/Arweave dead man's switch.",
    href: "https://github.com/sarcophagus-org/sarcophagus-v2-app",
  },
  {
    repo: "sarcophagus-org/sarcophagus-v2-contracts",
    note: "Top contributor on the public V2 contracts repository: TypeScript deployment/testing plus Solidity contracts.",
    href: "https://github.com/sarcophagus-org/sarcophagus-v2-contracts",
  },
  {
    repo: "decentdao/decent-contracts",
    note: "Contributor to Azorius / Decent governance contracts for Safe-based composable DAO execution.",
    href: "https://github.com/decentdao/decent-contracts",
  },
  {
    repo: "DarksightKellar/cardano_wallet_sdk",
    note: "Dart SDK for Flutter apps managing Cardano accounts and blockchain transactions.",
    href: "https://github.com/DarksightKellar/cardano_wallet_sdk",
  },
  {
    repo: "DarksightKellar/absinthe_socket",
    note: "Dart client for GraphQL subscriptions over Absinthe sockets.",
    href: "https://github.com/DarksightKellar/absinthe_socket",
  },
  {
    repo: "DarksightKellar/miniapps_proof_of_concept",
    note: "Flutter container proof-of-concept for loading external mini-app packages.",
    href: "https://github.com/DarksightKellar/miniapps_proof_of_concept",
  },
];

export const experiences = [
  {
    company: "Decent Labs / Decent DAO",
    role: "Senior software + contracts engineer",
    period: "2021 – 2025",
    highlights: [
      "Built across DAO governance, Safe modules, gasless voting, protocol interfaces, and smart-contract integration.",
      "Contributed publicly to Decent and Sarcophagus repositories used by real Web3 products.",
      "Operated in the messy middle between product requirements, adversarial systems, and user-facing flows.",
    ],
  },
  {
    company: "FrostByte",
    role: "Lead mobile engineer",
    period: "2021 – 2022",
    highlights: [
      "Led mobile work for offline-first secret management across iOS and Android.",
      "Worked on security-shaped UX where ordinary users need safe defaults without understanding every cryptographic detail.",
      "Public store presence shows 100K+ Android downloads and active app listings.",
    ],
  },
  {
    company: "GeoCEMSLab / OroboPay / Postagraph",
    role: "Full-stack and product engineer",
    period: "2018 – 2021",
    highlights: [
      "Built practical business software in fintech, scheduling, and blockchain-adjacent product work.",
      "Worked close to operational requirements: roles, audit trails, payments, dashboards, and workflow correctness.",
      "Developed the habit that still defines my work: make the system explicit enough that teams can operate it under pressure.",
    ],
  },
];
