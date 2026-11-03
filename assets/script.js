/* ============================================================================
   HAIR THERAPY NASHVILLE — INTERACTIONS
   Vanilla JS · no dependencies · respects prefers-reduced-motion
   ============================================================================ */

(function () {
  "use strict";

  var CFG = window.HT_CONFIG || {};
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ------------------------------------------------------------------ *
     Load state — triggers hero headline / image choreography
     ------------------------------------------------------------------ */

  function markLoaded() {
    requestAnimationFrame(function () {
      document.body.classList.add("is-loaded");
    });
  }
  if (document.readyState === "complete") markLoaded();
  else window.addEventListener("load", markLoaded);

  /* ------------------------------------------------------------------ *
     Config-driven content rendering
     ------------------------------------------------------------------ */

  function renderServices() {
    var grid = $("#serviceGrid");
    if (!grid || !CFG.services) return;
    var frag = document.createDocumentFragment();
    CFG.services.forEach(function (s) {
      var price = CFG.flags && CFG.flags.showServicePrices && s.price
        ? '<span class="service-price">' + s.price + "</span>"
        : "";
      frag.appendChild(el("a", "service-card",
        '<figure class="service-figure">' +
          '<img src="' + s.image + '" alt="' + s.alt + '" loading="lazy" />' +
          '<span class="service-index">' + s.number + "</span>" +
        "</figure>" +
        '<div class="service-body">' +
          '<h3 class="service-name">' + s.name + "</h3>" +
          '<p class="service-blurb">' + s.blurb + "</p>" +
          price +
          '<span class="service-cta">Book this service <span aria-hidden="true">\u2197</span></span>' +
        "</div>"));
    });
    grid.appendChild(frag);
    // wire the whole card to the booking URL
    $$(".service-card", grid).forEach(function (card, i) {
      card.href = CFG.services[i].bookingUrl || CFG.business.bookingUrl;
      card.target = "_blank";
      card.rel = "noopener";
    });
  }

  var galleryItems = [];   // kept in order for the lightbox

  function renderGallery() {
    var grid = $("#galleryGrid");
    var filters = $("#galleryFilters");
    if (!grid || !CFG.gallery) return;
    var frag = document.createDocumentFragment();
    CFG.gallery.forEach(function (g, i) {
      var fig = el("figure", "gallery-item");
      fig.dataset.cat = g.cat;
      fig.dataset.index = String(i);
      fig.innerHTML =
        '<button class="gallery-open" type="button" aria-label="View larger: ' + g.caption + '" style="display:block;width:100%;padding:0;">' +
          '<img src="' + g.file + '" alt="' + g.alt + '" loading="lazy" width="' + g.w + '" height="' + g.h + '" />' +
        "</button>" +
        '<figcaption class="gallery-caption"><span>' + g.caption + "</span><i>+</i></figcaption>";
      frag.appendChild(fig);
      galleryItems.push(g);
    });
    grid.appendChild(frag);

    if (filters && CFG.galleryFilters) {
      var ffrag = document.createDocumentFragment();
      CFG.galleryFilters.forEach(function (f, i) {
        var b = el("button", "filter-btn" + (i === 0 ? " is-active" : ""), f.label);
        b.type = "button";
        b.dataset.key = f.key;
        b.addEventListener("click", function () {
          $$(".filter-btn", filters).forEach(function (x) { x.classList.toggle("is-active", x === b); });
          filterGallery(f.key);
        });
        ffrag.appendChild(b);
      });
      filters.appendChild(ffrag);
    }
  }

  function filterGallery(key) {
    $$("#galleryGrid .gallery-item").forEach(function (item) {
      var show = key === "all" || item.dataset.cat === key;
      item.classList.toggle("is-hidden", !show);
    });
  }

  function renderReviews() {
    var track = $("#reviewTrack");
    if (!track || !CFG.reviews) return;
    var frag = document.createDocumentFragment();
    CFG.reviews.forEach(function (r) {
      frag.appendChild(el("article", "rev-card",
        '<blockquote class="rev-quote">' + r.quote + "</blockquote>" +
        '<footer class="rev-attr">' +
          '<span class="rev-name">' + r.name + "</span>" +
          '<span class="rev-src">via <strong>' + r.source + "</strong> · " + r.when + "</span>" +
        "</footer>"));
    });
    track.appendChild(frag);
  }

  function renderHours() {
    var list = $("#hoursList");
    if (!list || !CFG.hours) return;
    var order = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = order[new Date().getDay()];
    var frag = document.createDocumentFragment();
    CFG.hours.forEach(function (h) {
      var isToday = h.day === today;
      var row = el("div", "h-row" + (isToday ? " is-today" : ""),
        "<dt>" + h.day + "</dt><dd>" + h.time + "</dd>");
      if (isToday) row.setAttribute("aria-current", "date");
      frag.appendChild(row);
    });
    list.appendChild(frag);
  }

  function renderStylist() {
    if (!CFG.stylist) return;
    var n = $("#stylistName"), r = $("#stylistRole"), b = $("#stylistBook");
    if (!n || !CFG.stylist.name) return;
    n.textContent = CFG.stylist.name;
    if (r && CFG.stylist.role) r.textContent = CFG.stylist.role;
    if (b) b.textContent = CFG.stylist.bookingText || "Book an appointment";
  }

  function renderContact() {
    if (!CFG.business) return;
    var b = CFG.business;
    var p = $("#visitPhone"), e = $("#visitEmail");
    if (p) { p.textContent = b.phoneDisplay; p.href = "tel:" + b.phoneHref; }
    if (e) { e.textContent = b.email; }
  }

  renderServices();
  renderGallery();
  renderReviews();
  renderHours();
  renderStylist();
  renderContact();

  /* ------------------------------------------------------------------ *
     Scroll reveals (staggered)
     ------------------------------------------------------------------ */

  var revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (elNode, i) {
      elNode.style.setProperty("--d", (i % 4) * 90 + "ms");
      io.observe(elNode);
    });
  } else {
    revealEls.forEach(function (elNode) { elNode.classList.add("in-view"); });
  }

  /* ------------------------------------------------------------------ *
     Parallax (desktop only, disabled with reduced motion)
     ------------------------------------------------------------------ */

  var parallaxEls = [];
  $$("[data-parallax]").forEach(function (elNode) {
    var inner = elNode.querySelector("img");
    if (inner) parallaxEls.push({ wrap: elNode, img: inner, factor: parseFloat(elNode.dataset.parallax) || 0.08 });
  });

  var ticking = false;

  function applyParallax() {
    var vh = window.innerHeight;
    parallaxEls.forEach(function (p) {
      var rect = p.wrap.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > vh + 80) return;
      var offset = (vh / 2 - (rect.top + rect.height / 2)) * p.factor;
      var maxShift = rect.height * 0.11;
      if (offset > maxShift) offset = maxShift;
      if (offset < -maxShift) offset = -maxShift;
      p.img.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      applyParallax();
      updateHeader();
      updateSpy();
      updateMobileActions();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  if (!prefersReduced && parallaxEls.length) {
    window.addEventListener("load", function () { setTimeout(applyParallax, 300); });
    applyParallax();
  }

  /* ------------------------------------------------------------------ *
     Header state + active section spy
     ------------------------------------------------------------------ */

  var head = $("#siteHead");

  function updateHeader() {
    if (!head) return;
    head.classList.toggle("is-stuck", window.scrollY > 48);
  }

  var spySections = ["philosophy", "services", "gallery", "stylist", "visit"]
    .map(function (id) { return document.getElementById(id); });

  function updateSpy() {
    var pos = window.scrollY + window.innerHeight * 0.34;
    var current = null;
    spySections.forEach(function (sec) {
      if (sec && sec.offsetTop <= pos) current = sec.id;
    });
    if (window.scrollY < 140) current = null;
    $$(".nav-link", head).forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  }

  /* ------------------------------------------------------------------ *
     Mobile navigation
     ------------------------------------------------------------------ */

  var menuToggle = $("#menuToggle");
  var siteNav = $("#siteNav");

  function closeMenu() {
    if (!siteNav) return;
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.documentElement.classList.remove("no-scroll");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.documentElement.classList.toggle("no-scroll", open);
    });
    $$("#siteNav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closeMenu();
    });
  }

  /* ------------------------------------------------------------------ *
     Before / After slider
     ------------------------------------------------------------------ */

  var baInput = $("#baRange");
  var baFrame = baInput ? baInput.parentElement : null;

  if (baInput) {
    var syncBA = function () {
      var v = parseFloat(baInput.value);
      (baFrame || document.documentElement).style.setProperty("--ba", v + "%");
    };
    baInput.addEventListener("input", syncBA);
    syncBA();
  }

  /* ------------------------------------------------------------------ *
     Lightbox
     ------------------------------------------------------------------ */

  var lightbox = $("#lightbox");
  var lbImg = $("#lightboxImg");
  var lbCaption = $("#lightboxCaption");
  var lbCount = $("#lightboxCount");
  var lbVisible = [];      // currently filtered items
  var lbIndex = 0;
  var lbLastFocus = null;

  function visibleGalleryItems() {
    return $$("#galleryGrid .gallery-item:not(.is-hidden)");
  }

  function lbShow(i) {
    var items = visibleGalleryItems();
    if (!items.length) return;
    if (i < 0) i = items.length - 1;
    if (i >= items.length) i = 0;
    lbIndex = i;
    var data = galleryItems[parseInt(items[i].dataset.index, 10)];
    if (!data) return;
    lbImg.src = data.file;
    lbImg.alt = data.alt;
    lbCaption.textContent = data.caption;
    lbCount.textContent = pad(i + 1) + " / " + pad(items.length);
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function lbOpen(startEl) {
    var items = visibleGalleryItems();
    var i = items.indexOf(startEl);
    lbOpenWith(i < 0 ? 0 : i);
  }

  function lbOpenWith(i) {
    lbVisible = visibleGalleryItems();
    lbLastFocus = document.activeElement;
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.documentElement.classList.add("no-scroll");
    lbShow(i);
    $("#lightboxClose").focus();
  }

  function lbClose() {
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    document.documentElement.classList.remove("no-scroll");
    if (lbLastFocus) lbLastFocus.focus();
  }

  if (lightbox) {
    $("#galleryGrid").addEventListener("click", function (ev) {
      var btn = ev.target.closest(".gallery-item");
      if (btn) lbOpen(btn);
    });
    $("#lightboxClose").addEventListener("click", lbClose);
    $("#lightboxPrev").addEventListener("click", function () { lbShow(lbIndex - 1); });
    $("#lightboxNext").addEventListener("click", function () { lbShow(lbIndex + 1); });
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox) lbClose();
    });
    document.addEventListener("keydown", function (ev) {
      if (lightbox.hidden) return;
      if (ev.key === "Escape") lbClose();
      if (ev.key === "ArrowLeft") lbShow(lbIndex - 1);
      if (ev.key === "ArrowRight") lbShow(lbIndex + 1);
    });
  }

  /* ------------------------------------------------------------------ *
     Reviews carousel
     ------------------------------------------------------------------ */

  var track = $("#reviewTrack");
  var prevBtn = $("#revPrev");
  var nextBtn = $("#revNext");
  var progress = $("#revProgress");

  function updateCarousel() {
    if (!track) return;
    var max = track.scrollWidth - track.clientWidth;
    var ratio = max > 0 ? track.scrollLeft / max : 1;
    if (progress) {
      var w = 14 + Math.max(0, Math.min(1, ratio)) * 86;
      progress.style.width = w.toFixed(1) + "%";
    }
    if (prevBtn) prevBtn.disabled = track.scrollLeft < 24;
    if (nextBtn) nextBtn.disabled = track.scrollLeft > max - 24;
  }

  if (track) {
    track.addEventListener("scroll", updateCarousel, { passive: true });
    window.addEventListener("resize", updateCarousel);
    updateCarousel();

    var step = function () { return Math.min(track.clientWidth * 0.9, 460); };
    prevBtn && prevBtn.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: prefersReduced ? "auto" : "smooth" }); });
    nextBtn && nextBtn.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: prefersReduced ? "auto" : "smooth" }); });

    // drag to scroll
    var isDown = false, startX = 0, startLeft = 0;
    track.addEventListener("pointerdown", function (ev) {
      isDown = true; startX = ev.clientX; startLeft = track.scrollLeft;
      track.setPointerCapture(ev.pointerId);
    });
    track.addEventListener("pointermove", function (ev) {
      if (!isDown) return;
      track.scrollLeft = startLeft - (ev.clientX - startX);
    });
    ["pointerup", "pointercancel"].forEach(function (t) {
      track.addEventListener(t, function () { isDown = false; });
    });
  }

  /* ------------------------------------------------------------------ *
     Mobile action bar visibility
     ------------------------------------------------------------------ */

  var mobileActions = $("#mobileActions");

  function updateMobileActions() {
    if (!mobileActions) return;
    var hero = document.querySelector(".hero");
    var threshold = hero ? hero.offsetHeight * 0.55 : 320;
    mobileActions.classList.toggle("is-visible", window.scrollY > threshold);
  }

  /* ------------------------------------------------------------------ *
     Footer year
     ------------------------------------------------------------------ */

  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

})();
