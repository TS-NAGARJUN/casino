document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('backgroundMusic');

  // Try autoplay as soon as the page loads
  audio.play().catch(error => {
      console.log("Autoplay prevented:", error);
      // Optionally, handle fallback here (e.g., show a play button)
  });
});

// GSAP Animation for Smooth Fade-in Effect
window.onload = () => {
  gsap.from(".signup-container", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
};

// Form Validation and Submission Logic
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function (event) {
  event.preventDefault();  // Prevent the default form submission behavior

  // Collect form data
  const formData = new FormData(signupForm);
  const data = new URLSearchParams(formData).toString();

  // Submit data using fetch API
  fetch('/signup', {
      method: 'POST',
      body: data,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
  .then(response => response.text())
  .then(data => {
      console.log('Data submitted:', data);
      alert('Signup Successful!');
      // Optionally reset the form or clear the fields
      signupForm.reset();
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error storing data');
  });
});
