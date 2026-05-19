/* ============================================================
   KYOTO BAMBOO — v4
   ============================================================ */
(function () {
    'use strict';
    const header = document.getElementById('site-header');
    const TRIGGER = 80;
    function update() {
        if (!header) return;
        header.classList.toggle('is-scrolled', window.scrollY > TRIGGER);
    }
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () { update(); ticking = false; });
            ticking = true;
        }
    }
    const targets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && targets.length) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.10, rootMargin: '0px 0px -60px 0px' });
        targets.forEach(function (el) { io.observe(el); });
    } else {
        targets.forEach(function (el) { el.classList.add('is-visible'); });
    }
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const open = nav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(open));
        });
        nav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                nav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', update);
    update();
})();
