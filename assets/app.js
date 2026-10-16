const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Закрыть' : 'Меню';
  });

  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('.form-message');
    message.textContent = 'Спасибо! Это демонстрационная форма — подключение отправки будет следующим этапом.';
    form.querySelector('button').textContent = 'Заявка заполнена ✓';
  });
});

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const hero = document.querySelector('.hero');
if (hero && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const box = hero.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    hero.style.setProperty('--hero-x', `${x * 16}px`);
    hero.style.setProperty('--hero-y', `${y * 10}px`);
    hero.style.setProperty('--glow-x', `${x * -34}px`);
    hero.style.setProperty('--glow-y', `${y * -24}px`);
  });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--hero-x', '0px');
    hero.style.setProperty('--hero-y', '0px');
    hero.style.setProperty('--glow-x', '0px');
    hero.style.setProperty('--glow-y', '0px');
  });
}
