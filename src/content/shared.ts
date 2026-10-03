/** Facts that are the same in every language. */

export const person = {
  name: "Janak Shrestha",
  role: "Engineering Manager",
  company: "Unzer",
  email: "janak.shrestha25@gmail.com",
  cv: "/CV/Janak_Shrestha_CV.pdf",
  photo: "/images/profile.jpeg",
  /** First production role (Websurfer Nepal), the start of the career counter. */
  careerStart: "2013-03-01T09:00:00+01:00",
};

export const socials = [
  { name: "LinkedIn", handle: "/in/janak-shrestha", href: "https://de.linkedin.com/in/janak-shrestha" },
  { name: "GitHub", handle: "@janak-shrestha", href: "https://github.com/janak-shrestha" },
  { name: "Xing", handle: "Janak_Shrestha", href: "https://www.xing.com/profile/Janak_Shrestha" },
  { name: "X / Twitter", handle: "@janak_stha01", href: "https://twitter.com/janak_stha01" },
  { name: "Facebook", handle: "j.shrestha25", href: "https://www.facebook.com/j.shrestha25" },
];

export type StackGroup = "platform" | "delivery" | "observe" | "systems";

/** Tool categories. `core` tools are the daily drivers. Titles are translated per language by `id`. */
export const stack: { id: string; groups: StackGroup[]; tools: { name: string; core?: boolean }[] }[] = [
  { id: "cloud", groups: ["platform"], tools: [{ name: "AWS", core: true }, { name: "EKS", core: true }, { name: "EC2" }, { name: "ECR" }] },
  { id: "containers", groups: ["platform"], tools: [{ name: "Kubernetes", core: true }, { name: "Helm", core: true }, { name: "Docker" }, { name: "Open vSwitch" }] },
  { id: "iac", groups: ["platform", "delivery"], tools: [{ name: "Terraform", core: true }, { name: "Ansible" }, { name: "Puppet" }] },
  { id: "cicd", groups: ["delivery"], tools: [{ name: "Argo CD", core: true }, { name: "GitLab CI", core: true }, { name: "GitHub Actions" }, { name: "Jenkins" }, { name: "Bamboo" }] },
  { id: "scm", groups: ["delivery"], tools: [{ name: "GitLab", core: true }, { name: "GitHub" }, { name: "Nexus" }, { name: "ECR" }] },
  { id: "monitoring", groups: ["observe"], tools: [{ name: "Datadog", core: true }, { name: "Opsgenie", core: true }, { name: "Checkmk" }, { name: "Nagios" }, { name: "Cacti" }, { name: "OpenNMS" }] },
  { id: "logging", groups: ["observe"], tools: [{ name: "OpenSearch", core: true }, { name: "Fluentd" }, { name: "ELK" }] },
  { id: "os", groups: ["systems"], tools: [{ name: "RHEL" }, { name: "CentOS" }, { name: "Ubuntu" }, { name: "Apache" }, { name: "Tomcat" }, { name: "WebLogic" }, { name: "KVM" }] },
  { id: "scripting", groups: ["systems", "delivery"], tools: [{ name: "Bash", core: true }, { name: "Python" }, { name: "Oracle" }, { name: "MySQL" }, { name: "PL/SQL" }] },
];

/** Certifications. `ring` is the text running around the seal. */
export const certifications = [
  { code: "PCI DSS", ring: "usd AG · PCI DSS · Technical Scoping for Admins · 2025 ·", highlight: true },
  { code: "CKA", ring: "CNCF · Linux Foundation · Kubernetes Administrator ·" },
  { code: "CKAD", ring: "CNCF · Linux Foundation · Kubernetes App Developer ·" },
  { code: "RHCE", ring: "Red Hat · Certified Engineer · Linux · Automation ·" },
  { code: "RHCSA", ring: "Red Hat · Certified System Administrator · Linux ·" },
  { code: "CCNP", ring: "Cisco · Certified Network Professional · Routing ·" },
  { code: "CCNAS", ring: "Cisco Networking Academy · CCNA Security · Firewalls ·" },
  { code: "CCNA", ring: "Cisco · Certified Network Associate · Switching ·" },
  { code: "Oracle 11g", ring: "Oracle · Database 11g · Administrator · SQL ·" },
];
