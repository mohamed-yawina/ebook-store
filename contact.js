// Initialize Lucide icons
lucide.createIcons();

// Get the form element
const form = document.getElementById('contactForm');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };
  
  // Log form data (replace with your actual form submission logic)
  console.log('Form submitted:', formData);
  
  // Reset form
  form.reset();
  
  // Show success message (you can customize this)
  alert('Thank you for your message. We will get back to you soon!');
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update theme icon based on current theme
  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
      lucide.createIcons();
    }
  }
  
  updateThemeIcon(savedTheme);

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}