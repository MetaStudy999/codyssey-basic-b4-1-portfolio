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

const setMenuState = (open) => {
  navMenu.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeIcon.textContent = isDark ? '☀️' : '🌙';
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));
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

const renderProjects = (repositories) => {
  projectsGrid.innerHTML = '';

  if (repositories.length === 0) {
    showProjectStatus('공개 저장소가 없습니다.');
    return;
  }

  hideProjectStatus();
  repositories.slice(0, 8).forEach((repository) => {
    projectsGrid.append(createProjectCard(repository));
  });
};

const loadProjects = async () => {
  if (!githubUsername) {
    showProjectStatus('GitHub 사용자 이름이 설정되지 않았습니다.');
    return;
  }

  showProjectStatus('프로젝트를 불러오는 중입니다.');
  projectsGrid.innerHTML = '';
  reloadProjectsButton.disabled = true;

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?sort=updated&per_page=30`);
    if (!response.ok) {
      throw new Error(`GitHub API 응답 오류: ${response.status}`);
    }

    const repositories = await response.json();
    const publicRepositories = repositories.filter((repository) => !repository.fork);
    renderProjects(publicRepositories);
  } catch (error) {
    console.error(error);
    showProjectStatus('프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
  } finally {
    reloadProjectsButton.disabled = false;
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

  field.classList.toggle('invalid', Boolean(message));
  field.setAttribute('aria-invalid', String(Boolean(message)));
  errorElement.textContent = message;
  return message === '';
};

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem(STORAGE_KEY, nextTheme);
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

  if (!valid) {
    formResult.textContent = '입력 내용을 확인해 주세요.';
    return;
  }

  formResult.textContent = '입력 검증을 통과했습니다. 이 Reference 폼은 서버로 전송하지 않습니다.';
  contactForm.reset();
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
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

year.textContent = new Date().getFullYear();
loadTheme();
loadProjects();
