(function () {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  // ========= OFFICIAL LINKS (Mohamed Sakr + Sakr Makes) =========
  const SOCIAL_LINKS = {
    // profile socials (top icons)
    linkedin: "https://www.linkedin.com/in/mohamed-sakr-15b674279/",
    github: "https://github.com/M0hamedSakr",
    instagram_profile: "https://www.instagram.com/mohamed_sakre_______/",
    facebook_profile: "https://www.facebook.com/mohamed.m.sakrr?locale=ar_AR",

    // brand links hub (buttons list)
    facebook_brand: "https://www.facebook.com/sakr.makes",
    instagram_brand: "https://www.instagram.com/sakr.makes/",
    youtube: "https://www.youtube.com/@SAKRMAKES",
    tiktok: "https://www.tiktok.com/@sakr_makes",
    makerworld: "https://makerworld.com/en/@saKR",
    email: "mailto:mo.sakr1400@gmail.com",
    whatsapp: "https://wa.me/201009252592"
  };

  // Mobile nav
  const menuBtn = $("#menuBtn");
  const nav = $("#siteNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    $$("#siteNav a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active link highlight
  const path = location.pathname.split("/").pop() || "index.html";
  $$("#siteNav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Copy email
  const copyBtn = $("#copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email");
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => (copyBtn.textContent = "Copy email"), 1400);
      } catch {
        window.prompt("Copy email:", email);
      }
    });
  }

  // Contact form (mailto)
  const form = $("#contactForm");
  const notice = $("#formNotice");

  function setNotice(type, msg) {
    if (!notice) return;
    notice.className = `notice ${type || ""}`.trim();
    notice.textContent = msg;
    notice.hidden = false;
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("#name")?.value.trim() || "";
      const email = $("#email")?.value.trim() || "";
      const subject = $("#subject")?.value.trim() || "";
      const message = $("#message")?.value.trim() || "";

      if (name.length < 2) return setNotice("warn", "Please enter your name (2+ characters).");
      if (!isEmail(email)) return setNotice("warn", "Please enter a valid email address.");
      if (subject.length < 4) return setNotice("warn", "Please enter a subject (4+ characters).");
      if (message.length < 10) return setNotice("warn", "Please enter a message (10+ characters).");

      const to = "mo.sakr1400@gmail.com";
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `${message}\n\n` +
        `— Sent from Sakr Makes contact page`;

      const mailto =
        `mailto:${encodeURIComponent(to)}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      setNotice("ok", "Opening your email client… If it doesn’t open, copy the email and send manually.");
      window.location.href = mailto;
      form.reset();
    });
  }

  // Helper: set href safely
  const setHref = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.setAttribute("href", value);
  };

  // Top quick icons (profile socials)
  setHref("icoLinkedIn", SOCIAL_LINKS.linkedin);
  setHref("icoGitHub", SOCIAL_LINKS.github);
  setHref("icoInstagram", SOCIAL_LINKS.instagram_profile);
  setHref("icoFacebook", SOCIAL_LINKS.facebook_profile);

  // Links hub list
  setHref("lnkFacebookBrand", SOCIAL_LINKS.facebook_brand);
  setHref("lnkInstagramBrand", SOCIAL_LINKS.instagram_brand);
  setHref("lnkLinkedIn", SOCIAL_LINKS.linkedin);
  setHref("lnkGitHub", SOCIAL_LINKS.github);
  setHref("lnkYouTube", SOCIAL_LINKS.youtube);
  setHref("lnkTikTok", SOCIAL_LINKS.tiktok);
  setHref("lnkMakerWorld", SOCIAL_LINKS.makerworld);
  setHref("lnkMail", SOCIAL_LINKS.email);
  setHref("lnkWhatsApp", SOCIAL_LINKS.whatsapp);
})();