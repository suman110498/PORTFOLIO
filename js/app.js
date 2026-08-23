/**
 * Portfolio Application Engine
 * Handles initialization, dynamic rendering, animations, interactions, and accessibility.
 */

document.addEventListener("DOMContentLoaded", () => {
  initPortfolio();
});

function initPortfolio() {
  renderAllSections();
  initScrollProgress();
  initStickyNavbar();
  initMobileMenu();
  initSmoothScrollAndActiveNav();
  initAnimatedCounters();
  initEducationHover();
  initInternshipPopupCarousel();
  initProjectsCarousel();
  initModals();
  initContactForm();
  initBackToTop();
  initScrollCursor();
}

/**
 * Render sections dynamically from data.js via components.js
 */
function renderAllSections() {
  const headerContainer = document.getElementById("header-root");
  const heroContainer = document.getElementById("hero-root");
  const tickerContainer = document.getElementById("ticker-root");
  const aboutContainer = document.getElementById("about-root");
  const educationContainer = document.getElementById("education-root");
  const experienceContainer = document.getElementById("experience-root");
  const internshipProjectsContainer = document.getElementById("internship-projects-root");
  const projectsContainer = document.getElementById("projects-root");
  const certificationsContainer = document.getElementById("certifications-root");
  const extracurricularContainer = document.getElementById("extracurricular-root");
  const contactContainer = document.getElementById("contact-root");
  const footerContainer = document.getElementById("footer-root");
  const modalsContainer = document.getElementById("modals-root");

  if (headerContainer) headerContainer.innerHTML = Components.renderNavigation(portfolioData);
  if (heroContainer) heroContainer.innerHTML = Components.renderHero(portfolioData);
  if (tickerContainer) tickerContainer.innerHTML = Components.renderTicker(portfolioData);
  if (aboutContainer) aboutContainer.innerHTML = Components.renderAbout(portfolioData);
  if (educationContainer) educationContainer.innerHTML = Components.renderEducation(portfolioData);
  if (experienceContainer) experienceContainer.innerHTML = Components.renderExperience(portfolioData);
  if (internshipProjectsContainer) internshipProjectsContainer.innerHTML = Components.renderInternshipProjects(portfolioData);
  if (projectsContainer) projectsContainer.innerHTML = Components.renderFeaturedProjects(portfolioData);
  if (certificationsContainer) certificationsContainer.innerHTML = Components.renderCertifications(portfolioData);
  if (extracurricularContainer) extracurricularContainer.innerHTML = Components.renderActivities(portfolioData);
  if (contactContainer) contactContainer.innerHTML = Components.renderContact(portfolioData);
  if (footerContainer) footerContainer.innerHTML = Components.renderFooter(portfolioData);
  if (modalsContainer) modalsContainer.innerHTML = Components.renderModalsAndToasts();
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgressBar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/**
 * Sticky Navbar styling on scroll
 */
function initStickyNavbar() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Drawer Menu
 */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const backdrop = document.getElementById("mobileBackdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-list .nav-link, .mobile-cta");

  if (!hamburgerBtn || !mobileDrawer || !backdrop) return;

  const openDrawer = () => {
    mobileDrawer.classList.add("open");
    backdrop.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("open");
    backdrop.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  hamburgerBtn.addEventListener("click", openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/**
 * Smooth Scrolling & Active Section Highlighting (Scroll Spy)
 */
function initSmoothScrollAndActiveNav() {
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link, .mobile-nav .nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scroll click handler
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || !targetId.startsWith("#")) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Intersection Observer for Active Link
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Animated KPI and Hero Number Counters
 */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll(".count-up");
  if (!counterElements.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start);
      }
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => counterObserver.observe(el));
}

/**
 * Featured Projects Carousel (Single Project Centered, Circular Loop Navigation)
 */
function initProjectsCarousel() {
  const track = document.getElementById("projectsCarouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const prevBtnMobile = document.getElementById("carouselPrevMobile");
  const nextBtnMobile = document.getElementById("carouselNextMobile");
  const dotsContainer = document.getElementById("carouselDots");
  const container = document.getElementById("projectsCarouselContainer");

  if (!track || !container) return;

  const slides = track.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;

  const updateCarousel = (index) => {
    // Circular loop support
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Apply transform translation
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".carousel-dot");
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  };

  // Button clicks with wrap-around
  const handlePrev = () => {
    updateCarousel(currentIndex - 1);
  };

  const handleNext = () => {
    updateCarousel(currentIndex + 1);
  };

  if (prevBtn) prevBtn.addEventListener("click", handlePrev);
  if (nextBtn) nextBtn.addEventListener("click", handleNext);
  if (prevBtnMobile) prevBtnMobile.addEventListener("click", handlePrev);
  if (nextBtnMobile) nextBtnMobile.addEventListener("click", handleNext);

  // Dot clicks
  if (dotsContainer) {
    dotsContainer.addEventListener("click", (e) => {
      const dot = e.target.closest(".carousel-dot");
      if (dot) {
        const slideIndex = parseInt(dot.getAttribute("data-slide-to"), 10);
        if (!isNaN(slideIndex)) {
          updateCarousel(slideIndex);
        }
      }
    });
  }

  // Keyboard navigation when container is in focus or hovered
  container.setAttribute("tabindex", "0");
  container.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const threshold = 40;
    if (touchStartX - touchEndX > threshold) {
      handleNext();
    } else if (touchEndX - touchStartX > threshold) {
      handlePrev();
    }
  };

  // Initial state setup
  updateCarousel(0);
}

/**
 * Modals Management (Including One-Click Certificate PDF Preview & Download)
 */
function initModals() {
  const triggers = document.querySelectorAll(".modal-trigger");
  const certPdfBtns = document.querySelectorAll(".cert-pdf-modal-btn");
  const closeButtons = document.querySelectorAll("[data-close-modal]");
  
  const pdfModal = document.getElementById("certPdfModal");
  const pdfModalTitle = document.getElementById("pdfModalTitle");
  const pdfModalIssuer = document.getElementById("pdfModalIssuer");
  const pdfViewerFrame = document.getElementById("pdfViewerFrame");
  const pdfDownloadBtn = document.getElementById("pdfDownloadBtn");

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      
      // If closing PDF modal, clear iframe src to stop background memory/audio
      if (modal.id === "certPdfModal" && pdfViewerFrame) {
        pdfViewerFrame.src = "";
      }
    }
  };

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      if (modalId) openModal(modalId);
    });
  });

  // One-Click Certificate PDF Modal View & Download
  certPdfBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-cert-title") || "Certificate Preview";
      const issuer = btn.getAttribute("data-cert-issuer") || "IBM";
      const id = btn.getAttribute("data-cert-id") || "";
      const pdfPath = btn.getAttribute("data-cert-pdf") || "";

      if (pdfModalTitle) pdfModalTitle.textContent = title;
      if (pdfModalIssuer) pdfModalIssuer.textContent = `${issuer} VERIFIED CREDENTIAL • ID: ${id}`;
      
      if (pdfViewerFrame && pdfPath) {
        // Append #view=FitH for clean PDF presentation in browser viewer
        pdfViewerFrame.src = `${pdfPath}#view=FitH`;
      }

      if (pdfDownloadBtn && pdfPath) {
        pdfDownloadBtn.href = pdfPath;
        const fileName = pdfPath.split("/").pop() || "certificate.pdf";
        pdfDownloadBtn.setAttribute("download", fileName);
      }

      openModal("certPdfModal");
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-backdrop");
      closeModal(modal);
    });
  });

  document.querySelectorAll(".modal-backdrop").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.show").forEach(m => closeModal(m));
    }
  });
}

/**
 * Contact Form with Mailto Fallback & Toast Notification
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const subjectInput = document.getElementById("userSubject");
  const messageInput = document.getElementById("userMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset error styles
    document.querySelectorAll(".form-error").forEach(el => el.classList.remove("visible"));
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => inp.classList.remove("input-invalid"));

    if (!nameInput.value.trim()) {
      showError("nameError", nameInput);
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError("emailError", emailInput);
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      showError("subjectError", subjectInput);
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showError("messageError", messageInput);
      isValid = false;
    }

    if (isValid) {
      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(`Hello Sumit,\n\nMy name is ${decodeURIComponent(name)} (${decodeURIComponent(email)}).\n\n${messageInput.value.trim()}`);

      const recipientEmail = (typeof portfolioData !== 'undefined' && portfolioData.personal && portfolioData.personal.email) ? portfolioData.personal.email : 'sks110498@gmail.com';
      const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

      showToast("Opening your default mail client...", "success");

      setTimeout(() => {
        window.location.href = mailtoUrl;
        form.reset();
      }, 700);
    }
  });

  function showError(errorId, inputEl) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.add("visible");
    if (inputEl) inputEl.classList.add("input-invalid");
  }
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

/**
 * Back To Top Button
 */
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Interactive Education Timeline Hover & Touch Handler
 * Ensures seamless, mutually exclusive active states for card border and connected yellow dot.
 */
function initEducationHover() {
  const timelineItems = document.querySelectorAll(".education-timeline .timeline-item");
  if (!timelineItems.length) return;

  timelineItems.forEach(item => {
    // Mouse hover events
    item.addEventListener("mouseenter", () => {
      timelineItems.forEach(other => other.classList.remove("active-hover"));
      item.classList.add("active-hover");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("active-hover");
    });

    // Keyboard Focus events
    item.addEventListener("focusin", () => {
      timelineItems.forEach(other => other.classList.remove("active-hover"));
      item.classList.add("active-hover");
    });

    item.addEventListener("focusout", () => {
      item.classList.remove("active-hover");
    });

    // Mobile touch interaction
    item.addEventListener("touchstart", () => {
      const isAlreadyActive = item.classList.contains("active-hover");
      timelineItems.forEach(other => other.classList.remove("active-hover"));
      if (!isAlreadyActive) {
        item.classList.add("active-hover");
      }
    }, { passive: true });
  });

  // Tap outside on mobile clears touch highlight
  document.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".education-timeline")) {
      timelineItems.forEach(item => item.classList.remove("active-hover"));
    }
  }, { passive: true });
}

/**
 * Scroll Cursor State
 * Adds .is-scrolling to <body> while the user scrolls (mouse devices only).
 * 300 ms after scrolling stops the class is removed.
 * CSS uses this class to switch the body cursor to crosshair (analytics feel),
 * while all clickable elements retain cursor: pointer priority.
 */
function initScrollCursor() {
  // Only activate on devices that support hover + fine pointer (mouse)
  const isMouseDevice = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!isMouseDevice.matches) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) return;

  let scrollTimeout = null;

  const onScroll = () => {
    document.body.classList.add("is-scrolling");

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Remove the class 300 ms after the last scroll event
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove("is-scrolling");
      scrollTimeout = null;
    }, 300);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

/**
 * Internship Experience Popup Carousel Handler
 * Manages carousel navigation, pagination dots, close button, touch and click toggle.
 */
function initInternshipPopupCarousel() {
  const wrapper = document.querySelector(".internship-main-card-wrapper");
  const card = document.getElementById("internshipMainCard");
  const overlay = document.getElementById("internPopupOverlay");
  const prevBtn = document.getElementById("popupCarouselPrev");
  const nextBtn = document.getElementById("popupCarouselNext");
  const closeBtn = document.getElementById("internPopupCloseBtn");
  const dots = document.querySelectorAll("#popupPaginationDots .popup-dot");
  const slides = document.querySelectorAll(".intern-popup-slide");

  if (!wrapper || !slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  const showSlide = (index) => {
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(currentSlide + 1);
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(idx);
    });
  });

  // Close button handler
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      wrapper.classList.remove("popup-active");
    });
  }

  // Click on card opens / toggles popup (useful for mobile & accessible focus)
  if (card) {
    card.addEventListener("click", (e) => {
      if (e.target.closest("#internPopupOverlay")) return;
      wrapper.classList.toggle("popup-active");
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        wrapper.classList.toggle("popup-active");
      }
    });
  }

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("popup-active");
    }
  });

  // Escape key closes popup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrapper.classList.contains("popup-active")) {
      wrapper.classList.remove("popup-active");
    }
  });
}

