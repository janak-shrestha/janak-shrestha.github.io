/* Janak Shrestha — portfolio interactions (no dependencies) */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- UI strings (English at /, German at /de/) ---------- */
  var lang = (root.getAttribute("lang") || "en").slice(0, 2) === "de" ? "de" : "en";
  var T = {
    en: {
      pages: { index: ["01", "Index"], about: ["02", "About"], experience: ["03", "Experience"], stack: ["04", "Stack"], contact: ["05", "Contact"] },
      collapse: "Collapse changes", copied: "Copied ", sending: "Deploying message…",
      sent: "✓ Delivered. I'll get back to you soon.", sentToast: "Message delivered",
      failed: "Delivery failed. Please email me directly.", units: ["y", "d", "h", "m", "s"]
    },
    de: {
      pages: { index: ["01", "Start"], about: ["02", "Über mich"], experience: ["03", "Erfahrung"], stack: ["04", "Stack"], contact: ["05", "Kontakt"] },
      collapse: "Änderungen einklappen", copied: "Kopiert: ", sending: "Nachricht wird gesendet…",
      sent: "✓ Zugestellt. Ich melde mich bald bei Ihnen.", sentToast: "Nachricht zugestellt",
      failed: "Senden fehlgeschlagen. Bitte schreiben Sie mir direkt per E-Mail.", units: ["J", "T", "h", "m", "s"]
    }
  }[lang];

  /* ---------- Theme ---------- */
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  $$("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("js-theme", next); } catch (e) {}
    });
  });

  /* ---------- Page curtain transition ---------- */
  var curtainName = $(".curtain__name");
  var curtainNum = $(".curtain__num");
  function reveal() {
    if (!root.classList.contains("is-entering")) return;
    requestAnimationFrame(function () {
      root.classList.add("is-revealing");
      root.classList.remove("is-entering");
      setTimeout(function () { root.classList.remove("is-revealing"); }, 1500);
    });
  }
  if (document.readyState === "complete") setTimeout(reveal, 120);
  else window.addEventListener("load", function () { setTimeout(reveal, 120); });
  setTimeout(reveal, 1800); // safety net if an asset stalls

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) root.classList.remove("is-leaving", "is-entering", "is-revealing");
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || reduce) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download")) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    if (!/(\.html|\/)$/.test(url.pathname)) return;
    e.preventDefault();
    var dest = pageInfo(url.pathname);
    if (curtainName) curtainName.textContent = a.getAttribute("data-label") || dest.name;
    if (curtainNum) curtainNum.textContent = a.getAttribute("data-num") || dest.num;
    root.classList.remove("menu-open");
    root.classList.add("is-leaving");
    try { sessionStorage.setItem("js-nav", "1"); } catch (err) {}
    setTimeout(function () { location.href = url.href; }, 840);
  });

  function pageInfo(path) {
    var f = path.split("/").pop().replace(".html", "");
    var m = T.pages[f || "index"] || ["—", "…"];
    return { num: m[0], name: m[1] };
  }

  /* ---------- Header: scrolled / hide-on-scroll / progress ---------- */
  var header = $(".header");
  var progress = $(".progress");
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
      var hide = y > 400 && y > lastY + 4 && !root.classList.contains("menu-open");
      if (hide) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 400) header.classList.remove("is-hidden");
    }
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    }
    parallax();
    railProgress();
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = root.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("menu-open")) menuBtn.click();
    });
  }

  /* ---------- Split headings into masked words ---------- */
  $$(".split").forEach(function (el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span");
            w.className = "w";
            var inner = document.createElement("span");
            inner.style.setProperty("--i", i++);
            inner.textContent = p;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== "BR" && !child.classList.contains("hero__swap")) {
          walk(child);
        } else if (child.nodeType === 1 && child.classList.contains("hero__swap")) {
          var w = document.createElement("span");
          w.className = "w w--swap";
          var inner = document.createElement("span");
          inner.style.setProperty("--i", i++);
          child.parentNode.replaceChild(w, child);
          inner.appendChild(child);
          w.appendChild(inner);
        }
      });
    })(el);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = $$("[data-reveal], .split, .release, .portrait, .stats");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          if (en.target.hasAttribute("data-count") || en.target.querySelector("[data-count]")) countUp(en.target);
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); countUp(el); });
  }

  /* ---------- Counters ---------- */
  function countUp(scope) {
    var els = scope.hasAttribute && scope.hasAttribute("data-count") ? [scope] : $$("[data-count]", scope);
    els.forEach(function (el) {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      var target = parseFloat(el.getAttribute("data-count"));
      var numEl = el.querySelector(".v") || el;
      if (reduce) { numEl.textContent = target; return; }
      var start = performance.now();
      var dur = 1600;
      (function tick(t) {
        var p = Math.min(1, (t - start) / dur);
        var eased = 1 - Math.pow(1 - p, 4);
        numEl.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }

  /* ---------- Hero rotating word ---------- */
  var swap = $(".hero__swap");
  if (swap) {
    var words = $$("span", swap);
    var idx = 0;
    words[0].classList.add("on");
    if (!reduce && words.length > 1) {
      setInterval(function () {
        var cur = words[idx];
        cur.classList.remove("on");
        cur.classList.add("off");
        idx = (idx + 1) % words.length;
        var nxt = words[idx];
        nxt.classList.remove("off");
        // force restart from below
        nxt.style.transition = "none";
        nxt.style.transform = "translateY(105%)";
        void nxt.offsetWidth;
        nxt.style.transition = "";
        nxt.style.transform = "";
        nxt.classList.add("on");
        setTimeout(function () { cur.classList.remove("off"); }, 950);
      }, 2600);
    }
  }

  /* ---------- Parallax photo band ---------- */
  var bands = $$(".band img");
  function parallax() {
    if (reduce) return;
    bands.forEach(function (img) {
      var r = img.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.setProperty("--py", (c * -60).toFixed(1) + "px");
    });
  }

  /* ---------- Experience rail ---------- */
  var log = $(".log");
  var rail = $(".log__rail i");
  function railProgress() {
    if (!log || !rail) return;
    var r = log.getBoundingClientRect();
    var p = (window.innerHeight * 0.55 - r.top) / r.height;
    rail.style.setProperty("--lp", Math.max(0, Math.min(1, p)).toFixed(4));
  }

  $$("[data-more]").forEach(function (btn) {
    var list = document.getElementById(btn.getAttribute("aria-controls"));
    var hidden = $$("li[hidden]", list);
    var txt = $(".t", btn);
    var base = txt.textContent;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      hidden.forEach(function (li, k) {
        li.hidden = open;
        if (!open && !reduce) {
          li.animate([{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }],
            { duration: 450, delay: k * 35, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
        }
      });
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      txt.textContent = open ? base : T.collapse;
    });
  });

  /* ---------- Services rows (tap to open on touch) ---------- */
  $$(".row").forEach(function (row) {
    row.addEventListener("click", function () {
      if (window.matchMedia("(hover: hover)").matches) return;
      var was = row.classList.contains("open");
      $$(".row.open").forEach(function (r) { r.classList.remove("open"); });
      if (!was) row.classList.add("open");
    });
  });

  /* ---------- Stack filters ---------- */
  var chips = $$(".filters .chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      $$(".cat").forEach(function (cat) {
        var groups = (cat.getAttribute("data-group") || "").split(" ");
        cat.classList.toggle("dim", f !== "all" && groups.indexOf(f) === -1);
      });
    });
  });

  /* ---------- Career uptime (since first ops role, Mar 2013) ---------- */
  var up = $$("[data-uptime]");
  var since = new Date("2013-03-01T09:00:00+01:00").getTime();
  function tickUptime() {
    var s = Math.floor((Date.now() - since) / 1000);
    var y = Math.floor(s / 31557600); s -= y * 31557600;
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600); s -= h * 3600;
    var m = Math.floor(s / 60); s -= m * 60;
    var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
    var u = T.units;
    var str = y + u[0] + " " + d + u[1] + " " + pad(h) + u[2] + " " + pad(m) + u[3] + " " + pad(s) + u[4];
    up.forEach(function (el) { el.textContent = str; });
    // Split version: one cell per unit, animate only the cells that changed
    var vals = { y: "" + y, d: "" + d, h: pad(h), m: pad(m), s: pad(s) };
    $$("[data-unit]").forEach(function (b) {
      var v = vals[b.getAttribute("data-unit")];
      if (b.textContent === v) return;
      b.textContent = v;
      if (!reduce) { b.classList.remove("tick"); void b.offsetWidth; b.classList.add("tick"); }
    });
  }
  if (up.length || $("[data-unit]")) { tickUptime(); setInterval(tickUptime, 1000); }

  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Toast + copy email ---------- */
  var toast = $(".toast");
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var val = btn.getAttribute("data-copy");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(val).then(function () { showToast(T.copied + val); }, function () { showToast(val); });
      } else showToast(val);
    });
  });

  /* ---------- Contact form ---------- */
  var form = $("#contact-form");
  if (form) {
    var status = $(".form__status", form);
    var msg = $("textarea", form);
    var counter = $(".counter", form);
    if (msg && counter) {
      var upd = function () { counter.textContent = msg.value.length + " / 2000"; };
      msg.addEventListener("input", upd); upd();
    }
    form.addEventListener("submit", function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      var btn = $("button[type=submit]", form);
      btn.disabled = true;
      status.className = "form__status";
      status.textContent = T.sending;
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("bad status");
          form.reset();
          if (counter) counter.textContent = "0 / 2000";
          status.classList.add("ok");
          status.textContent = T.sent;
          showToast(T.sentToast);
        })
        .catch(function () {
          status.classList.add("err");
          status.textContent = T.failed;
        })
        .then(function () { btn.disabled = false; });
    });
  }

  onScroll();
})();
