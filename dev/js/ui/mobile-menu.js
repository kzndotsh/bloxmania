document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("[data-mobile-menu-toggle]");
  const mobileMenu = document.getElementById("mobile-menu");
  const body = document.body;

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      body.classList.add("mobile-menu-open");
      mobileMenu.classList.add("mobile-menu--open");
      mobileMenu.setAttribute("aria-hidden", "false");

      // Add simple fade animations to menu sections
      const menuSections = mobileMenu.querySelectorAll(
        ".mobile-menu__section, .mobile-menu__search, .mobile-menu__footer",
      );
      menuSections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add("section-fade-in", "fade-in-visible");
        }, index * 100);
      });
    });

    // Close menu functionality
    const closeButton = mobileMenu.querySelector(".mobile-menu__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        body.classList.remove("mobile-menu-open");
        mobileMenu.classList.remove("mobile-menu--open");
        mobileMenu.setAttribute("aria-hidden", "true");

        // Remove animation classes
        const menuSections = mobileMenu.querySelectorAll(
          ".mobile-menu__section, .mobile-menu__search, .mobile-menu__footer",
        );
        menuSections.forEach((section) => {
          section.classList.remove("section-fade-in", "fade-in-visible");
        });
      });
    }

    // Close on overlay click
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        body.classList.remove("mobile-menu-open");
        mobileMenu.classList.remove("mobile-menu--open");
        mobileMenu.setAttribute("aria-hidden", "true");
      }
    });
  }
});
