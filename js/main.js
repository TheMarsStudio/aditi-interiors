/**
 * ADITI INTERIORS - Interactive Features & Architecture
 * Modern Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initProjectFilterAndModal();
  initBeforeAfterSlider();
  initQuoteCalculator();
  initPillarsInteractions();
  initToast();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky scroll class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      mobileToggle.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      mobileToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleDrawer());
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // Active Link Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. HERO SLIDER & DOTS (3 Slides)
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const titleEl = document.getElementById('heroHeadline');
  const descEl = document.getElementById('heroSubtitle');

  const heroData = [
    {
      title: 'Designing<br>Exceptional<br><span class="script-accent">Homes</span>',
      desc: 'Thoughtful Interiors. Timeless Spaces. Made for Exceptional People.'
    },
    {
      title: 'Crafting<br>Personal<br><span class="script-accent">Sanctuaries</span>',
      desc: 'Intimate, serene spaces designed for restorative comfort and bespoke luxury.'
    },
    {
      title: 'Curating<br>Timeless<br><span class="script-accent">Gatherings</span>',
      desc: 'Sophisticated dining and entertainment areas sculpted for memorable moments.'
    }
  ];

  let currentIndex = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    if (titleEl && heroData[index]) {
      titleEl.innerHTML = heroData[index].title;
    }
    if (descEl && heroData[index]) {
      descEl.textContent = heroData[index].desc;
    }
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-slide'), 10);
      showSlide(idx);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      showSlide(next);
    }, 6500);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    heroSection.addEventListener('mouseleave', () => startAutoplay());
  }

  startAutoplay();
}

/* ==========================================================================
   3. PROJECTS DATA, FILTER & DETAIL MODAL
   ========================================================================== */
const projectsData = [
  {
    id: 1,
    title: 'Sinuous Elegance',
    category: 'living',
    categoryName: 'Living Room',
    image: 'assets/images/project-living-ref.jpg',
    hiresImage: 'assets/images/hero-sofa.jpg',
    area: '1,450 sq.ft',
    location: 'Lavelle Road, Bangalore',
    duration: '45 Days',
    materials: 'Cream Bouclé, Italian Statuario Marble, Walnut Paneling',
    description: 'A bespoke living sanctuary showcasing organic fluid silhouettes. Featuring a custom curvilinear bouclé sofa, floor-to-ceiling silk-blend drapery, recessed warm architectural cove lighting, and bookmatched polished marble flooring designed for relaxed entertaining.'
  },
  {
    id: 2,
    title: 'Botanical Haven Suite',
    category: 'bedroom',
    categoryName: 'Bedroom',
    image: 'assets/images/project-bedroom-ref.jpg',
    hiresImage: 'assets/images/project-bedroom.jpg',
    area: '780 sq.ft',
    location: 'Bandra West, Mumbai',
    duration: '35 Days',
    materials: 'Hand-painted Tropical Wallpaper, Oak Fluting, Brass Sconces',
    description: 'An oasis of tranquility inspired by biophilic design. Handcrafted vertical wooden headboard panelling harmoniously integrated with bespoke botanical wall murals, brass pendant lamps, and an upholstered platform bed dressed in earth-toned linens.'
  },
  {
    id: 3,
    title: 'Luxe Haven Dining',
    category: 'living',
    categoryName: 'Living & Dining',
    image: 'assets/images/project-dining-ref.jpg',
    hiresImage: 'assets/images/project-dining.jpg',
    area: '920 sq.ft',
    location: 'Jubilee Hills, Hyderabad',
    duration: '40 Days',
    materials: 'Monolithic Quartz Table, Fluted Oak Wall, Warm Cove Lighting',
    description: 'An architectural dining space harmonizing clean linear geometries with tactile richness. Features fluted oak wall paneling, a monolithic quartz dining table for eight, custom minimalist chairs, and indirect warm ceiling illumination.'
  },
  {
    id: 4,
    title: 'Nordic Warmth Kitchen',
    category: 'kitchen',
    categoryName: 'Modular Kitchen',
    image: 'assets/images/project-kitchen.jpg',
    hiresImage: 'assets/images/project-kitchen-2.jpg',
    area: '480 sq.ft',
    location: 'Indiranagar, Bangalore',
    duration: '28 Days',
    materials: 'Natural White Oak, Quartzite Countertop, Blum Hardware',
    description: 'A minimalist culinary haven engineered with seamless German Blum motion technologies, handleless oak cabinetry, an expansive waterfall quartzite island, and intelligent integrated spice and pantry storage.'
  },
  {
    id: 5,
    title: 'The Executive Atelier',
    category: 'commercial',
    categoryName: 'Commercial Office',
    image: 'assets/images/project-commercial.jpg',
    hiresImage: 'assets/images/project-commercial-2.jpg',
    area: '2,600 sq.ft',
    location: 'BKC, Mumbai',
    duration: '60 Days',
    materials: 'Acoustic Felt Paneling, Black Metal Trims, Leather Accents',
    description: 'A contemporary boutique workspace balancing productive focus with hospitality elegance. Includes bespoke private boardroom suites, acoustic fabric baffles, indirect biophilic planter partitions, and executive lounge zones.'
  },
  {
    id: 6,
    title: 'Artisanal Minimalist Suite',
    category: 'living',
    categoryName: 'Living Room',
    image: 'assets/images/hero-sofa-curved.jpg',
    hiresImage: 'assets/images/project-living.jpg',
    area: '1,100 sq.ft',
    location: 'Koramangala, Bangalore',
    duration: '40 Days',
    materials: 'Travertine Coffee Table, Textured Limewash, Linen Upholstery',
    description: 'A serene Japandi-inspired lounge finished with warm natural limewash walls, custom travertine stone surfaces, and low-slung comfortable lounge seating tailored for contemplative urban living.'
  }
];

function initProjectFilterAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  const projDots = document.querySelectorAll('.proj-dot');
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('closeProjectModal');

  // Render initial project cards
  function renderProjects(category = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = category === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category === category || (category === 'living' && p.categoryName.includes('Living')));

    filtered.forEach((project, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-id', project.id);
      card.setAttribute('data-category', project.category);
      card.style.animation = `fadeInUp 0.4s ease forwards ${idx * 0.08}s`;

      card.innerHTML = `
        <div class="project-card-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='${project.hiresImage}'">
        </div>
        <div class="project-card-overlay">
          <div class="project-category-tag">${project.categoryName}</div>
          <h3 class="project-title">${project.title}</h3>
          <div class="project-meta">${project.location} • ${project.area}</div>
        </div>
        <button class="project-arrow-btn" aria-label="View ${project.title} Details">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      `;

      card.addEventListener('click', () => openProjectModal(project.id));
      projectsGrid.appendChild(card);
    });
  }

  // Filter click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const cat = e.currentTarget.getAttribute('data-filter');
      renderProjects(cat);
    });
  });

  // Project Modal open
  function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project || !projectModal) return;

    document.getElementById('modalProjectImg').src = project.hiresImage || project.image;
    document.getElementById('modalProjectCategory').textContent = project.categoryName;
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectArea').textContent = project.area;
    document.getElementById('modalProjectLoc').textContent = project.location;
    document.getElementById('modalProjectDuration').textContent = project.duration;
    document.getElementById('modalProjectMaterials').textContent = project.materials;
    document.getElementById('modalProjectDesc').textContent = project.description;

    const similarBtn = document.getElementById('modalProjectQuoteBtn');
    if (similarBtn) {
      similarBtn.onclick = () => {
        closeModal();
        openQuoteModalWithProject(project.title, project.categoryName);
      };
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  // Pagination dots click
  projDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      projDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      if (idx === 0) renderProjects('all');
      else if (idx === 1) renderProjects('living');
      else if (idx === 2) renderProjects('bedroom');
      else if (idx === 3) renderProjects('kitchen');
    });
  });

  // Initial render
  renderProjects('all');
}

/* ==========================================================================
   4. INTERACTIVE BEFORE & AFTER SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterContainer');
  const afterBox = document.getElementById('afterContainer');
  const handle = document.getElementById('baSliderHandle');
  if (!container || !afterBox || !handle) return;

  let isDragging = false;

  function setSliderPos(x) {
    const rect = container.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    if (pos < 5) pos = 5;
    if (pos > 95) pos = 95;

    afterBox.style.width = `${pos}%`;
    handle.style.left = `${pos}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPos(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPos(e.clientX);
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPos(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPos(e.touches[0].clientX);
  }, { passive: true });
}

/* ==========================================================================
   5. INTERACTIVE ESTIMATE & QUOTE CALCULATOR MODAL
   ========================================================================== */
function initQuoteCalculator() {
  const quoteModal = document.getElementById('quoteModal');
  const quoteClose = document.getElementById('closeQuoteModal');
  const quoteTriggers = document.querySelectorAll('.open-quote-modal');
  const spaceBtns = document.querySelectorAll('[data-calc-space]');
  const scopeBtns = document.querySelectorAll('[data-calc-scope]');
  const tierBtns = document.querySelectorAll('[data-calc-tier]');
  const resultVal = document.getElementById('calcEstimatedBudget');
  const resultDuration = document.getElementById('calcEstimatedDuration');
  const whatsappSubmitBtn = document.getElementById('calcWhatsAppSubmit');

  let selectedSpace = '3 BHK';
  let selectedScope = 'Full Home Interior';
  let selectedTier = 'Bespoke Luxury';

  // Base pricing matrix (in Lakhs INR)
  const basePrices = {
    '1 BHK': { 'Full Home Interior': 8.5, 'Modular Kitchen + Wardrobes': 4.5, 'Living & Dining': 3.5, 'Consultation Only': 0.5 },
    '2 BHK': { 'Full Home Interior': 14.5, 'Modular Kitchen + Wardrobes': 7.5, 'Living & Dining': 5.5, 'Consultation Only': 0.8 },
    '3 BHK': { 'Full Home Interior': 22.0, 'Modular Kitchen + Wardrobes': 11.0, 'Living & Dining': 8.0, 'Consultation Only': 1.2 },
    '4 BHK / Villa': { 'Full Home Interior': 36.0, 'Modular Kitchen + Wardrobes': 16.0, 'Living & Dining': 12.0, 'Consultation Only': 1.8 },
    'Commercial Office': { 'Full Home Interior': 28.0, 'Modular Kitchen + Wardrobes': 8.0, 'Living & Dining': 14.0, 'Consultation Only': 1.5 }
  };

  const tierMultipliers = {
    'Essential Luxury': 0.85,
    'Bespoke Luxury': 1.0,
    'Ultra Haute Couture': 1.45
  };

  const durationMap = {
    '1 BHK': '30 - 40 Days',
    '2 BHK': '40 - 50 Days',
    '3 BHK': '50 - 65 Days',
    '4 BHK / Villa': '70 - 90 Days',
    'Commercial Office': '45 - 60 Days'
  };

  function calculateEstimate() {
    const spaceData = basePrices[selectedSpace] || basePrices['3 BHK'];
    const baseCost = spaceData[selectedScope] || 20.0;
    const multiplier = tierMultipliers[selectedTier] || 1.0;
    const finalMin = (baseCost * multiplier).toFixed(1);
    const finalMax = (baseCost * multiplier * 1.25).toFixed(1);

    if (resultVal) {
      resultVal.textContent = `₹${finalMin}L - ₹${finalMax}L`;
    }
    if (resultDuration) {
      resultDuration.textContent = `Estimated Execution: ${durationMap[selectedSpace] || '45 - 60 Days'} with 10-Year Warranty`;
    }

    if (whatsappSubmitBtn) {
      const msg = encodeURIComponent(
        `Hi Aditi Interiors, I'm interested in an interior solution for my ${selectedSpace}.\n` +
        `• Scope: ${selectedScope}\n` +
        `• Finish Tier: ${selectedTier}\n` +
        `• Estimated Budget: ₹${finalMin}L - ₹${finalMax}L\n\n` +
        `Please arrange a free design consultation and site visit.`
      );
      whatsappSubmitBtn.href = `https://wa.me/919876543210?text=${msg}`;
    }
  }

  // Button group listeners
  spaceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      spaceBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      selectedSpace = e.currentTarget.getAttribute('data-calc-space');
      calculateEstimate();
    });
  });

  scopeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      scopeBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      selectedScope = e.currentTarget.getAttribute('data-calc-scope');
      calculateEstimate();
    });
  });

  tierBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tierBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      selectedTier = e.currentTarget.getAttribute('data-calc-tier');
      calculateEstimate();
    });
  });

  function openModal() {
    if (quoteModal) {
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      calculateEstimate();
    }
  }

  function closeModal() {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  quoteTriggers.forEach(btn => btn.addEventListener('click', openModal));
  if (quoteClose) quoteClose.addEventListener('click', closeModal);
  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeModal();
    });
  }

  // Pre-fill calculation
  calculateEstimate();
}

// Function to open quote modal with project context
window.openQuoteModalWithProject = function(projectName, category) {
  const quoteModal = document.getElementById('quoteModal');
  if (quoteModal) {
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const whatsappSubmitBtn = document.getElementById('calcWhatsAppSubmit');
    if (whatsappSubmitBtn) {
      const msg = encodeURIComponent(
        `Hi Aditi Interiors, I saw the "${projectName}" (${category}) in your portfolio and would love to design something similar for my space. Please schedule a free consultation.`
      );
      whatsappSubmitBtn.href = `https://wa.me/919876543210?text=${msg}`;
    }
  }
};

/* ==========================================================================
   6. VALUE PROPOSITION PILLARS HOVER / CLICK
   ========================================================================== */
function initPillarsInteractions() {
  const pillars = document.querySelectorAll('.pillar-item');
  pillars.forEach(pillar => {
    pillar.addEventListener('click', () => {
      const target = pillar.getAttribute('data-target-filter');
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
        if (target) {
          const matchingBtn = document.querySelector(`.filter-btn[data-filter="${target}"]`);
          if (matchingBtn) matchingBtn.click();
        }
      }
    });
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function initToast() {
  window.showToast = function(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#96B842" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };
}
