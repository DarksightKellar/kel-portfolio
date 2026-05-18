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
  title: "Builder for messy product systems",
  email: "kelvinklartey@gmail.com",
  phone: "+44 7944 702 387",
  github: "https://github.com/DarksightKellar",
  linkedin: "https://www.linkedin.com/in/kelvin-lartey-851a6996/",
  positioning:
    "Give me the rough version: the unclear idea, the brittle workflow, the bug that only appears when it matters. I turn it into shipped software with a debug trail.",
  summary:
    "I like the work before it has clean edges: vague product intent, brittle code, late-night production mysteries. I make the shape clear, test the risky parts, and leave the system easier to own.",
  availability:
    "Remote roles, serious contract builds, stabilization work, product-heavy debugging. If it is messy and important, send it.",
};

export const quickScanProof = [
  { label: "Bring me", value: "messy builds, weird bugs, brittle systems" },
  { label: "You get", value: "shipped software with a debug trail" },
  { label: "I work by", value: "reproduce, test, cut, ship" },
  { label: "Open for", value: "remote roles + serious contract builds" },
];

export const operatingPrinciples = [
  {
    title: "Verify before changing code",
    body:
      "Reproduce the issue, isolate the cause, add the failing test, then make the smallest safe fix.",
  },
  {
    title: "Turn unclear work into executable decisions",
    body:
      "I translate loose requirements into interfaces, acceptance criteria, tradeoffs, and working software.",
  },
  {
    title: "Leave systems easier to change",
    body:
      "Refactors are not cosmetic. They should reduce future mistakes, clarify ownership, or remove hidden coupling.",
  },
  {
    title: "Build for the person who inherits it",
    body:
      "Readable boundaries, boring verification, good names, and abstractions that match the real system.",
  },
  {
    title: "Surface risk while it is still cheap",
    body:
      "I raise weak assumptions early so teams can fix them before they become expensive.",
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
    category: "Web3 + security-sensitive systems",
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
      "A decentralized dead man's switch built on Ethereum and Arweave. My work sat across product UX, contract state, permanent storage, and adversarial failure modes.",
    proof: [
      "I was one of the top contributors on both the V2 app and contracts.",
      "The protocol protects information release through time-delayed, encrypted, on-chain conditions.",
      "I worked across frontend flows, contract integration, local development, and reliability.",
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
      "Governance software for groups managing shared funds and contract execution. The hard part is making voting, permissions, and execution flows clear enough that users approve the right action.",
    proof: [
      "I contributed to Decent's public governance contracts in decentdao/decent-contracts.",
      "Azorius is a Safe Zodiac module framework for modular DAO proposal and voting execution.",
      "Gasless voting documentation shows the product goal: reduce voter friction with shared paymaster funding.",
    ],
    tech: ["Solidity", "TypeScript", "Safe", "Zodiac", "Account abstraction", "Next.js"],
    highlight: "Safe-based DAO governance and proposal execution",
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
      "The core challenge was helping non-technical users store sensitive secrets safely without exposing them to cryptographic complexity.",
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
      "Cross-border financial workflows for African payments, mobile money, cards, bill pay, and business payouts. The product needed trust, auditability, and operational clarity more than novelty.",
    proof: [
      "Public site describes cross-border payments across Africa, the US, Europe, and Asia.",
      "Public materials describe RBAC, audit capability, regulated transactions, and PCI DSS alignment.",
      "Worked with practical financial workflows including roles, payments, audit trails, batch operations, and operational dashboards.",
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
      "A clinic operations product for the handoffs that usually break: front desk, clinicians, dispensary, finance, operating theatre, and patients.",
    proof: [
      "Turned day-to-day clinic work into role-aware flows: booking, queueing, consultation notes, prescriptions, invoices, surgery scheduling, stock, reports, and a patient portal.",
      "Built an in-app change-request loop so staff can report friction from inside the product, review fixes in preview builds, and keep operational feedback tied to delivery.",
      "Focused reliability where real clinics feel pain: access control, patient-file retention, deletion paths, slow-network feedback, noisy error filtering, and regression coverage around fragile workflows.",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Chakra UI", "Supabase", "RLS", "Vitest", "Sentry"],
    highlight: "Clinic operations with in-app change requests",
    evidence: [{ label: "Private repo - walkthrough available", href: "https://github.com/DarksightKellar/clinic-ms" }],
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
      "I build this in public at DarksightKellar/post-mortem.",
      "Locally developed with strict TDD around pipeline stages and media rendering contracts.",
      "Turns a loose, multi-stage content process into a repeatable pipeline with clear stages, tests, and failure points.",
    ],
    tech: ["Python", "FFmpeg", "TTS", "YouTube API", "pipeline testing", "automation"],
    highlight: "Repeatable automation pipeline for scripted video production",
    evidence: [{ label: "GitHub repo", href: "https://github.com/DarksightKellar/post-mortem" }],
    cover: { from: "#1e1b4b", to: "#581c87", accent: "#e879f9", shape: "pulse" },
  },
  {
    title: "Furoo",
    slug: "furoo",
    role: "Founder / product engineer",
    kind: "product",
    description:
      "A local-first Flutter product for understanding how time actually gets spent. The useful part is product restraint: narrow first version, durable data model, testable architecture, and a path to sync later.",
    proof: [
      "MVP scope is Learn Mode: logging what happened before expanding into planning or task management.",
      "Architecture work emphasizes durable local data shape and future sync without leaking vendor semantics into domain rules.",
      "Keeps the first version narrow, protects the core data model, and makes correctness cheap to verify.",
    ],
    tech: ["Flutter", "Dart", "Drift", "Clean Architecture", "TDD", "Mobile UX"],
    highlight: "Local-first mobile product with disciplined MVP scope",
    evidence: [{ label: "Private product - walkthrough available", href: "https://github.com/DarksightKellar" }],
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
      "Built a Next.js, Chakra UI, Supabase, and Stripe commerce application for catalog, checkout, admin, and order workflows.",
      "Shows product taste, business workflow thinking, and delivery beyond infrastructure work.",
    ],
    tech: ["Next.js 16", "TypeScript", "Chakra UI", "Supabase", "Stripe", "Framer Motion"],
    highlight: "Production-minded e-commerce for a real small business",
    evidence: [{ label: "GitHub repo", href: "https://github.com/DarksightKellar/vienne-dresses" }],
    cover: { from: "#3f1d2d", to: "#7f1d1d", accent: "#f9a8d4", shape: "atelier" },
  },
];

export const openSourceSignals = [
  {
    repo: "sarcophagus-org/sarcophagus-v2-app",
    note: "I was one of the top contributors on the V2 interface for a decentralized Ethereum/Arweave dead man's switch.",
    href: "https://github.com/sarcophagus-org/sarcophagus-v2-app",
  },
  {
    repo: "sarcophagus-org/sarcophagus-v2-contracts",
    note: "I was one of the top contributors on the V2 contracts repo: TypeScript deployment/testing plus Solidity contracts.",
    href: "https://github.com/sarcophagus-org/sarcophagus-v2-contracts",
  },
  {
    repo: "decentdao/decent-contracts",
    note: "I contributed to Azorius / Decent governance contracts for Safe-based composable DAO execution.",
    href: "https://github.com/decentdao/decent-contracts",
  },
  {
    repo: "DarksightKellar/cardano_wallet_sdk",
    note: "I built a Dart SDK for Flutter apps managing Cardano accounts and blockchain transactions.",
    href: "https://github.com/DarksightKellar/cardano_wallet_sdk",
  },
  {
    repo: "DarksightKellar/absinthe_socket",
    note: "I built a Dart client for GraphQL subscriptions over Absinthe sockets.",
    href: "https://github.com/DarksightKellar/absinthe_socket",
  },
  {
    repo: "DarksightKellar/miniapps_proof_of_concept",
    note: "I prototyped a Flutter container for loading external mini-app packages.",
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
      "Worked across product requirements, adversarial systems, and user-facing flows.",
    ],
  },
  {
    company: "FrostByte",
    role: "Lead mobile engineer",
    period: "2021 – 2022",
    highlights: [
      "Led mobile work for offline-first secret management across iOS and Android.",
      "Worked on security-sensitive UX where ordinary users need safe defaults without understanding every cryptographic detail.",
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
      "Made operational constraints explicit so teams could run the system under pressure.",
    ],
  },
];
