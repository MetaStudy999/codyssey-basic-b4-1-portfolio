const GITHUB_USER = "MetaStudy999";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`;
const THEME_KEY = "b4-1-theme";
const NAV_SCROLL_THRESHOLD = 60;
const SCROLL_TOP_THRESHOLD = 300;
const OBSERVER_THRESHOLD = 0.25;

const STATE = {
  theme: "light",
  menuOpen: false,
  projects: {
    status: "idle",
    items: [],
    error: "",
  },
  form: {
    values: {
      name: "",
      email: "",
      message: "",
    },
    errors: {},
    submitted: false,
  },
};

const elements = {
  root: document.documentElement,
  header: document.querySelector(".site-header"),
  menuToggle: document.querySelector(".menu-toggle"),
  navLinks: document.querySelector(".nav-links"),
  navAnchors: document.querySelectorAll('.nav-links a[href^="#"]'),
  themeToggle: document.querySelector(".theme-toggle"),
  themeLabel: document.querySelector(".theme-label"),
  scrollTop: document.querySelector("#scroll-top"),
  projectStatus: document.querySelector("#project-status"),
  projectList: document.querySelector("#project-list"),
  projectsRetry: document.querySelector("#projects-retry"),
  form: document.querySelector("#contact-form"),
  formResult: document.querySelector("#form-result"),
  currentYear: document.querySelector("#current-year"),
  revealItems: document.querySelectorAll(".reveal"),
};

const getSavedTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch (error) {
    return "light";
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.warn("Theme preference could not be saved.", error);
  }
};

const renderTheme = () => {
  const isDark = STATE.theme === "dark";
  elements.root.dataset.theme = STATE.theme;
  elements.themeToggle.setAttribute("aria-pressed", String(isDark));
  elements.themeToggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  elements.themeLabel.textContent = isDark ? "Light" : "Dark";
};

const toggleTheme = () => {
  STATE.theme = STATE.theme === "dark" ? "light" : "dark";
  saveTheme(STATE.theme);
  renderTheme();
};

const renderMenu = () => {
  elements.navLinks.classList.toggle("active", STATE.menuOpen);
  elements.menuToggle.setAttribute("aria-expanded", String(STATE.menuOpen));
  elements.menuToggle.setAttribute("aria-label", STATE.menuOpen ? "메뉴 닫기" : "메뉴 열기");
};

const closeMenu = () => {
  STATE.menuOpen = false;
  elements.navLinks.classList.remove("active");
  renderMenu();
};

const toggleMenu = () => {
  STATE.menuOpen = !STATE.menuOpen;
  renderMenu();
};

const handleScroll = () => {
  const isHeaderScrolled = window.scrollY >= NAV_SCROLL_THRESHOLD;
  const showScrollTop = window.scrollY >= SCROLL_TOP_THRESHOLD;

  if (isHeaderScrolled) {
    elements.header.classList.add("scrolled");
  } else {
    elements.header.classList.remove("scrolled");
  }

  elements.scrollTop.classList.toggle("visible", showScrollTop);
};

const smoothScrollTo = (event) => {
  const targetId = event.currentTarget.getAttribute("href");
  const target = document.querySelector(targetId);

  if (!target) {
    return;
  }

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu();
};

const projectCardTemplate = (repo) => {
  const { name, description, html_url: url, language, stargazers_count: stars } = repo;
  const safeDescription = description || "설명이 등록되지 않은 저장소입니다.";
  const safeLanguage = language || "N/A";

  return `
    <article class="project-card">
      <h3>${escapeHtml(name)}</h3>
      <p>${escapeHtml(safeDescription)}</p>
      <div class="project-meta" aria-label="프로젝트 메타 정보">
        <span>${escapeHtml(safeLanguage)}</span>
        <span>★ ${stars}</span>
      </div>
      <a class="project-link" href="${encodeURI(url)}" target="_blank" rel="noopener noreferrer">GitHub에서 보기</a>
    </article>
  `;
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const renderProjects = () => {
  const { status, items, error } = STATE.projects;

  elements.projectList.innerHTML = "";
  elements.projectsRetry.hidden = true;

  if (status === "loading") {
    elements.projectStatus.innerHTML = `
      <div class="status-box">
        <span class="spinner" aria-hidden="true"></span>
        <span>프로젝트를 불러오는 중입니다...</span>
      </div>
    `;
    return;
  }

  if (status === "error") {
    elements.projectStatus.innerHTML = `
      <div class="status-box error">
        <span>${escapeHtml(error || "프로젝트를 불러올 수 없습니다.")}</span>
      </div>
    `;
    elements.projectsRetry.hidden = false;
    return;
  }

  if (status === "success" && items.length === 0) {
    elements.projectStatus.innerHTML = `
      <div class="status-box empty">표시할 프로젝트가 없습니다.</div>
    `;
    return;
  }

  if (status === "success") {
    elements.projectStatus.textContent = `${items.length}개의 프로젝트를 불러왔습니다.`;
    elements.projectList.innerHTML = items.map(projectCardTemplate).join("");
    return;
  }

  elements.projectStatus.textContent = "프로젝트를 준비하고 있습니다.";
};

const loadProjects = async () => {
  STATE.projects.status = "loading";
  STATE.projects.error = "";
  renderProjects();

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API 요청 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.");
      }
      throw new Error(`프로젝트를 불러올 수 없습니다. (HTTP ${response.status})`);
    }

    const data = await response.json();
    const repositories = Array.isArray(data) ? data : [];
    const visibleRepositories = repositories
      .filter((repo) => !repo.fork)
      .slice(0, 6);

    STATE.projects.items = visibleRepositories;
    STATE.projects.status = "success";
  } catch (error) {
    STATE.projects.items = [];
    STATE.projects.status = "error";
    STATE.projects.error = error instanceof Error ? error.message : "프로젝트를 불러올 수 없습니다.";
  }

  renderProjects();
};

const validateField = (name, value) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return "필수 입력값입니다.";
  }

  if (name === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return "올바른 이메일 형식을 입력해 주세요.";
    }
  }

  return "";
};

const renderFieldError = (name) => {
  const field = document.querySelector(`#${name}`);
  const errorElement = document.querySelector(`#${name}-error`);
  const message = STATE.form.errors[name] || "";

  errorElement.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
};

const updateFormField = (event) => {
  const { name, value } = event.target;

  STATE.form.values[name] = value;
  STATE.form.errors[name] = validateField(name, value);
  STATE.form.submitted = false;
  elements.formResult.textContent = "";
  renderFieldError(name);
};

const validateForm = () => {
  const fieldNames = Object.keys(STATE.form.values);

  fieldNames.forEach((name) => {
    STATE.form.errors[name] = validateField(name, STATE.form.values[name]);
    renderFieldError(name);
  });

  return fieldNames.every((name) => !STATE.form.errors[name]);
};

const resetFormState = () => {
  STATE.form.values = {
    name: "",
    email: "",
    message: "",
  };
  STATE.form.errors = {};

  ["name", "email", "message"].forEach((name) => {
    renderFieldError(name);
  });
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  elements.formResult.textContent = "";

  if (!validateForm()) {
    STATE.form.submitted = false;
    const firstInvalid = elements.form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  STATE.form.submitted = true;
  elements.formResult.textContent = "입력값을 확인했습니다. 이 데모에서는 실제 메시지를 전송하지 않습니다.";
  elements.form.reset();
  resetFormState();
};

const setupScrollObserver = () => {
  if (!("IntersectionObserver" in window)) {
    elements.revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: OBSERVER_THRESHOLD });

  elements.revealItems.forEach((item) => observer.observe(item));
};

const initialize = () => {
  STATE.theme = getSavedTheme();
  renderTheme();
  renderMenu();
  handleScroll();
  setupScrollObserver();

  elements.currentYear.textContent = String(new Date().getFullYear());

  elements.menuToggle.addEventListener("click", toggleMenu);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  elements.projectsRetry.addEventListener("click", loadProjects);
  elements.navAnchors.forEach((anchor) => anchor.addEventListener("click", smoothScrollTo));
  elements.form.addEventListener("submit", handleFormSubmit);
  elements.form.querySelectorAll("input, textarea").forEach((field) => field.addEventListener("input", updateFormField));
  window.addEventListener("scroll", handleScroll, { passive: true });

  loadProjects();
};

initialize();
