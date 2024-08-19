function scrollToAnchor() {
  const hash = window.location.hash;
  console.log("Hash detected:", hash); // Log the detected hash
  if (hash) {
    const element = document.querySelector(hash);
    console.log("Element found:", element); // Log the found element
    if (element) {
      setTimeout(function() {
        console.log("Scrolling to element:", element); // Log before scrolling to the element
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // You can adjust this timeout value as needed
    }
  }
}

// Event listeners to handle page load and hash changes
window.addEventListener("load", scrollToAnchor);
window.addEventListener("hashchange", scrollToAnchor);
