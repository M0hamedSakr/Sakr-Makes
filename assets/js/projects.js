(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  document.addEventListener("DOMContentLoaded", () => {
    const grid = $("#projectsGrid");
    const cards = $$(".project-card");
    const search = $("#projectSearch");
    const empty = $("#projectsEmpty");
    const resetBtn = $("#resetFiltersBtn");
    const filterBtns = $$(".filter-btn");
    const statCount = $("#statCount");

    let activeFilter = "all";
    let term = "";

    function normalize(t) {
      return String(t || "").trim().toLowerCase();
    }

    function matches(card) {
      const category = card.getAttribute("data-category") || "";
      if (activeFilter !== "all" && category !== activeFilter) return false;

      if (!term) return true;
      const hay = normalize(card.innerText);
      return hay.includes(term);
    }

    function render() {
      let shown = 0;
      cards.forEach((card) => {
        const ok = matches(card);
        card.hidden = !ok;
        if (ok) shown++;
      });

      if (statCount) statCount.textContent = shown + (shown >= 6 ? "+" : "");
      if (empty) empty.hidden = shown !== 0;
      if (grid) grid.setAttribute("data-visible-count", String(shown));
    }

    // Filter clicks
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.getAttribute("data-filter") || "all";
        render();
      });
    });

    // Search typing
    if (search) {
      search.addEventListener("input", (e) => {
        term = normalize(e.target.value);
        render();
      });
    }

    // Reset
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        activeFilter = "all";
        term = "";
        if (search) search.value = "";
        filterBtns.forEach(b => b.classList.remove("active"));
        const allBtn = $('[data-filter="all"]');
        if (allBtn) allBtn.classList.add("active");
        render();
      });
    }

    // Keyboard: Enter opens first primary action
    cards.forEach((card) => {
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const primary = card.querySelector(".btn.primary");
          if (primary) primary.click();
        }
      });
    });

    render();
  });
})();