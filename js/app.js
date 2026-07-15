const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll('.stat-card strong');

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const duration = 1300;
      const startTime = performance.now();

      const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        el.textContent = `${value}+`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  },
  { threshold: 0.65 }
);

counters.forEach((counter) => counterObserver.observe(counter));
