// ── INTELLIGENCE FEED — Claude AI Powered ──

let allNewsItems = [];
let currentFilter = 'all';
let searchQuery = '';

async function fetchIntelligence() {
  const btn = document.querySelector('.btn-fetch');
  const feed = document.getElementById('news-feed');

  if (btn) btn.classList.add('loading');

  feed.innerHTML = `
    <div class="news-loading">
      <div class="loading-spinner"></div>
      <p>Scanning the galaxy for intelligence...</p>
    </div>`;

  try {
    const spec = document.getElementById('spec-select')?.value || 'ds';
    const target = document.getElementById('target-select')?.value || 'eu-all';

    const specLabel = spec === 'ds' ? 'Data Science' : spec === 'cyber' ? 'Cybersecurity' : 'Data Science and Cybersecurity';
    const targetLabel = target === 'de' ? 'Germany' : target === 'ch' ? 'Switzerland' : target === 'nl' ? 'Netherlands' : 'Europe (Germany, Switzerland)';

    const prompt = `You are an intelligence system for PhD applicants and job seekers in European universities.

Generate 10 realistic, helpful news items about:
- PhD program admissions in Europe (especially Germany and Switzerland) for ${specLabel}
- Job openings in ${targetLabel} in ${specLabel}
- Scholarship opportunities (DAAD, SNF, Erasmus, Marie Curie)
- Academic conferences and networking events
- Research trends in ${specLabel}
- Visa/work permit updates for researchers in Germany/Switzerland
- University rankings and program updates

Return ONLY a JSON array (no markdown, no explanation) in this exact format:
[
  {
    "title": "News headline",
    "summary": "2-3 sentence summary with actionable details",
    "category": "phd|jobs|de|ch|eu",
    "date": "2025-MM-DD or 2026-MM-DD",
    "url": "https://relevant-real-website.com",
    "source": "Source name"
  }
]

Make the news realistic and varied. Include real institutions like ETH Zurich, TU Munich, EPFL, KIT, LMU Munich, DAAD, etc. Dates should be recent (late 2025 or 2026). URLs should be real institution or portal URLs.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content?.find(c => c.type === 'text')?.text || '';

    // Parse JSON
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON found');
    const items = JSON.parse(jsonMatch[0]);

    allNewsItems = items;
    renderNews();
    showToast('Intelligence feed updated — 10 transmissions received');

  } catch (err) {
    console.error('News fetch failed:', err);
    // Fallback static news
    allNewsItems = getStaticNews();
    renderNews();
    showToast('Static archive loaded — connect API for live feed');
  }

  if (btn) btn.classList.remove('loading');
}

function renderNews() {
  const feed = document.getElementById('news-feed');
  feed.innerHTML = '';

  let items = allNewsItems;

  // Filter
  if (currentFilter !== 'all') {
    items = items.filter(item => item.category === currentFilter);
  }

  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    items = items.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      (item.source && item.source.toLowerCase().includes(q))
    );
  }

  if (items.length === 0) {
    feed.innerHTML = '<div class="news-loading"><p>No transmissions match your filters</p></div>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = `news-card cat-${item.category || 'general'}`;

    const BADGE_MAP = {
      phd: '<span class="news-badge badge-phd">PHD</span>',
      jobs: '<span class="news-badge badge-jobs">CAREER</span>',
      de: '<span class="news-badge badge-de">GERMANY</span>',
      ch: '<span class="news-badge badge-ch">SWISS</span>',
      eu: '<span class="news-badge badge-eu">EU</span>',
    };

    const badge = BADGE_MAP[item.category] || '<span class="news-badge badge-eu">INTEL</span>';
    const dateStr = item.date ? new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

    card.innerHTML = `
      <div class="news-meta">
        ${badge}
        ${item.source ? `<span style="font-family:monospace;font-size:10px;color:var(--text-muted)">${item.source}</span>` : ''}
        ${dateStr ? `<span class="news-date">${dateStr}</span>` : ''}
      </div>
      <div class="news-title">${escapeHtml(item.title)}</div>
      <div class="news-summary">${escapeHtml(item.summary)}</div>
      ${item.url ? `<a class="news-link" href="${item.url}" target="_blank">→ Read transmission</a>` : ''}
    `;

    feed.appendChild(card);
  });
}

function filterNews(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderNews();
}

function searchNews(query) {
  searchQuery = query;
  renderNews();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── STATIC FALLBACK NEWS ──
function getStaticNews() {
  return [
    {
      title: "ETH Zurich Opens PhD Applications in Computational Data Science",
      summary: "ETH Zurich's Department of Computer Science has launched its 2026 PhD intake with new positions in ML, privacy-preserving AI, and large-scale data systems. Stipends start at CHF 50,000/year. Deadline: December 15, 2025.",
      category: "ch",
      date: "2025-09-15",
      url: "https://inf.ethz.ch/doctorate.html",
      source: "ETH Zurich"
    },
    {
      title: "DAAD Scholarship Portal Now Accepting 2026 Research Grants",
      summary: "The German Academic Exchange Service is accepting applications for research grants targeting international PhD students in STEM fields. Grants cover living expenses, travel, and health insurance for Germany-based research programs.",
      category: "phd",
      date: "2025-10-01",
      url: "https://www.daad.de/en/",
      source: "DAAD"
    },
    {
      title: "TU Munich Recruiting Data Science PhD Students for AI Research Cluster",
      summary: "Technical University Munich announces openings in its AI research cluster with focus on responsible AI, federated learning, and healthcare analytics. Applications accepted rolling with priority deadline January 31, 2026.",
      category: "de",
      date: "2025-09-20",
      url: "https://www.tum.de",
      source: "TU Munich"
    },
    {
      title: "Google Zurich Expanding Machine Learning Research Team",
      summary: "Google's Zurich engineering hub is hiring senior data scientists and ML researchers with PhD or equivalent experience. Focus areas include NLP, recommender systems, and AI safety. Competitive Swiss salaries and relocation support.",
      category: "jobs",
      date: "2025-10-05",
      url: "https://careers.google.com",
      source: "Google"
    },
    {
      title: "Marie Skłodowska-Curie Fellowship Applications Open for EU Research",
      summary: "Horizon Europe's MSCA Doctoral Networks programme is accepting project proposals. Fellowships cover salary, research costs, and travel for PhD candidates across all European member states and associated countries including Switzerland.",
      category: "eu",
      date: "2025-09-28",
      url: "https://marie-sklodowska-curie-actions.ec.europa.eu/",
      source: "European Commission"
    },
    {
      title: "Germany Fast-Tracks EU Blue Card for Data Scientists",
      summary: "The German government has lowered salary thresholds for EU Blue Cards for data scientists and cybersecurity professionals. New minimum salary is €45,300 annually, making Germany more accessible for international tech talent.",
      category: "de",
      date: "2025-10-10",
      url: "https://www.make-it-in-germany.com",
      source: "Make it in Germany"
    },
    {
      title: "EPFL CyberSecurity PhD Program Accepting Applications",
      summary: "EPFL's School of Computer and Communication Sciences has opened PhD positions in cybersecurity, focusing on network security, cryptography, and AI-driven threat detection. Swiss doctoral stipend applies.",
      category: "ch",
      date: "2025-09-30",
      url: "https://www.epfl.ch/education/phd/",
      source: "EPFL"
    },
    {
      title: "Fraunhofer Society Hiring Applied AI Researchers in Germany",
      summary: "Germany's Fraunhofer Society is hiring 200+ applied researchers in AI, data analytics, and cybersecurity across Munich, Berlin, and Stuttgart. Positions bridge academic and industry research with competitive salaries.",
      category: "jobs",
      date: "2025-10-08",
      url: "https://www.fraunhofer.de/en/jobs.html",
      source: "Fraunhofer"
    },
    {
      title: "Helmholtz Association Opens PhD Positions in Data-Driven Sciences",
      summary: "Germany's Helmholtz Association announces 50 new structured PhD positions in its research centers across Berlin, Munich, and Hamburg. Fields include bioinformatics, climate data science, and particle physics data analysis.",
      category: "phd",
      date: "2025-10-03",
      url: "https://www.helmholtz.de/en/career/",
      source: "Helmholtz"
    },
    {
      title: "NeurIPS 2025 Europe Workshop: PhD Networking Events Announced",
      summary: "The European NeurIPS satellite workshops in Vienna and Zurich will feature dedicated PhD recruitment fairs. Universities including ETH, TU Munich, and Max Planck Institutes will have recruitment booths. Registration open now.",
      category: "eu",
      date: "2025-09-25",
      url: "https://neurips.cc",
      source: "NeurIPS"
    }
  ];
}
