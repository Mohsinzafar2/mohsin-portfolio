/**
 * MUHAMMAD MOHSIN ZAFAR - PORTFOLIO INTERACTION ENGINE
 * Multi-Page View Routing, Neural Canvas, Live AI Simulators, Case Study Modals, Chatbot, Terminal & Contact Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageRouter();
  initNeuralCanvas();
  initNavbarAndDrawer();
  initThemeToggle();
  initProjectFiltering();
  initCaseStudyModal();
  initInteractiveLab();
  initDigitalTwinChat();
  initDeveloperTerminal();
  initContactAndClipboard();
});

/* ==========================================================================
   1. MULTI-PAGE VIEW ROUTER (ELIMINATES ENDLESS SCROLLING)
   ========================================================================== */
function initPageRouter() {
  const pageViews = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.page-nav-link');
  const drawer = document.getElementById('mobile-drawer');

  const VALID_PAGES = ['home', 'about', 'skills', 'projects', 'ai-lab', 'experience', 'education', 'contact'];

  function switchPage(pageId) {
    if (!VALID_PAGES.includes(pageId)) {
      pageId = 'home';
    }

    // Hide all pages, show target page
    pageViews.forEach((pv) => {
      pv.classList.remove('active');
    });

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Update active state on nav links
    navLinks.forEach((link) => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile drawer if open
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
    }

    // Scroll directly to top of the new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRoute() {
    let hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash) hash = 'home';
    switchPage(hash);
  }

  // Intercept click on any page nav link
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.page-nav-link');
    if (link) {
      const page = link.getAttribute('data-page');
      if (page) {
        e.preventDefault();
        window.location.hash = `#/${page}`;
      }
    }
  });

  // Listen for browser Back / Forward buttons
  window.addEventListener('hashchange', handleRoute);

  // Initialize on initial page load
  handleRoute();
}

/* ==========================================================================
   2. NEURAL NETWORK CANVAS ANIMATION
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);
  const maxDistance = 140;

  const mouse = { x: null, y: null, radius: 160 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive repelling / attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.6)' : 'rgba(79, 70, 229, 0.35)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const lineColor = isDark ? '56, 189, 248' : '79, 70, 229';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * (isDark ? 0.25 : 0.14);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbarAndDrawer() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile drawer open/close
  if (hamburgerBtn && drawer) {
    hamburgerBtn.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (drawerCloseBtn && drawer) {
    drawerCloseBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }
}

/* ==========================================================================
   4. THEME TOGGLING (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('mohsin_theme') || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('mohsin_theme', nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }
}

/* ==========================================================================
   5. PROJECT FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'pageFadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. CASE STUDY DATA & MODAL
   ========================================================================== */
const CASE_STUDIES = {
  gastrocad: {
    title: 'GastroCAD: Real-Time Stomach Cancer Diagnostic CAD',
    subtitle: 'BS AI Graduation Thesis (2025) | University of Haripur',
    bannerClass: 'banner-gastrocad',
    icon: 'fa-microscope',
    badge: 'BS AI Graduation Thesis (2025)',
    category: 'Deep Learning & Medical CAD',
    tags: ['Vision Transformers', 'Flutter UI', 'Cloud Inference', 'Medical Endoscopy', 'Python', 'PyTorch'],
    metrics: [
      { label: 'Clinical F1-Score', val: '89.2%' },
      { label: 'Inference Latency', val: '42 ms' },
      { label: 'Target Pathology', val: 'Gastric Lesions' }
    ],
    problem: `Gastric cancer is one of the leading causes of cancer-related mortality worldwide. Early detection during routine upper endoscopy significantly improves 5-year survival rates; however, flat mucosal lesions and early-stage adenocarcinomas are frequently missed by fatigued clinicians due to subtle morphological deviations.`,
    scope: `Developed a real-time computer-aided diagnosis (CAD) framework as my BS AI graduation thesis that ingests endoscopic video feeds, segments suspicious tissue using vision transformer attention mechanisms, overlays bounding boxes and heatmaps, and outputs immediate diagnostic confidence scores on a Flutter clinician interface.`,
    architecture: `
      1. **Frame Ingestion & Preprocessing:** Noise filtering, specular reflection removal, and adaptive histogram equalization.<br>
      2. **Transformer Deep Learning Core:** Fine-tuned Vision Transformer (ViT-CAD) model trained on annotated gastrointestinal datasets, extracting deep morphological features across endoscopic frames.<br>
      3. **Heatmap & Attention Projection:** Grad-CAM generation for clinical explainability, highlighting why the model flagged suspicious zones.<br>
      4. **Clinician Interface:** Responsive Flutter cross-platform UI coupled with cloud API synchronization for structured clinical reporting.
    `,
    engineeringHurdles: `Initial models struggled with motion artifacts and intense light reflections from the endoscope illumination. To mitigate this, a specular highlight suppression pipeline was implemented alongside temporal smoothing across adjacent frames, dropping false positive rates by 34%.`,
    evaluation: `Evaluated on held-out endoscopic datasets, achieving an 89.2% overall diagnostic F1-score with 91.4% sensitivity for high-risk adenocarcinomas and an ultra-low inference latency of 42ms per frame, well within real-time 24-30 FPS clinical video standards.`,
    githubNotice: `Source code & dataset benchmarks available upon request under academic research license.`
  },

  vision: {
    title: 'NeuralVision: Multi-Module Computer Vision Suite',
    subtitle: '6th Semester Computer Vision Projects | Python, OpenCV & TensorFlow',
    bannerClass: 'banner-vision',
    icon: 'fa-eye',
    badge: '6th Sem Vision R&D',
    category: 'Computer Vision & Deep Learning',
    tags: ['OpenCV', 'TensorFlow', 'Python', 'ALPR', 'Facial Landmarks', 'Bone X-Ray'],
    metrics: [
      { label: 'License Plate OCR', val: '98% Acc' },
      { label: 'FPS Throughput', val: '31 FPS' },
      { label: 'Landmark Points', val: '68 Nodes' }
    ],
    problem: `Autonomous inspection systems require multi-faceted computer vision pipelines operating simultaneously without resource contention or latency degradation.`,
    scope: `Built a unified computer vision research suite during 6th semester coursework containing four distinct practical modules: Automatic License Plate Recognition (ALPR), 68-Point Facial Landmark Mapping, Bone Fracture X-Ray Classification, and Pupil Gaze Tracking.`,
    architecture: `
      1. **License Plate Recognition (ALPR):** Grayscale conversion, bilateral filtering, edge detection, contour localization of rectangular plates, and Tesseract OCR character extraction.<br>
      2. **Facial Landmark Mesh:** Real-time geometric mapping tracking 68 facial features for gaze direction, fatigue detection, and expression mapping.<br>
      3. **Bone Fracture X-Ray Model:** CNN-based binary classification detecting structural bone discontinuity and hairline fractures with bounding annotations.<br>
      4. **Eye Gaze Tracking:** Iris boundary detection calculating normalized 2D gaze vectors.
    `,
    engineeringHurdles: `Varying lighting angles and skewed vehicle plates caused initial OCR failures. Solved by integrating perspective warp transformations to deskew rectangular bounding regions before passing them to the OCR pipeline.`,
    evaluation: `Achieved 98% plate character accuracy on daytime traffic feeds and sustained 31 FPS real-time processing on standard commodity GPU hardware.`,
    githubNotice: `Modular Python notebooks and OpenCV scripts available in Mohsin's GitHub repository.`
  },

  'flask-app': {
    title: 'Full-Stack Flask Web Platform & REST API Engine',
    subtitle: 'Python Developer Internship | Smart Tech Solutions (Islamabad, 2024)',
    bannerClass: 'banner-flask',
    icon: 'fa-server',
    badge: 'Smart Tech Internship',
    category: 'Full Stack & Backend Engineering',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'REST APIs', 'JWT / Auth', 'PostgreSQL'],
    metrics: [
      { label: 'API Endpoints', val: '24+ Routes' },
      { label: 'Auth Strategy', val: 'RBAC & Sessions' },
      { label: 'ORM Persistence', val: 'SQLAlchemy' }
    ],
    problem: `Business clients needed a unified management dashboard with fine-grained role-based access control, responsive views, and high-throughput REST APIs to interact with disparate microservices.`,
    scope: `Engineered the backend REST API engine and connected responsive frontend views using the Flask framework, handling authentication, CRUD operations, and relational data persistence.`,
    architecture: `
      1. **Flask Application Factory Pattern:** Modular blueprints separating auth, user profiles, transactional business records, and reporting routes.<br>
      2. **Database Layer:** SQLAlchemy ORM managing complex relational tables with foreign-key constraints, cascading deletes, and optimized query joins.<br>
      3. **Security Architecture:** Argon2/Bcrypt password hashing, CSRF protection, secure HTTP-only cookies, and role-based permissions (Admin, Manager, User).
    `,
    engineeringHurdles: `N+1 database query bottlenecks during bulk record retrieval. Resolved by rewriting queries with SQLAlchemy joinedload strategies and adding query pagination, slashing response latency from 680ms to under 145ms.`,
    evaluation: `Stress-tested under simulated concurrent user traffic; maintained zero data integrity errors and sub-150ms average endpoint latency.`,
    githubNotice: `Enterprise repository architecture documented with Postman API collections.`
  },

  smarthome: {
    title: 'Voice-Controlled Smart Home Automation System',
    subtitle: 'Embedded Hardware-Software Prototype | C++ & Relay Actuation (Semester Project)',
    bannerClass: 'banner-smarthome',
    icon: 'fa-microchip',
    badge: 'C++ Hardware Project',
    category: 'Systems & Hardware Integration',
    tags: ['C++', 'IoT', 'Voice Recognition', 'Hardware Relays', 'Real-Time Systems'],
    metrics: [
      { label: 'Appliance Nodes', val: 'Lights / Fans' },
      { label: 'Language Core', val: 'C++' },
      { label: 'Response Time', val: '< 200 ms' }
    ],
    problem: `Traditional home automation systems are either proprietary, prohibitively expensive, or dependent entirely on external internet cloud latency for simple room commands.`,
    scope: `Designed and assembled a working physical prototype using C++ controlling multiple 5V relay switches, light fixtures, and ventilation fans through local voice command parsing.`,
    architecture: `
      1. **Voice Input Subsystem:** Microcontroller / microphone interface converting acoustic signals into phoneme tokens.<br>
      2. **C++ Command Parser:** Low-latency string tokenizer and command dispatcher executing actions in real-time.<br>
      3. **Actuator Controller:** Multi-channel relay circuit safely switching 220V AC household appliances without inductive electrical feedback.
    `,
    engineeringHurdles: `Inductive load spikes caused unexpected microcontroller resets when fans were turned on. Overcame this by adding optocoupler isolation and snubber diode circuits across relay coils.`,
    evaluation: `Demonstrated 95%+ command recognition for pre-programmed lighting and fan voice triggers with instant physical actuation under 200ms.`,
    githubNotice: `C++ hardware control code and schematic diagrams documented.`
  },

  'nlp-chatbot': {
    title: 'Semantic FAQ Chatbot & Heuristic Game AI',
    subtitle: 'AI Research Internship | Apexcify Technologys (2026)',
    bannerClass: 'banner-nlp',
    icon: 'fa-comments',
    badge: 'Apexcify Internship',
    category: 'Natural Language Processing & AI Games',
    tags: ['Python', 'NLP', 'TF-IDF', 'Cosine Similarity', 'Heuristics', 'Flask'],
    metrics: [
      { label: 'Resolution Rate', val: '92%' },
      { label: 'NLP Algorithm', val: 'Cosine Sim' },
      { label: 'Opponent Logic', val: 'Adaptive' }
    ],
    problem: `Customer support queries often bottleneck human agents with repetitive inquiries, while basic rule-based chatbots fail when queries deviate from exact string matches.`,
    scope: `Built an automated question-answering chatbot utilizing text preprocessing (tokenization, lemmatization, stop-word removal) and vector similarity alongside a self-learning Rock-Paper-Scissors opponent AI.`,
    architecture: `
      1. **Text Vectorization:** TF-IDF representation converting queries and knowledge-base entries into high-dimensional vector space.<br>
      2. **Semantic Matching:** Cosine similarity calculation matching user input against historical solution vectors above a dynamic confidence threshold.<br>
      3. **Predictive Game Engine:** Heuristic Markov-style opponent predicting human player bias patterns based on previous choices.
    `,
    engineeringHurdles: `Handling conversational out-of-vocabulary words. Implemented fuzzy matching fallbacks and graceful confidence escalation prompts.`,
    evaluation: `Successfully answered over 90% of domain FAQ queries automatically without human handoff.`,
    githubNotice: `Code available in project repository.`
  },

  'irrigation-dld': {
    title: 'Automated Sensor-Driven Irrigation System (DLD)',
    subtitle: 'Coursework Project | Digital Logic Design (DLD), University of Haripur',
    bannerClass: 'banner-irrigation',
    icon: 'fa-seedling',
    badge: 'DLD Coursework',
    category: 'Digital Logic & Circuit Automation',
    tags: ['Digital Logic Design', 'Logic Gates', 'Sensors', 'Water Efficiency', 'Truth Tables'],
    metrics: [
      { label: 'Logic Design', val: 'K-Map Optimized' },
      { label: 'Water Savings', val: 'High Efficiency' },
      { label: 'Components', val: 'AND/OR/NOT Gates' }
    ],
    problem: `Agricultural water waste occurs due to unoptimized manual irrigation timers that operate regardless of actual soil moisture or atmospheric conditions.`,
    scope: `Engineered an automated decision-making circuit based on Digital Logic Design (DLD) principles, using soil moisture and temperature sensor inputs to govern water valve activation.`,
    architecture: `
      1. **Sensor Input Conditioning:** Digital thresholding of analog moisture and heat probes.<br>
      2. **Combinational Logic:** Karnaugh-Map simplified truth-table equations implemented with discrete logic gates.<br>
      3. **Actuation Trigger:** Driving solid-state solenoid valves only when dry soil criteria and temperature safety parameters are fulfilled.
    `,
    engineeringHurdles: `Minimizing gate count and power consumption while ensuring the circuit does not chatter near sensor boundary thresholds.`,
    evaluation: `Simulated and verified zero race-conditions, ensuring predictable automated irrigation switching.`,
    githubNotice: `Digital schematic and circuit truth-tables preserved.`
  },

  'railway-system': {
    title: 'Railway Reservation & Train Management System',
    subtitle: '2nd Semester Team Project | C++ Object-Oriented Programming (OOP)',
    bannerClass: 'banner-railway',
    icon: 'fa-train',
    badge: '2nd Sem OOP Project',
    category: 'Systems & Object-Oriented Software',
    tags: ['C++', 'OOP Principles', 'File Handling', 'Data Structures', 'Inheritance'],
    metrics: [
      { label: 'Design Paradigm', val: 'Pure OOP' },
      { label: 'Data Store', val: 'Binary Files' },
      { label: 'Core Modules', val: 'Booking & Admin' }
    ],
    problem: `Demonstrating strict Object-Oriented software engineering to manage multi-tiered train schedules, seat reservation classes, and persistent passenger records without database dependencies.`,
    scope: `Constructed a console-based enterprise transit application applying inheritance, polymorphism, encapsulation, and persistent binary file I/O in C++.`,
    architecture: `
      1. **Class Hierarchy:** Base Train and Passenger classes with derived VIP, Sleeper, and Standard booking sub-classes.<br>
      2. **Persistence Layer:** Direct binary file stream serialization maintaining ticket manifests across application restarts.<br>
      3. **Validation Engine:** Defensive seat allotment preventing double-booking and tracking waitlists.
    `,
    engineeringHurdles: `File pointer corruption during concurrent record modifications. Solved by implementing strict seekp/seekg file indexing and atomic record updates.`,
    evaluation: `Passed comprehensive edge-case test suites with 100% reservation consistency across hundreds of mock passenger records.`,
    githubNotice: `C++ source code documented with clear modular header files.`
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const container = document.getElementById('modal-content-container');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  function openModal(projectId) {
    const data = CASE_STUDIES[projectId];
    if (!data) return;

    let metricsHtml = '';
    data.metrics.forEach((m) => {
      metricsHtml += `
        <div class="case-metric-box">
          <div class="case-metric-val">${m.val}</div>
          <div class="case-metric-lbl">${m.label}</div>
        </div>
      `;
    });

    let tagsHtml = '';
    data.tags.forEach((t) => {
      tagsHtml += `<span class="badge badge-accent">${t}</span> `;
    });

    const bannerHtml = `
      <div class="modal-tech-banner ${data.bannerClass || 'banner-gastrocad'}">
        <i class="fa-solid ${data.icon || 'fa-code'} modal-tech-banner-watermark"></i>
        <div class="modal-tech-banner-content">
          <div class="modal-tech-banner-tag">
            <i class="fa-solid ${data.icon || 'fa-code'}"></i> ${data.badge || data.category}
          </div>
          <h2 class="modal-tech-banner-title">${data.title}</h2>
          <p class="modal-tech-banner-sub">${data.subtitle}</p>
        </div>
      </div>
    `;

    container.innerHTML = `
      ${bannerHtml}
      <div class="project-tags" style="margin-bottom: 20px;">
        ${tagsHtml}
      </div>

      <div class="case-metrics-grid">
        ${metricsHtml}
      </div>

      <div class="case-section">
        <h4><i class="fa-solid fa-circle-exclamation text-accent"></i> 1. The Challenge &amp; Problem Statement</h4>
        <p>${data.problem}</p>
      </div>

      <div class="case-section">
        <h4><i class="fa-solid fa-bullseye text-accent"></i> 2. Project Scope &amp; Deliverables</h4>
        <p>${data.scope}</p>
      </div>

      <div class="case-section">
        <h4><i class="fa-solid fa-diagram-project text-accent"></i> 3. System Architecture &amp; Pipeline</h4>
        <div style="margin-top: 8px;">${data.architecture}</div>
      </div>

      <div class="case-section">
        <h4><i class="fa-solid fa-screwdriver-wrench text-warning"></i> 4. Technical Hurdles &amp; Iteration</h4>
        <p>${data.engineeringHurdles}</p>
      </div>

      <div class="case-section">
        <h4><i class="fa-solid fa-square-poll-vertical text-success"></i> 5. Performance &amp; Evaluation</h4>
        <p>${data.evaluation}</p>
      </div>

      <div class="case-section" style="padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fa-brands fa-github text-accent"></i> ${data.githubNotice}</span>
        <a href="#/contact" class="btn btn-primary btn-sm modal-contact-link page-nav-link" data-page="contact"><i class="fa-solid fa-envelope"></i> Discuss This Project</a>
      </div>
    `;

    const contactLink = container.querySelector('.modal-contact-link');
    if (contactLink) {
      contactLink.addEventListener('click', () => {
        closeModal();
      });
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-project');
      openModal(pId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. INTERACTIVE AI LAB & GASTROCAD SIMULATOR
   ========================================================================== */
function initInteractiveLab() {
  const tabButtons = document.querySelectorAll('.sandbox-tab-btn');
  const panes = document.querySelectorAll('.sandbox-pane');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(target);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // GastroCAD Case Switcher
  const caseButtons = document.querySelectorAll('.case-btn');
  const simBox = document.getElementById('sim-box');
  const simBoxLabel = document.getElementById('sim-box-label');
  const simLatency = document.getElementById('sim-latency');
  const simRisk = document.getElementById('sim-risk');
  const simConf = document.getElementById('sim-conf');
  const simStatus = document.getElementById('sim-status');
  const runBtn = document.getElementById('run-inference-btn');

  function applyCase(btn) {
    caseButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const top = btn.getAttribute('data-top');
    const left = btn.getAttribute('data-left');
    const width = btn.getAttribute('data-width');
    const height = btn.getAttribute('data-height');
    const label = btn.getAttribute('data-label');
    const risk = btn.getAttribute('data-risk');
    const latency = btn.getAttribute('data-latency');

    if (simBox) {
      simBox.style.top = `${top}%`;
      simBox.style.left = `${left}%`;
      simBox.style.width = `${width}%`;
      simBox.style.height = `${height}%`;
    }

    if (simBoxLabel) simBoxLabel.textContent = label;
    if (simLatency) simLatency.textContent = latency;
    if (simRisk) {
      simRisk.textContent = `${risk} Risk`;
      simRisk.className = risk === 'High' ? 'font-mono text-danger' : risk === 'Moderate' ? 'font-mono text-warning' : 'font-mono text-success';
    }
    if (simConf) {
      simConf.textContent = label.match(/\(([^)]+)\)/)?.[1] || '90%';
    }
    if (simStatus) {
      simStatus.textContent = 'Inference Complete';
      simStatus.style.color = '#10b981';
    }
  }

  caseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyCase(btn);
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (simStatus) {
        simStatus.textContent = 'Processing ViT-CAD Layers...';
        simStatus.style.color = '#06b6d4';
      }
      runBtn.disabled = true;
      runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running ViT-CAD...';

      setTimeout(() => {
        runBtn.disabled = false;
        runBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Run Transformer CAD Inference';
        const activeBtn = document.querySelector('.case-btn.active') || caseButtons[0];
        applyCase(activeBtn);
        showToast('Transformer CAD inference executed successfully (42ms)');
      }, 700);
    });
  }
}

/* ==========================================================================
   8. DIGITAL TWIN AI ASSISTANT (CHATBOT)
   ========================================================================== */
function initDigitalTwinChat() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messagesBox = document.getElementById('chat-messages');
  const promptChips = document.querySelectorAll('.prompt-chip');

  if (!form || !input || !messagesBox) return;

  function appendMessage(text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`;
    bubble.innerHTML = `<p>${text}</p>`;
    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function getAiResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('thesis') || q.includes('gastrocad') || q.includes('cancer')) {
      return `Mohsin's Bachelor thesis is <strong>GastroCAD</strong> — an AI-powered computer-aided diagnosis system that detects stomach cancer and gastric disorders from real-time endoscopic imagery. It utilizes Vision Transformer deep learning models, achieves an 89.2% F1-score with 42ms latency, and features a clinician Flutter UI.`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('technologies')) {
      return `Mohsin's core technical stack includes:
        <br>• <strong>AI &amp; ML:</strong> Transformers, Deep Learning, Computer Vision (OpenCV), NLP, TensorFlow.
        <br>• <strong>Full-Stack &amp; Web:</strong> Python (Flask, SQLAlchemy), RESTful APIs, JavaScript, HTML5/CSS3, WordPress, Flutter.
        <br>• <strong>Systems:</strong> C++ (Object-Oriented Programming, Data Persistence), Digital Logic Design (DLD).
        <br>• <strong>IT &amp; DevOps:</strong> Git, Agile/Scrum, IP Networking, IT Infrastructure diagnostics.`;
    }

    if (q.includes('experience') || q.includes('work') || q.includes('company') || q.includes('whoopit') || q.includes('bali')) {
      return `Mohsin has worked across 5 prominent roles:
        <br>1. <strong>Full Stack AI Engineer</strong> at Whoopit SMC Pvt Ltd (06/2026 – Present) - building AI workflows and full-stack web applications.
        <br>2. <strong>IT Assistant</strong> at Bali Tech Pvt Ltd (03/2026 – 05/2026) - handling hardware, network, and IP infrastructure.
        <br>3. <strong>AI Intern</strong> at Apexcify Technologys (03/2026 – 04/2026) - NLP chatbots and computer vision.
        <br>4. <strong>Python Developer (Internee)</strong> at Smart Tech Solutions (06/2024 – 08/2024) - Flask REST APIs &amp; SQLAlchemy.
        <br>5. <strong>WordPress Developer (Internee)</strong> at Giga Developers (06/2023 – 09/2023) - WordPress CMS &amp; SEO.`;
    }

    if (q.includes('education') || q.includes('degree') || q.includes('cgpa') || q.includes('university') || q.includes('grades')) {
      return `Mohsin graduated with a <strong>Bachelors in Artificial Intelligence</strong> from the <strong>University of Haripur</strong> (2021–2025) with an outstanding <strong>3.74 CGPA</strong> (EQF Level 6). Prior to that, he achieved an 83% First Division in Science at Jinnah Jame School &amp; College.`;
    }

    if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('contact') || q.includes('remote')) {
      return `Yes! Mohsin is <strong>actively available</strong> for Full-Stack AI Engineering, Machine Learning, and Python Web positions (Full-time, Contract, or Remote).
        <br>You can reach him directly at:
        <br>📧 <strong>mohsinz35425@gmail.com</strong>
        <br>📱 WhatsApp: <strong>(+92) 331 9981044</strong>`;
    }

    if (q.includes('language') || q.includes('english') || q.includes('urdu')) {
      return `Mohsin is bilingual: Native Urdu speaker, with C1/C2 advanced proficiency in English (reading, listening, and technical communication).`;
    }

    return `Mohsin is a Full Stack AI Engineer specializing in Deep Learning (Transformers), Computer Vision (OpenCV), and Python/Flask web systems. Feel free to ask about his thesis (GastroCAD), work history, skills, or hiring status!`;
  }

  function handleChatSubmit(e) {
    if (e) e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    appendMessage(query, true);
    input.value = '';

    setTimeout(() => {
      const response = getAiResponse(query);
      appendMessage(response, false);
    }, 450);
  }

  form.addEventListener('submit', handleChatSubmit);

  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      input.value = prompt;
      handleChatSubmit();
    });
  });
}

/* ==========================================================================
   9. INTERACTIVE DEVELOPER CLI TERMINAL
   ========================================================================== */
function initDeveloperTerminal() {
  const input = document.getElementById('term-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  const COMMANDS = {
    help: `Available commands:
  - whoami       : Quick bio & identity
  - skills       : Technical skills breakdown
  - projects     : List of engineered projects
  - exp          : Work experience history
  - edu          : University degree & CGPA
  - contact      : Phone, email & WhatsApp
  - hire         : Availability status
  - clear        : Clear terminal output`,

    whoami: `Muhammad Mohsin Zafar
Role    : Full Stack AI Engineer & Computer Vision Specialist
Location: Islamabad, Pakistan
Degree  : BS in Artificial Intelligence (3.74 CGPA)`,

    skills: `AI / ML   : Transformers, OpenCV, Deep Learning, NLP, TensorFlow, Medical CAD
Backend   : Python (Flask), RESTful APIs, SQLAlchemy, C++
Frontend  : HTML5, CSS3, JavaScript, Flutter, WordPress
Tools     : Git, GitHub, Agile/Scrum, IP Networking, Linux`,

    projects: `1. GastroCAD            - BS AI Graduation Thesis: Stomach Cancer CAD (ViT + Flutter)
2. NeuralVision Suite   - 6th Sem Vision R&D: License Plate OCR, 68-Face Mesh, Bone X-Ray
3. Full-Stack Flask App - Smart Tech Solutions Internship (REST APIs & SQLAlchemy ORM)
4. Smart Home IoT       - C++ hardware-software voice-controlled prototype
5. FAQ Chatbot & AI     - Apexcify Tech Internship: NLP cosine similarity & game AI
6. Irrigation DLD       - Digital Logic Design Coursework: Automated valve gating
7. Railway Management   - 2nd Semester OOP Project: C++ reservation engine`,

    exp: `• Whoopit SMC (06/2026 - Present): Full Stack AI Engineer
• Bali Tech (03/2026 - 05/2026) : IT Assistant
• Apexcify Tech (03/2026 - 04/2026): AI Intern
• Smart Tech Solutions (06/2024 - 08/2024): Python Developer Internee
• Giga Developers (06/2023 - 09/2023): WordPress Developer Internee`,

    edu: `Bachelors in Artificial Intelligence
University: University of Haripur (2021 - 2025)
Grade     : 3.74 / 4.0 CGPA
Thesis    : GastroCAD - Real-Time AI Endoscopy CAD System`,

    contact: `Email   : mohsinz35425@gmail.com
Phone   : (+92) 331 9981044
WhatsApp: https://wa.me/923319981044
Location: Islamabad, Pakistan`,

    hire: `STATUS: AVAILABLE
Open for Full Stack AI Engineering, Machine Learning, and Python Backend roles (Full-time, Contract, or Remote).`
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      if (!cmd) return;

      if (cmd === 'clear') {
        output.innerHTML = '';
        return;
      }

      const response = COMMANDS[cmd] || `command not found: ${cmd}. Type 'help' to see valid commands.`;

      const block = document.createElement('div');
      block.innerHTML = `
        <div class="term-line"><span class="term-prompt">mohsin@portfolio:~$</span> <span class="term-cmd">${cmd}</span></div>
        <div class="term-res">${response}</div>
      `;
      output.appendChild(block);

      const terminalBody = document.getElementById('terminal-body');
      if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}

/* ==========================================================================
   10. CONTACT FORM & INSTANT CLIPBOARD NOTIFICATIONS
   ========================================================================== */
function initContactAndClipboard() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const copyBtns = document.querySelectorAll('.btn-copy');

  // Copy-to-clipboard functionality
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }
    });
  });

  // Contact form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || 'Portfolio Contact Inquiry';
      const message = document.getElementById('form-message')?.value || '';

      if (!name || !email || !message) {
        if (feedback) {
          feedback.textContent = 'Please fill out all required fields.';
          feedback.className = 'form-feedback error';
        }
        return;
      }

      if (feedback) {
        feedback.innerHTML = `Thank you, <strong>${name}</strong>! Your message has been prepared. Opening your email client to send to <strong>mohsinz35425@gmail.com</strong>...`;
        feedback.className = 'form-feedback success';
      }

      showToast('Opening default email client...');

      const mailtoUrl = `mailto:mohsinz35425@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);

      form.reset();
    });
  }
}

/* ==========================================================================
   11. FLOATING TOAST HELPER
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
