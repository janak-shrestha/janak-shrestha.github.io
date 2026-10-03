import type { ReactNode } from "react";

export type ChangeKind = "feat" | "ops" | "sec" | "perf";

export interface Release {
  ver: string;
  latest?: boolean;
  date: string;
  title: string;
  company: string;
  location: string;
  tag?: string;
  summary: string;
  /** Changes shown before "show more". */
  visible?: number;
  changes: { kind: ChangeKind; text: string }[];
  stack?: string[];
}

export interface Post {
  cover: "eks" | "pci" | "monolith" | "oncall" | "logging" | "sdn";
  tag: string;
  state: { label: string; tone?: "review" | "draft" };
  title: string;
  summary: string;
}

const en = {
  meta: {
    home: {
      title: "Janak Shrestha · Engineering Manager",
      description:
        "Janak Shrestha is an Engineering Manager at Unzer in Munich, with a decade of SRE experience building reliable, PCI-DSS compliant Kubernetes platforms on AWS for fintech.",
    },
    about: { title: "About", description: "About Janak Shrestha: background, principles and education of a Munich-based Engineering Manager and former Staff SRE." },
    experience: { title: "Experience", description: "Career changelog of Janak Shrestha: Unzer, Wirecard, Qualcomm, Huawei European Research Center and Websurfer Nepal." },
    stack: { title: "Stack", description: "Tools, platforms and certifications: AWS, Kubernetes, Terraform, Argo CD, Datadog, CKA, CKAD, RHCE and more." },
    blog: { title: "Blog", description: "Field notes on SRE, Kubernetes, Terraform and on-call from Janak Shrestha. The first posts are coming soon." },
    contact: { title: "Contact", description: "Get in touch with Janak Shrestha about engineering leadership, SRE, platform engineering and Kubernetes." },
    notFound: { title: "Page not found", description: "This page does not exist." },
  },

  nav: { "": "Index", about: "About", experience: "Experience", stack: "Stack", blog: "Blog", contact: "Contact" },

  ui: {
    skip: "Skip to content",
    brandAria: "Janak Shrestha, home",
    brandRole: "Engineering Manager · Unzer",
    navAria: "Primary",
    mobileNav: "Mobile",
    themeToggle: "Toggle colour theme",
    openMenu: "Open menu",
    switchAria: "Diese Seite auf Deutsch lesen",
    city: "Munich, Germany",
    ctaHeading: <>Let&rsquo;s keep it <em>running.</em></>,
    ctaButton: "Open a ticket",
    status: "Status",
    operational: "Operational: Engineering Manager at Unzer, Munich.",
    uptime: "Career uptime:",
    pages: "Pages",
    elsewhere: "Elsewhere",
    resources: "Resources",
    cvDownload: "Download CV (PDF)",
    email: "Email",
    rights: "All rights reserved",
    coords: "Munich, Germany · 48.137° N, 11.575° E",
    copy: "Copy",
    copied: "Copied",
    sending: "Sending message…",
    sent: "✓ Delivered. I'll get back to you soon.",
    sentToast: "Message delivered",
    failed: "Delivery failed. Please email me directly.",
    collapse: "Collapse changes",
    showMore: (n: number) => `Show ${n} more change${n === 1 ? "" : "s"}`,
    clockUnits: ["y", "d", "h", "m", "s"],
  },

  home: {
    eyebrow: "Engineering Manager — Munich",
    edition: "Portfolio · Vol. 2026",
    titleLead: "Keeping fintech",
    titleIndent: "platforms",
    swap: ["reliable.", "observable.", "compliant.", "automated."],
    intro: (
      <>
        I&rsquo;m <strong>Janak Shrestha</strong>, Engineering Manager at <strong>Unzer</strong>. Before leading the team, I spent years as a
        hands-on SRE: designing and running AWS and Kubernetes platforms for payments, codifying the infrastructure in Terraform and keeping the pager quiet at 3&nbsp;a.m.
      </>
    ),
    ctaPrimary: "Read the changelog",
    ctaCv: "Download CV",
    card: {
      aria: "Career at a glance",
      label: "Time in IT · live",
      units: ["years", "days", "hours", "min", "sec"],
      note: "Counting since my first sysadmin job in Kathmandu, March 2013.",
      rows: [
        ["Now", "Engineering Manager at Unzer"],
        ["Based in", "Munich, Germany"],
        ["Focus", "Platform teams · Kubernetes · AWS"],
      ] as [string, string][],
    },
    band: {
      aria: "Photo: Eibsee below the Zugspitze",
      alt: "Janak sitting on a rock at the frozen Eibsee, pointing at the Zugspitze massif",
      caption: <>Calm systems, <em>clear</em> heads, high peaks.</>,
      place: "Eibsee · Bavaria · 47.45° N",
    },
    numbers: {
      num: "(01) — By the numbers",
      title: <>A decade of <em>production</em>.</>,
      lead: "From racking RHEL servers in Kathmandu to running PCI-DSS Kubernetes in Germany, the job has always been the same: keep critical systems up, and make them easier to run each year.",
      stats: [
        { n: 10, plus: true, text: "Amazon EKS clusters built, including PCI-DSS compliant ones" },
        { n: 500, plus: true, text: "Linux VMs provisioned and managed in a private data centre" },
        { n: 100, plus: true, text: "Applications run across on-prem and AWS environments" },
        { n: 9, plus: false, text: "Industry certifications, including CKA, CKAD and RHCE" },
      ],
    },
    services: {
      num: "(02) — Services",
      title: <>What I <em>run</em> for teams.</>,
      lead: "Hover a row to expand it. Each one is something I've built and been on call for in production.",
      rows: [
        { title: "Container orchestration", text: "Production-grade Amazon EKS from sandbox to prod, with reusable Terraform modules, Helm charts and Argo CD GitOps. I've migrated on-premises monoliths to microservices and built PCI-DSS compliant clusters for payments.", tags: ["EKS", "Helm", "Argo CD", "PCI-DSS"] },
        { title: "Infrastructure as code", text: "AWS infrastructure provisioned entirely from Terraform, with Ansible and Puppet for configuration. Environments are reproducible, reviewed and auditable, and no one clicks around in the console.", tags: ["Terraform", "AWS", "Ansible", "Puppet"] },
        { title: "Observability & on-call", text: "Datadog APM and agents rolled out via Terraform, OpenSearch central logging with Fluentd, and Opsgenie rotations with clear runbooks. Incidents end in root-cause analysis, not guesswork.", tags: ["Datadog", "OpenSearch", "Fluentd", "Opsgenie"] },
        { title: "CI/CD consolidation", text: "I consolidate scattered CI/CD tools, registries, SCM and code review into one secure toolchain, and automate tests, releases and deployments so fewer steps need a human.", tags: ["GitLab CI", "GitHub Actions", "Jenkins", "Nexus · ECR"] },
      ],
    },
    now: {
      eyebrow: "Currently",
      title: <>Now <em>leading</em> at Unzer.</>,
      meta: "Engineering Manager · Munich · since 04/2026",
      heading: "From building the platform to leading the team behind it.",
      text: "After five and a half years at Unzer as a Senior and then Staff SRE, I moved into engineering management in April 2026. As an SRE there, I shipped:",
      list: [
        "Reusable Terraform modules for EKS across sandbox, dev, int, test and prod",
        "A consolidated CI/CD, registry and SCM toolchain for security and visibility",
        "PCI-DSS compliant infrastructure, with technical scoping certified in 2025",
      ],
    },
    index: {
      num: "(03) — Index",
      title: <>Keep <em>exploring</em>.</>,
      aria: "Site sections",
      cards: {
        about: ["The person", "Background, principles, education"],
        experience: ["The changelog", "Seven releases since 2013"],
        stack: ["The toolbox", "Tools & certifications"],
        blog: ["The notes", "Field notes, coming soon"],
        contact: ["The pager", "Open a ticket with me"],
        cv: ["The résumé", "Download the full CV"],
      },
    },
  },

  about: {
    eyebrow: "02 — About",
    meta: "Munich, Germany · from Nepal",
    title: <>Engineer of <em>quiet</em> pagers.</>,
    lead: "I've worked in telecom, banking and payments, and in every role I've kept critical systems running and made them easier to operate. Today I lead the engineers who do the same.",
    photoAlt: "Janak at the frozen Eibsee in front of the Zugspitze",
    photoCaption: "Eibsee, Bavaria · hover for colour",
    facts: [
      ["Role", "Engineering Manager"],
      ["Company", "Unzer, Munich"],
      ["Domain", "Fintech · payments · card issuing"],
      ["Languages", "English, German, Nepali"],
      ["In ops since", "2013"],
    ] as [string, string][],
    prose: [
      "I'm a self-driven, problem-solving engineer with a passion for cloud computing and Kubernetes. I take charge of complex assignments and enjoy delivering high-quality implementations, and today I help a team do exactly that.",
      "My path started in 2013 as a system administrator at Websurfer Nepal, running RHEL and CentOS servers for DNS, mail, LDAP and databases, and setting up network monitoring with Nagios, Cacti and OpenNMS. I then moved to Germany for a Master's in Information & Communication Engineering. For my thesis at the Huawei European Research Center in Munich, I extended the open-source SDN emulator Mininet to run Docker containers as network functions.",
      "Next came Qualcomm, where I field-tested LTE modems across Europe with Ericsson, Huawei and Nokia infrastructure. Then I moved into fintech at Wirecard. There I managed 500+ Linux VMs and 200+ EC2 instances behind a card-issuing platform, then joined the SRE team to automate away operational toil.",
      "In 2020 I joined Unzer as a Senior SRE and later became Staff SRE. I built reusable Terraform modules for Amazon EKS, migrated monoliths to microservices, rolled out Datadog APM and OpenSearch logging, and kept PCI-DSS compliant infrastructure running. In April 2026 I became Engineering Manager.",
      "I work closely with developers and cloud engineers. I write things down as SOPs and runbooks, and I don't consider a problem solved until we've fixed its root cause.",
    ],
    cvButton: "Download CV",
    principles: {
      num: "(01) — Operating principles",
      title: <>How I <em>work</em>.</>,
      lead: "Four habits from more than a decade of keeping production up.",
      items: [
        ["Everything as code", "Infrastructure, pipelines and alerts live in Git, are reviewed like application code and can be rebuilt from scratch."],
        ["Automate the toil", "If a task comes up twice, I write a script for it. The third time, it gets a pipeline."],
        ["Root cause over blame", "Incidents are for learning. Every post-mortem ends with a fix to the system, not to a person."],
        ["Secure by default", "I build compliance (PCI-DSS) into the platform from the start, so audits confirm what's already there."],
      ] as [string, string][],
    },
    education: {
      num: "(02) — Education",
      title: <>Where it <em>started</em>.</>,
      items: [
        { meta: "2014 — 2016 · Friedberg, Germany", title: "M.Sc. Information & Communication Engineering", text: "Technische Hochschule Mittelhessen (THM). Presented a scientific research paper on OpenStack cloud computing (2015). Wrote my thesis at the Huawei European Research Center on SDN and container networking.", mark: "M.Sc" },
        { meta: "Nepal", title: "B.Eng. Electronics & Communication Engineering", text: "Foundations in networking, signals and systems, which led to my first role as a system administrator in Kathmandu.", mark: "B.Eng" },
      ],
    },
  },

  experience: {
    eyebrow: "03 — Experience",
    meta: "CHANGELOG.md · 7 releases · 2013 → today",
    title: <>The career <em>changelog</em>.</>,
    lead: "Each role is a release, newest first. Every change is tagged by type.",
    legend: { feat: "built something new", ops: "operations & reliability", sec: "security & compliance", perf: "efficiency & automation" },
    releases: [
      {
        ver: "v7.0 · latest", latest: true, date: "04/2026 — present", title: "Engineering Manager", company: "Unzer", location: "Munich",
        tag: "Staff SRE → Engineering Manager",
        summary: "After five and a half years as an SRE at Unzer, I moved into engineering management. I now lead the engineers who build and run the platform.",
        changes: [{ kind: "feat", text: "Promoted from Staff SRE to Engineering Manager" }],
      },
      {
        ver: "v6.0", date: "09/2020 — 03/2026", title: "Staff Site Reliability Engineer", company: "Unzer", location: "Munich / Heidelberg",
        tag: "Senior SRE → Staff SRE",
        summary: "I owned platform reliability for a European payments company. I joined as a Senior SRE and was promoted to Staff, where I set direction for cloud infrastructure, tooling and compliance.",
        visible: 5,
        changes: [
          { kind: "feat", text: "Reusable Terraform module for Amazon EKS, deployed across sandbox, dev, int, test and production" },
          { kind: "feat", text: "Migrated on-premises monolithic services to microservices on EKS" },
          { kind: "sec", text: "Set up infrastructure that meets the PCI-DSS standard" },
          { kind: "perf", text: "Consolidated CI/CD tools, registry, SCM and code review to improve security and visibility and cut operational overhead" },
          { kind: "ops", text: "Rolled out Datadog APM via Terraform, including agent integration" },
          { kind: "feat", text: "Built OpenSearch central logging with Fluentd integration" },
          { kind: "feat", text: "Wrote Helm charts for microservices and released them through Argo CD" },
          { kind: "feat", text: "Provisioned AWS cloud infrastructure entirely through Terraform" },
          { kind: "feat", text: "Set up Nexus and ECR as artifact repositories" },
          { kind: "ops", text: "Production on-call with Opsgenie, covering incident handling, problem investigation and RCA" },
          { kind: "ops", text: "Troubleshot service failures, configuration issues and CI/CD pipelines" },
          { kind: "perf", text: "Improved build processes to automate and streamline delivery" },
          { kind: "sec", text: "Ongoing system patching and standard operating procedures (SOPs)" },
        ],
        stack: ["AWS", "EKS", "Terraform", "Helm", "Argo CD", "Datadog", "OpenSearch", "Opsgenie"],
      },
      {
        ver: "v5.0", date: "01/2020 — 08/2020", title: "Site Reliability Engineer", company: "Wirecard Issuing Technologies", location: "Aschheim",
        summary: "I moved from application operations into SRE, focusing on architecture, cost and removing toil.",
        changes: [
          { kind: "perf", text: "Recommended architectural changes to improve efficiency, reliability and performance while reducing cost" },
          { kind: "perf", text: "Automated repetitive operational tasks" },
          { kind: "feat", text: "Planned, built and delivered several infrastructure projects" },
        ],
      },
      {
        ver: "v4.0", date: "09/2018 — 12/2019", title: "Application Engineer", company: "Wirecard Issuing Technologies", location: "Aschheim",
        summary: "DevOps and L3 support for a digital banking and card-issuing payment system, across a private data centre and AWS.",
        visible: 5,
        changes: [
          { kind: "ops", text: "Provisioned and managed applications on 500+ Linux VMs on-prem and 200+ EC2 instances in AWS" },
          { kind: "ops", text: "Ran 60+ applications in the data centre and 40+ in AWS across QA, test and prod" },
          { kind: "ops", text: "Weekly on-call rotation for production support and L3 incidents" },
          { kind: "sec", text: "Certificate management and security patching" },
          { kind: "ops", text: "Proactive monitoring with Checkmk and Datadog" },
          { kind: "feat", text: "Configured Spring Boot, Tomcat and WebLogic servers" },
          { kind: "feat", text: "High-availability Apache load balancers and rewrite rules" },
          { kind: "perf", text: "Shell scripting for Control-M jobs" },
          { kind: "feat", text: "Daily banking report jobs in SQL, plus DDL/DML operations with PL/SQL" },
          { kind: "ops", text: "Application releases and bug fixing with developers, log backup and archiving" },
          { kind: "ops", text: "SOP documentation in Confluence" },
        ],
        stack: ["AWS EC2", "Linux", "Apache", "Oracle", "Checkmk", "Datadog"],
      },
      {
        ver: "v3.0", date: "02/2017 — 06/2018", title: "System Administrator / Modem Test Engineer", company: "Qualcomm CDMA Technologies", location: "Sulzbach (Taunus)",
        summary: "I tested modems in the field across Europe on every generation of mobile network, from GSM to LTE-Advanced.",
        visible: 3,
        changes: [
          { kind: "ops", text: "Field tests on Ericsson, Huawei and Nokia infrastructure: GSM, GPRS, EDGE, UMTS, HSPA+, LTE and LTE-A" },
          { kind: "feat", text: "KPI management for modems, with log analysis and reporting" },
          { kind: "ops", text: "IMS functional testing, regression and field-stability tests" },
          { kind: "perf", text: "Bash scripts to automate test workflows" },
          { kind: "ops", text: "Worked with Qualcomm tools QXDM, APEX and QPST, and prepared devices (flashing, upgrades, calibration)" },
        ],
      },
      {
        ver: "v2.0", date: "01/2016 — 01/2017", title: "Master Thesis & Internship", company: "Huawei European Research Center", location: "Munich",
        summary: "I researched software-defined networking and container networking, and contributed to an open-source emulator.",
        changes: [
          { kind: "feat", text: "Extended the open-source SDN emulator Mininet in Python" },
          { kind: "feat", text: "Deployed Docker containers as data-plane nodes across Mininet network topologies" },
          { kind: "feat", text: "Emulated containers as Open vSwitch for network-function placement and SDN controller nodes" },
          { kind: "feat", text: "Connected containers on different physical servers over SSH Layer-2 tunnels" },
        ],
        stack: ["Python", "Docker", "Mininet", "Open vSwitch", "SDN"],
      },
      {
        ver: "v1.0", date: "03/2013 — 08/2014", title: "System Administrator", company: "Websurfer Nepal Communication System", location: "Kathmandu, Nepal",
        summary: "My first production role, where I ran an ISP's Linux server estate end to end.",
        changes: [
          { kind: "ops", text: "Installed, tuned, patched and troubleshot RHEL and CentOS servers for DNS, Apache, mail, MySQL, LDAP and file serving" },
          { kind: "feat", text: "Network monitoring with MRTG, Cacti, Nagios and OpenNMS" },
          { kind: "feat", text: "KVM virtualization, backup and logging solutions" },
          { kind: "sec", text: "Firewall configuration and shell scripting" },
        ],
        stack: ["RHEL", "CentOS", "KVM", "Nagios", "Bash"],
      },
    ] as Release[],
  },

  stack: {
    eyebrow: "04 — Stack",
    meta: "9 domains · 40+ tools · 9 certifications",
    title: <>The <em>toolbox</em>, by domain.</>,
    lead: (core: ReactNode) => <>These are the tools I have used in production, research or both. Tools marked with a dot {core} are the ones I use every day.</>,
    coreLabel: "core",
    filterAria: "Filter domains",
    filters: { all: "All", platform: "Platform", delivery: "Delivery", observe: "Observability", systems: "Systems" },
    categories: {
      cloud: ["Cloud", "AWS infrastructure for regulated payments workloads."],
      containers: ["Containers", "Orchestration and packaging for microservices."],
      iac: ["Infrastructure as code", "Reproducible, reviewed environments."],
      cicd: ["CI/CD & GitOps", "From commit to cluster, with minimal manual steps."],
      scm: ["SCM & artifacts", "Source and binaries, consolidated and secured."],
      monitoring: ["Monitoring & on-call", "Metrics, APM and alerting that reach the right person."],
      logging: ["Logging", "Centralised, searchable logs for every service."],
      os: ["Operating systems & web", "The layer everything else runs on."],
      scripting: ["Scripting & data", "Glue code, automation and databases."],
    } as Record<string, [string, string]>,
    certs: {
      num: "(02) — Certifications",
      title: <>Certified, <em>verifiably</em>.</>,
      lead: "Kubernetes, Linux, networking, databases and compliance. Hover a seal to spin it.",
      names: {
        "PCI DSS": "Technical Scoping for Admins · 2025",
        CKA: "Certified Kubernetes Administrator",
        CKAD: "Certified Kubernetes Application Developer",
        RHCE: "Red Hat Certified Engineer",
        RHCSA: "Red Hat Certified System Administrator",
        CCNP: "Cisco Certified Network Professional",
        CCNAS: "CCNA Security",
        CCNA: "Cisco Certified Network Associate",
        "Oracle 11g": "Oracle Database 11g Administrator",
      } as Record<string, string>,
    },
  },

  blog: {
    eyebrow: "05 — Blog",
    status: "Status: drafting · first post soon",
    title: <>Field notes, <em>compiling</em>.</>,
    lead: "The blog is coming soon. I'm writing up lessons from more than a decade in production: Kubernetes, Terraform, compliance, the human side of on-call, and now the move into engineering management. The first post is in review.",
    pipeline: {
      aria: "Publishing pipeline: outline and draft passed, review running, publish queued",
      name: "pipeline · blog/first-post",
      run: "run #001",
      stages: [
        ["Outline", "passed", "done"],
        ["Draft", "passed", "done"],
        ["Review", "running…", "run"],
        ["Publish", "queued", "wait"],
      ] as [string, string, "done" | "run" | "wait"][],
    },
    queue: {
      num: "(01) — In the queue",
      title: <>What&rsquo;s <em>coming</em>.</>,
      lead: "These topics are on my desk right now. Titles may change before they ship.",
    },
    posts: [
      { cover: "eks", tag: "Kubernetes · Terraform", state: { label: "In review", tone: "review" }, title: "One Terraform module, five EKS environments", summary: "How one reusable module keeps sandbox, dev, int, test and prod consistent, and what I'd do differently today." },
      { cover: "pci", tag: "Compliance", state: { label: "Drafting", tone: "draft" }, title: "PCI-DSS on Kubernetes, without the panic", summary: "Scoping, network segmentation and evidence collection for card-data workloads on EKS." },
      { cover: "monolith", tag: "Architecture", state: { label: "Drafting", tone: "draft" }, title: "Monolith to microservices, no big bang", summary: "Lessons from moving on-premises payment services to EKS one slice at a time." },
      { cover: "oncall", tag: "Reliability", state: { label: "Outlined" }, title: "On-call that doesn't burn people out", summary: "Alert hygiene, runbooks and rotations that keep pagers quiet and people rested." },
      { cover: "logging", tag: "Observability", state: { label: "Outlined" }, title: "Central logging with OpenSearch and Fluentd", summary: "Building a log pipeline that teams actually search, and keeping its cost under control." },
      { cover: "sdn", tag: "Networking", state: { label: "Planned" }, title: "From Mininet to Kubernetes networking", summary: "What my thesis on SDN and containers taught me about networking inside clusters today." },
    ] as Post[],
    notify: {
      eyebrow: "Get notified",
      title: <>Be the first to <em>read</em> it.</>,
      text: "I'll send one email when the first post goes live. No newsletter, no spam.",
      label: "Your email address",
      button: "Notify me",
      success: "✓ You're on the list. Thanks!",
    },
  },

  contact: {
    eyebrow: "06 — Contact",
    title: <>Open a <em>ticket</em>.</>,
    lead: "Do you have a platform to stabilise, a team to grow or a role to fill? Send me a message. I read every one.",
    direct: "Direct line",
    facts: [
      ["Based in", "Munich, Bavaria, Germany"],
      ["Open to", "Engineering leadership, SRE & platform topics, speaking"],
      ["Languages", "English · Deutsch · नेपाली"],
    ] as [string, string][],
    socialsAria: "Social profiles",
    topicsLegend: "What's this about?",
    topics: ["Role / hiring", "Consulting", "Speaking", "Just saying hi"],
    name: "Your name",
    email: "Email address",
    subject: "Subject",
    message: "Message",
    send: "Send message",
  },

  notFound: {
    eyebrow: "Incident · Sev-4 · Page not found",
    text: "This route returned no healthy upstream. The on-call engineer has been paged, but the quickest fix is to head home.",
    home: "Back to index",
    report: "Report it",
  },
};

export default en;
export type Dictionary = typeof en;
