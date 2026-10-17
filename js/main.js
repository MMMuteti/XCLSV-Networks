(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var toggleLabel = toggle.querySelector(".sr-only");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggleLabel.textContent = open ? "Close menu" : "Open menu";
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      var target = id && document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      if (toggle.getAttribute("aria-expanded") === "true") setMenu(false);
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var filters = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".work-card"));
  var empty = document.getElementById("work-empty");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      var shown = 0;
      filters.forEach(function (item) {
        var on = item === btn;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-pressed", on ? "true" : "false");
      });
      cards.forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-cat") === filter;
        card.hidden = !show;
        if (show) shown += 1;
      });
      empty.hidden = shown > 0;
    });
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".step"));
  function selectTab(index) {
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(i); });
    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      var next = event.key === "ArrowRight" ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      selectTab(next);
      tabs[next].focus();
    });
  });

  Array.prototype.slice.call(document.querySelectorAll(".accordion button")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      var buttons = document.querySelectorAll(".accordion button");
      var expanded = btn.getAttribute("aria-expanded") === "true";
      Array.prototype.forEach.call(buttons, function (other) {
        other.setAttribute("aria-expanded", "false");
        var panel = document.getElementById(other.getAttribute("aria-controls"));
        if (panel) panel.hidden = true;
      });
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        document.getElementById(btn.getAttribute("aria-controls")).hidden = false;
      }
    });
  });

  function runCount(el) {
    if (el.getAttribute("data-done") === "1") return;
    el.setAttribute("data-done", "1");
    var target = Number(el.getAttribute("data-count")) || 0;
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / 1100);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), runCount);
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        entry.target.querySelectorAll("[data-count]").forEach(runCount);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");
  var again = document.getElementById("form-again");
  var submit = document.getElementById("form-submit");

  function fieldError(id, message) {
    var field = document.getElementById(id);
    var err = document.getElementById(id + "-error");
    if (message) {
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", id + "-error");
      err.hidden = false;
      err.textContent = message;
      return false;
    }
    field.removeAttribute("aria-invalid");
    err.hidden = true;
    err.textContent = "";
    return true;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var service = form.service.value;
    var message = form.message.value.trim();
    var ok = fieldError("name", name.length >= 2 ? "" : "Enter your name (at least 2 characters).");
    ok = fieldError("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address.") && ok;
    ok = fieldError("service", service ? "" : "Choose a service.") && ok;
    ok = fieldError("message", message.length >= 12 ? "" : "Add a short note (at least 12 characters).") && ok;
    if (!ok) {
      success.hidden = true;
      var first = form.querySelector("[aria-invalid='true']");
      if (first) first.focus();
      return;
    }
    form.querySelectorAll(".field").forEach(function (el) { el.hidden = true; });
    submit.hidden = true;
    success.hidden = false;
    success.textContent = "Thank you, " + name + ". Your notes for " + service + " are confirmed on this page. Email xclsvnetworks@outlook.com or call +254 (0) 726 898 381 / +254 (0) 732 211 721. This form does not send to a server.";
    again.hidden = false;
    success.focus();
  });

  again.addEventListener("click", function () {
    form.reset();
    form.querySelectorAll(".field").forEach(function (el) { el.hidden = false; });
    ["name", "email", "service", "message"].forEach(function (id) { fieldError(id, ""); });
    submit.hidden = false;
    success.hidden = true;
    again.hidden = true;
    form.name.focus();
  });
})();
