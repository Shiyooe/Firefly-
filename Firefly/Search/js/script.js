document.addEventListener('DOMContentLoaded', function() {
  console.log("✨ Firefly High-End Search Page Loaded!");

  // === NAVBAR SCROLL SHADOW ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // === CAROUSEL LOGIC ===
  const carousel = document.getElementById('heroCarousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  function updateCarousel() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)'; // Skala penuh
        slide.style.zIndex = '10'; // Z-index tinggi
      } else {
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.95)'; // Skala kecil
        slide.style.zIndex = '0'; // Z-index rendah
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active-dot');
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-gray-500');
      } else {
        dot.classList.remove('active-dot');
        dot.classList.remove('bg-gray-500');
        dot.classList.add('bg-gray-300');
      }
    });
  }

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    updateCarousel();
  }

  // Dot click
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Next button
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Prev button
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

  // Auto-play (optional)
  const autoPlayInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);

  // Pause auto-play on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });

  // Resume auto-play on leave
  carousel.addEventListener('mouseleave', () => {
    // Jangan buat interval baru jika sudah berjalan
    if (autoPlayInterval) {
       setInterval(() => {
         goToSlide(currentIndex + 1);
       }, 5000);
    }
  });

  // Initial render
  updateCarousel();

  // === SCROLL ANIMATIONS ===
  const observerOptions = {
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
      
    });
  }, observerOptions);

  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

 
  const mockSearches = [
    { query: "Firefly is mine", icon: "🔍", color: "bg-blue-100" },
    { query: "Firefly icon", icon: "🖼️", color: "bg-blue-200" },
    { query: "Firefly expo 2025", icon: "🗓️", color: "bg-blue-300" },
    { query: "Firefly cosplay", icon: "🎭", color: "bg-gray-300" },
    { query: "Firefly wallpaper 4K", icon: "📱", color: "bg-gray-200" },
    { query: "How To get her new skin", icon: "❤️", color: "bg-gray-100" },
    { query: "Firefly Laptop Case", icon: "💻", color: "bg-green-300" },
  ];

  const searchHistoryContainer = document.getElementById('searchHistory');
  mockSearches.forEach(item => {
    const div = document.createElement('div');
    div.className = `search-item flex items-center justify-between p-3 ${item.color} rounded-lg cursor-pointer hover:bg-opacity-80`;
    div.innerHTML = `
      <div class="flex items-center space-x-2">
        <span>${item.icon}</span>
        <span class="text-sm">${item.query}</span>
      </div>
      <button class="text-gray-500 hover:text-red-500">×</button>
    `;
    div.querySelector('button').addEventListener('click', () => {
      div.remove();
    });
    div.addEventListener('click', () => {
      alert(`Searching: "${item.query}"`);
    });
    searchHistoryContainer.appendChild(div);
  });

  // Add new search on Enter
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      const newItem = {
        query: this.value,
        icon: "",
        color: "bg-blue-50"
      };
      const div = document.createElement('div');
      div.className = `search-item flex items-center justify-between p-3 ${newItem.color} rounded-lg cursor-pointer hover:bg-opacity-80`;
      div.innerHTML = `
        <div class="flex items-center space-x-2">
          <span>${newItem.icon}</span>
          <span class="text-sm">${newItem.query}</span>
        </div>
        <button class="text-gray-500 hover:text-red-500">×</button>
      `;
      div.querySelector('button').addEventListener('click', () => {
        div.remove();
      });
      div.addEventListener('click', () => {
        alert(`Searching: "${newItem.query}"`);
      });
      searchHistoryContainer.prepend(div);
      this.value = '';
    }
  });

  // Optional: Floating heart on click
  document.body.addEventListener('click', function(e) {
    if (Math.random() > 0.95) {
      const heart = document.createElement('div');
      heart.textContent = '❤️';
      heart.style.position = 'absolute';
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      heart.style.fontSize = '24px';
      heart.style.transform = 'translate(-50%, -50%)';
      heart.style.animation = 'float 2s ease-in-out forwards';
      heart.style.zIndex = '9999';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  });
});