const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('a[href^="#"]');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const scrollTopButton = document.querySelector('#scroll-top');
const projectsGrid = document.querySelector('#projects-grid');
const projectsStatus = document.querySelector('#projects-status');
const reloadProjectsButton = document.querySelector('#reload-projects');
const contactForm = document.querySelector('#contact-form');
const formResult = document.querySelector('#form-result');
const year = document.querySelector('#year');
const githubUsername = document.querySelector('meta[name="github-username"]')?.content.trim();

const STORAGE_KEY = 'b4-1-theme';
const NAV_SCROLL_THRESHOLD = 60;
const TOP_BUTTON_THRESHOLD = 300;
const OBSERVER_THRESHOLD = 0.2;

// One explicit state object makes the mission's event → state → render flow traceable.
const STATE = {
  menuOpen: false,
  theme: 'light',
  projects: {
    status: 'idle',
    items: [],
    error: '',
  },
  form: {
    valid: false,
    errors: {},
  },
};

const renderMenu = () => {
  navMenu.classList.toggle('active', STATE.menuOpen);
  menuToggle.setAttribute('aria-expanded', String(STATE.menuOpen));
};

const setMenuState = (open) => {
  STATE.menuOpen = open;
  renderMenu();
};

const renderTheme = () => {
  document.documentElement.dataset.theme = STATE.theme;
  const isDark = STATE.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeIcon.textContent = isDark ? '☀️' : '🌙';
};

const setTheme = (theme, persist = false) => {
  STATE.theme = theme;
  renderTheme();
  if (persist) {
    localStorage.setItem(STORAGE_KEY, theme);
  }
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (systemDark ? 'dark' : 'light'));
};

const showProjectStatus = (message) => {
  projectsStatus.textContent = message;
  projectsStatus.classList.remove('hidden');
};

const hideProjectStatus = () => {
  projectsStatus.classList.add('hidden');
};

const createProjectCard = (repository) => {
  const article = document.createElement('article');
  article.classList.add('project-card');

  const title = document.createElement('h3');
  title.textContent = repository.name;

  const description = document.createElement('p');
  description.textContent = repository.description || '설명이 등록되지 않은 GitHub 저장소입니다.';

  const meta = document.createElement('p');
  meta.classList.add('project-meta');
  meta.textContent = `★ ${repository.stargazers_count} · ${repository.language || 'Language 미지정'}`;

  const link = document.createElement('a');
  link.classList.add('project-link');
  link.href = repository.html_url;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = 'GitHub에서 보기';

  article.append(title, description, meta, link);
  return article;
};

const renderProjects = () => {
  projectsGrid.innerHTML = '';
  const { status, items, error } = STATE.projects;

  if (status === 'loading') {
    showProjectStatus('프로젝트를 불러오는 중입니다.');
    reloadProjectsButton.textContent = '불러오는 중...';
    reloadProjectsButton.disabled = true;
    return;
  }

  reloadProjectsButton.disabled = false;
  reloadProjectsButton.textContent = status === 'error' ? '다시 시도' : '다시 불러오기';

  if (status === 'error') {
    showProjectStatus(error || '프로젝트를 불러올 수 없습니다.');
    return;
  }

  if (status === 'empty') {
    showProjectStatus('표시할 프로젝트가 없습니다.');
    return;
  }

  if (status === 'success') {
    hideProjectStatus();
    // map transforms GitHub data into card DOM nodes; forEach attaches them.
    const cards = items.slice(0, 8).map((repository) => createProjectCard(repository));
    cards.forEach((card) => projectsGrid.append(card));
    return;
  }

  showProjectStatus('프로젝트를 불러올 준비가 되었습니다.');
};

const setProjectsState = (nextState) => {
  STATE.projects = { ...STATE.projects, ...nextState };
  renderProjects();
};

const loadProjects = async () => {
  if (!githubUsername) {
    setProjectsState({
      status: 'error',
      items: [],
      error: 'GitHub 사용자 이름이 설정되지 않았습니다.',
    });
    return;
  }

  setProjectsState({ status: 'loading', items: [], error: '' });

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?sort=updated&per_page=30`);
    if (!response.ok) {
      throw new Error(`GitHub API 응답 오류: ${response.status}`);
    }

    const repositories = await response.json();
    const publicRepositories = repositories.filter((repository) => !repository.fork);
    setProjectsState({
      status: publicRepositories.length === 0 ? 'empty' : 'success',
      items: publicRepositories,
      error: '',
    });
  } catch (error) {
    console.error(error);
    setProjectsState({
      status: 'error',
      items: [],
      error: '프로젝트를 불러올 수 없습니다. 다시 시도해 주세요.',
    });
  }
};

const validateField = (field) => {
  const errorElement = document.querySelector(`#${field.id}-error`);
  let message = '';

  if (field.validity.valueMissing) {
    message = '필수 입력 항목입니다.';
  } else if (field.validity.typeMismatch) {
    message = '이메일 형식을 확인해 주세요.';
  } else if (field.validity.tooShort) {
    message = `최소 ${field.minLength}자 이상 입력해 주세요.`;
  }

  STATE.form.errors[field.id] = message;
  field.classList.toggle('invalid', Boolean(message));
  field.setAttribute('aria-invalid', String(Boolean(message)));
  errorElement.textContent = message;
  return message === '';
};

const renderFormResult = () => {
  formResult.textContent = STATE.form.valid
    ? '입력 검증을 통과했습니다. 이 Reference 폼은 서버로 전송하지 않습니다.'
    : '입력 내용을 확인해 주세요.';
};

menuToggle.addEventListener('click', () => {
  setMenuState(!STATE.menuOpen);
});

themeToggle.addEventListener('click', () => {
  const nextTheme = STATE.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme, true);
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuState(false);
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY >= NAV_SCROLL_THRESHOLD);
  scrollTopButton.classList.toggle('visible', window.scrollY >= TOP_BUTTON_THRESHOLD);
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

reloadProjectsButton.addEventListener('click', loadProjects);

contactForm.addEventListener('input', (event) => {
  const field = event.target;
  if (field.matches('input, textarea')) {
    validateField(field);
    STATE.form.valid = false;
    formResult.textContent = '';
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = contactForm.querySelectorAll('input, textarea');
  let valid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      valid = false;
    }
  });

  STATE.form.valid = valid;
  renderFormResult();

  if (valid) {
    contactForm.reset();
    STATE.form.errors = {};
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: OBSERVER_THRESHOLD }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

year.textContent = new Date().getFullYear();
renderMenu();
loadTheme();
renderProjects();
loadProjects();
