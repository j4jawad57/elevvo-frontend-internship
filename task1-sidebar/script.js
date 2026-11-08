// Get the elements we need
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const overlay = document.getElementById("overlay");
const links = document.querySelectorAll(".menu a");

// True when the screen is phone-sized (same width as the CSS media query)
const isMobile = window.matchMedia("(max-width: 768px)");

// Open or close the sidebar
function toggleSidebar() {
  if (isMobile.matches) {
    // Phone: slide the sidebar in/out and show/hide the dark layer
    const isOpen = sidebar.classList.toggle("open");
    overlay.classList.toggle("show", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen);
  } else {
    // Desktop: shrink to icons only, or expand again
    const isCollapsed = sidebar.classList.toggle("collapsed");
    toggleBtn.setAttribute("aria-expanded", !isCollapsed);
  }
}

// Close the sidebar on phones
function closeMobileSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
  toggleBtn.setAttribute("aria-expanded", false);
}

toggleBtn.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", closeMobileSidebar);

// Press Escape to close the sidebar on phones
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMobile.matches) closeMobileSidebar();
});

// Highlight the clicked link (and close the sidebar on phones)
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    if (isMobile.matches) closeMobileSidebar();
  });
});

// If the screen size changes, reset to a clean state
isMobile.addEventListener("change", () => {
  sidebar.classList.remove("open", "collapsed");
  overlay.classList.remove("show");
  toggleBtn.setAttribute("aria-expanded", !isMobile.matches);
});
