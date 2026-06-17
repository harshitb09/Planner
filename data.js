// ── STATIC DATA ──

const PHD_PROGRAMS = [
  {
    name: "ETH Zurich — Data Science",
    country: "ch", flag: "🇨🇭",
    tags: ["Data Science", "ML", "Top 10 World"],
    deadline: "Dec 15, 2025",
    url: "https://inf.ethz.ch/doctorate.html",
    field: "phd"
  },
  {
    name: "EPFL — Digital Humanities & AI",
    country: "ch", flag: "🇨🇭",
    tags: ["AI", "Data Science", "Rolling"],
    deadline: "Jan 15, 2026",
    url: "https://www.epfl.ch/education/phd/",
    field: "phd"
  },
  {
    name: "TU Munich — Informatics (AI)",
    country: "de", flag: "🇩🇪",
    tags: ["AI/ML", "Informatics", "Excellence"],
    deadline: "Jan 31, 2026",
    url: "https://www.tum.de/en/studies/degree-programs/detail/doctor-of-informatics",
    field: "phd"
  },
  {
    name: "LMU Munich — Data Science",
    country: "de", flag: "🇩🇪",
    tags: ["Statistics", "Data Science"],
    deadline: "Feb 28, 2026",
    url: "https://www.en.statistik.uni-muenchen.de/phd/",
    field: "phd"
  },
  {
    name: "Heidelberg University — ML",
    country: "de", flag: "🇩🇪",
    tags: ["Machine Learning", "Bioinformatics"],
    deadline: "Mar 1, 2026",
    url: "https://www.uni-heidelberg.de/en/study/all-subjects/graduate-studies",
    field: "phd"
  },
  {
    name: "KIT — Cybersecurity",
    country: "de", flag: "🇩🇪",
    tags: ["Cybersecurity", "Security"],
    deadline: "Ongoing",
    url: "https://www.kit.edu/english/",
    field: "phd"
  },
  {
    name: "University of Zurich — Informatics",
    country: "ch", flag: "🇨🇭",
    tags: ["Computer Science", "ML"],
    deadline: "Rolling",
    url: "https://www.ifi.uzh.ch/en.html",
    field: "phd"
  },
  {
    name: "TU Berlin — Data Science",
    country: "de", flag: "🇩🇪",
    tags: ["Data Engineering", "Smart Systems"],
    deadline: "Apr 30, 2026",
    url: "https://www.tu.berlin/en/studying/study-programs/all-programs-offered/study-course/data-science-m-sc",
    field: "phd"
  },
  {
    name: "Delft University — Cyber Security",
    country: "nl", flag: "🇳🇱",
    tags: ["Cybersecurity", "AI Safety"],
    deadline: "Jan 15, 2026",
    url: "https://www.tudelft.nl/en/eemcs/research/groups/cyber-security",
    field: "phd"
  },
  {
    name: "KTH Royal Institute — ML",
    country: "se", flag: "🇸🇪",
    tags: ["Machine Learning", "Robotics"],
    deadline: "Feb 15, 2026",
    url: "https://www.kth.se/en/studies/phd",
    field: "phd"
  }
];

const JOB_POSTINGS = [
  {
    name: "SAP — Data Scientist (AI)",
    country: "de", flag: "🇩🇪",
    tags: ["Remote OK", "Python", "ML"],
    deadline: "Ongoing",
    url: "https://jobs.sap.com",
    field: "jobs"
  },
  {
    name: "Google Zurich — Research Scientist",
    country: "ch", flag: "🇨🇭",
    tags: ["NLP", "ML Research"],
    deadline: "Rolling",
    url: "https://careers.google.com",
    field: "jobs"
  },
  {
    name: "Siemens AG — Cybersecurity Engineer",
    country: "de", flag: "🇩🇪",
    tags: ["Security", "Munich"],
    deadline: "Ongoing",
    url: "https://jobs.siemens.com",
    field: "jobs"
  },
  {
    name: "Swiss Re — Data Science Lead",
    country: "ch", flag: "🇨🇭",
    tags: ["Fintech", "Analytics"],
    deadline: "Rolling",
    url: "https://careers.swissre.com",
    field: "jobs"
  },
  {
    name: "Bosch — AI Research Engineer",
    country: "de", flag: "🇩🇪",
    tags: ["Embedded AI", "Stuttgart"],
    deadline: "Ongoing",
    url: "https://jobs.bosch.com",
    field: "jobs"
  },
  {
    name: "CERN — Software / Data Engineer",
    country: "ch", flag: "🇨🇭",
    tags: ["Big Data", "Scientific"],
    deadline: "Rolling",
    url: "https://careers.cern.ch",
    field: "jobs"
  },
  {
    name: "Fraunhofer IIS — Security Researcher",
    country: "de", flag: "🇩🇪",
    tags: ["Research", "Applied Security"],
    deadline: "Ongoing",
    url: "https://www.fhg.de/en/jobs",
    field: "jobs"
  },
  {
    name: "ABB — Data Science Specialist",
    country: "ch", flag: "🇨🇭",
    tags: ["Industrial AI", "Zurich"],
    deadline: "Ongoing",
    url: "https://careers.abb.com",
    field: "jobs"
  }
];

const QUEST_TEMPLATES = [
  {
    category: "📜 DOCUMENTS & IDENTITY",
    items: [
      "Prepare Statement of Purpose (SOP)",
      "Update CV / academic resume",
      "Gather 3 letters of recommendation",
      "Obtain official transcripts (translated)",
      "German/Swiss certified translations ready",
      "Passport valid for 5+ years"
    ]
  },
  {
    category: "🎓 ACADEMIC PREPARATION",
    items: [
      "Identify target research groups",
      "Email potential supervisors (cold outreach)",
      "Research funding sources (DAAD, SNF)",
      "Prepare research proposal",
      "GRE/GMAT if required",
      "Language test: German B2 or English C1"
    ]
  },
  {
    category: "🛡️ CYBERSECURITY TRACK",
    items: [
      "CTF competitions (3+ platforms)",
      "Security certifications (CEH, OSCP)",
      "GitHub security projects portfolio",
      "Network with European security researchers"
    ]
  },
  {
    category: "📊 DATA SCIENCE TRACK",
    items: [
      "Kaggle competitions (top 10%)",
      "Published or in-progress paper",
      "Open source data project on GitHub",
      "Portfolio: 3 end-to-end ML projects"
    ]
  },
  {
    category: "🌍 LOGISTICS & VISA",
    items: [
      "Research German/Swiss visa requirements",
      "Open blocked account (Germany) or Swiss bank proof",
      "Health insurance research",
      "Housing in target cities"
    ]
  }
];

const RESOURCES = [
  { icon: "🎓", name: "DAAD Scholarships", desc: "Germany's academic exchange", url: "https://www.daad.de/en/" },
  { icon: "🔬", name: "SNF Swiss NSF", desc: "Swiss research funding", url: "https://www.snf.ch/en" },
  { icon: "🇩🇪", name: "Make it in Germany", desc: "Work visa & job portal", url: "https://www.make-it-in-germany.com" },
  { icon: "🇨🇭", name: "Academic Jobs Swiss", desc: "Swiss university positions", url: "https://www.academics.com/en/jobs/switzerland" },
  { icon: "📡", name: "Euraxess", desc: "EU researcher mobility", url: "https://euraxess.ec.europa.eu/" },
  { icon: "🔐", name: "ENISA Careers", desc: "EU Cybersecurity Agency", url: "https://www.enisa.europa.eu/about-enisa/jobs" },
  { icon: "📊", name: "Kaggle Jobs", desc: "Data science careers", url: "https://www.kaggle.com/jobs" },
  { icon: "🌐", name: "LinkedIn EU Jobs", desc: "DE/CH tech roles", url: "https://www.linkedin.com/jobs/data-scientist-jobs-germany/" }
];

const FORCE_TITLES = [
  { min: 0, title: "Youngling — Begin your quest" },
  { min: 10, title: "Initiate — The Force awakens" },
  { min: 25, title: "Padawan — Your training begins" },
  { min: 40, title: "Jedi Knight — Half the battle won" },
  { min: 60, title: "Jedi Master — Excellence in sight" },
  { min: 75, title: "Council Member — Near the pinnacle" },
  { min: 90, title: "Grand Master — May the Force be with you" },
  { min: 100, title: "Chosen One — Mission accomplished" }
];
