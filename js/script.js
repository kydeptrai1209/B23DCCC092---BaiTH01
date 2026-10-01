/**
 * ============================================================================
 * PORTFOLIO WEBSITE JAVASCRIPT - PHẠM XUÂN KỲ (B23DCCC092)
 * Tính năng tương tác:
 * 1. Menu hamburger cho mobile (toggle, backdrop, auto-close)
 * 2. Dark / Light mode (localStorage, auto system preference detection)
 * 3. Validate form liên hệ đa điều kiện (Realtime + On submit)
 * 4. Đếm số ký tự cho ô tin nhắn (Character counter)
 * 5. Lọc danh mục & Tìm kiếm dự án thời gian thực (Live Search & Filter)
 * 6. Cuộn mượt & Active link theo vị trí cuộn (ScrollSpy)
 * 7. Hiệu ứng xuất hiện khi cuộn trang (Scroll Reveal với IntersectionObserver)
 * 8. Thanh tiến độ kỹ năng chuyển động khi cuộn tới (Animated Skill Bars)
 * 9. Hiển thị năm hiện tại ở footer (Dynamic Current Year)
 * 10. Nút Back to Top cuộn lên đầu trang
 * 11. Modal xem chi tiết dự án
 * 12. Hệ thống Toast Notification thông báo
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // FEATURE 1: MOBILE HAMBURGER MENU & BACKDROP
  // ==========================================================================
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const backdrop = document.getElementById('backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMenu() {
    menuBtn.classList.add('active');
    navMenu.classList.add('active');
    backdrop.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang khi menu mở
  }

  function closeMenu() {
    menuBtn.classList.remove('active');
    navMenu.classList.remove('active');
    backdrop.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Tự động đóng menu khi nhấp vào bất kỳ link nào
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Đóng khi nhấn phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // ==========================================================================
  // FEATURE 2: DARK / LIGHT MODE THEME TOGGLE (LOCALSTORAGE)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Lấy theme đã lưu hoặc theo sở thích hệ thống
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  // Khởi tạo theme
  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(
        newTheme === 'dark' ? '🌙 Đã chuyển sang chế độ Tối (Dark Mode)' : '☀️ Đã chuyển sang chế độ Sáng (Light Mode)',
        'info',
        2500
      );
    });
  }

  // ==========================================================================
  // FEATURE 3 & 4: FORM VALIDATION & CHARACTER COUNTER
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const fullnameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('char-counter');
  const submitBtn = document.getElementById('submit-btn');
  const resetBtn = document.getElementById('reset-btn');

  // Đếm ký tự cho ô tin nhắn
  if (messageInput && charCounter) {
    const maxLength = parseInt(messageInput.getAttribute('maxlength'), 10) || 500;

    function updateCharCounter() {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / ${maxLength} ký tự`;

      if (length >= maxLength) {
        charCounter.className = 'char-counter limit';
      } else if (length >= maxLength * 0.85) {
        charCounter.className = 'char-counter warning';
      } else {
        charCounter.className = 'char-counter';
      }
    }

    messageInput.addEventListener('input', updateCharCounter);
    updateCharCounter();
  }

  // Hàm hiển thị lỗi
  function setError(inputEl, errorId, message) {
    const formGroup = inputEl.closest('.form-group');
    const errorEl = document.getElementById(errorId);
    if (formGroup) {
      formGroup.classList.remove('has-success');
      formGroup.classList.add('has-error');
    }
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  // Hàm xoá lỗi / hiển thị thành công
  function setSuccess(inputEl, errorId) {
    const formGroup = inputEl.closest('.form-group');
    const errorEl = document.getElementById(errorId);
    if (formGroup) {
      formGroup.classList.remove('has-error');
      formGroup.classList.add('has-success');
    }
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  // Các hàm kiểm tra điều kiện (Validation Rules)
  function validateFullname() {
    const value = fullnameInput.value.trim();
    if (!value) {
      setError(fullnameInput, 'error-fullname', 'Vui lòng nhập họ và tên của bạn.');
      return false;
    }
    if (value.length < 2) {
      setError(fullnameInput, 'error-fullname', 'Họ và tên cần có ít nhất 2 ký tự.');
      return false;
    }
    // Cho phép chữ cái tiếng Việt và khoảng trắng, không cho phép toàn chữ số
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameRegex.test(value)) {
      setError(fullnameInput, 'error-fullname', 'Họ tên chỉ được chứa chữ cái và khoảng trắng.');
      return false;
    }
    setSuccess(fullnameInput, 'error-fullname');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setError(emailInput, 'error-email', 'Vui lòng nhập địa chỉ email.');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setError(emailInput, 'error-email', 'Email không đúng định dạng (Ví dụ: name@gmail.com).');
      return false;
    }
    setSuccess(emailInput, 'error-email');
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    if (!value) {
      setError(phoneInput, 'error-phone', 'Vui lòng nhập số điện thoại.');
      return false;
    }
    // Định dạng số điện thoại Việt Nam 10 chữ số bắt đầu bằng 03, 05, 07, 08, 09
    const phoneRegex = /^(0)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(value)) {
      setError(phoneInput, 'error-phone', 'Số điện thoại gồm 10 số (Bắt đầu bằng 03, 05, 07, 08, 09).');
      return false;
    }
    setSuccess(phoneInput, 'error-phone');
    return true;
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    if (!value) {
      setError(subjectInput, 'error-subject', 'Vui lòng nhập tiêu đề liên hệ.');
      return false;
    }
    if (value.length < 3) {
      setError(subjectInput, 'error-subject', 'Tiêu đề cần có ít nhất 3 ký tự.');
      return false;
    }
    setSuccess(subjectInput, 'error-subject');
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) {
      setError(messageInput, 'error-message', 'Vui lòng nhập nội dung tin nhắn.');
      return false;
    }
    if (value.length < 10) {
      setError(messageInput, 'error-message', 'Nội dung tin nhắn cần tối thiểu 10 ký tự.');
      return false;
    }
    setSuccess(messageInput, 'error-message');
    return true;
  }

  // Lắng nghe sự kiện Blur & Input để validate theo thời gian thực
  if (fullnameInput) {
    fullnameInput.addEventListener('blur', validateFullname);
    fullnameInput.addEventListener('input', () => {
      if (fullnameInput.closest('.form-group').classList.contains('has-error')) validateFullname();
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.closest('.form-group').classList.contains('has-error')) validateEmail();
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('input', () => {
      if (phoneInput.closest('.form-group').classList.contains('has-error')) validatePhone();
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.closest('.form-group').classList.contains('has-error')) validateSubject();
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
      if (messageInput.closest('.form-group').classList.contains('has-error')) validateMessage();
    });
  }

  // Reset form
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error', 'has-success');
      });
      document.querySelectorAll('.error-msg').forEach(msg => {
        msg.textContent = '';
      });
      setTimeout(() => {
        if (charCounter) charCounter.textContent = '0 / 500 ký tự';
      }, 50);
    });
  }

  // Xử lý gửi Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateFullname();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isSubjectValid = validateSubject();
      const isMsgValid = validateMessage();

      if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMsgValid) {
        // Mô phỏng quá trình gửi qua API
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.spinner');

        submitBtn.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-flex';

        setTimeout(() => {
          submitBtn.disabled = false;
          btnText.style.display = 'inline-flex';
          spinner.style.display = 'none';

          const senderName = fullnameInput.value.trim();

          // Reset form và hiển thị thông báo thành công
          contactForm.reset();
          document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-success', 'has-error');
          });
          if (charCounter) charCounter.textContent = '0 / 500 ký tự';

          showToast(`🎉 Cảm ơn ${senderName}! Tin nhắn của bạn đã được gửi thành công. Tôi sẽ liên hệ lại sớm nhất.`, 'success', 5000);
        }, 1200);
      } else {
        showToast('⚠️ Vui lòng kiểm tra lại các trường thông tin bị lỗi.', 'error', 3500);
      }
    });
  }

  // ==========================================================================
  // FEATURE 5: LIVE SEARCH & CATEGORY FILTER FOR PROJECTS
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectSearch = document.getElementById('project-search');
  const clearSearchBtn = document.getElementById('clear-search');
  const projectCards = document.querySelectorAll('.project-card');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  let activeCategory = 'all';
  let searchQuery = '';

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function filterProjects() {
    let visibleCount = 0;
    const normalizedQuery = normalizeText(searchQuery.trim());

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardKeywords = normalizeText(card.getAttribute('data-keywords') || '');
      const cardTitle = normalizeText(card.querySelector('.project-title')?.textContent || '');
      const cardDesc = normalizeText(card.querySelector('.project-desc')?.textContent || '');

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = !normalizedQuery || 
        cardTitle.includes(normalizedQuery) || 
        cardDesc.includes(normalizedQuery) || 
        cardKeywords.includes(normalizedQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Cập nhật số lượng
    if (resultsCount) {
      resultsCount.textContent = visibleCount;
    }

    // Hiển thị trạng thái rỗng nếu không tìm thấy
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Xử lý nút bấm Tab lọc danh mục
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeCategory = btn.getAttribute('data-filter');
      filterProjects();
    });
  });

  // Tìm kiếm trực tiếp khi gõ phím
  if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
      }
      filterProjects();
    });
  }

  // Nút xoá ô tìm kiếm
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      projectSearch.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      projectSearch.focus();
      filterProjects();
    });
  }

  // Nút reset khi không có kết quả
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      if (projectSearch) projectSearch.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      filterBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
        b.setAttribute('aria-selected', b.getAttribute('data-filter') === 'all' ? 'true' : 'false');
      });
      filterProjects();
    });
  }

  // ==========================================================================
  // FEATURE 6: SMOOTH SCROLL & ACTIVE SCROLLSPY
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('header');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = header ? header.offsetHeight : 70;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Thêm class scrolled cho header khi cuộn trang
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // ==========================================================================
  // FEATURE 7: SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback cho trình duyệt cũ
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }

  // ==========================================================================
  // FEATURE 8: ANIMATED SKILL PROGRESS BARS ON SCROLL
  // ==========================================================================
  const progressBars = document.querySelectorAll('.progress-bar');
  const skillsSection = document.getElementById('skills');

  if ('IntersectionObserver' in window && skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '0%';
            bar.style.width = width;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    skillsObserver.observe(skillsSection);
  } else {
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width') || '0%';
    });
  }

  // ==========================================================================
  // FEATURE 9: DYNAMIC CURRENT YEAR IN FOOTER
  // ==========================================================================
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // FEATURE 10: BACK TO TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // FEATURE 11: PROJECT DETAILS MODAL
  // ==========================================================================
  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  // Dữ liệu chi tiết của các dự án
  const projectDetails = [
    {
      title: 'Website Portfolio Cá Nhân (BaiTH01)',
      category: 'Frontend Development',
      time: 'Tháng 10 / 2026',
      tech: ['HTML5 Semantic', 'CSS3 Flexbox/Grid', 'JavaScript ES6+', 'Responsive Design'],
      description: `
        <p><strong>Giới thiệu:</strong> Dự án thiết kế trang web cá nhân hoàn chỉnh phục vụ báo cáo Bài Thực Hành 01 chuyên ngành CNTT tại Học viện Công nghệ Bưu chính Viễn thông (PTIT).</p>
        <br/>
        <h4>Điểm nổi bật:</h4>
        <ul style="padding-left: 1.25rem; line-height: 1.8;">
          <li>Bố cục chuẩn mực kết hợp giữa Flexbox (Navbar, buttons, tags) và CSS Grid (Skills, Projects, Form).</li>
          <li>Hỗ trợ chuyển đổi giao diện Sáng / Tối (Dark/Light mode) và tự động ghi nhớ tùy chọn vào LocalStorage.</li>
          <li>Hơn 8 tính năng tương tác bằng JavaScript thuần (Vanilla JS), không phụ thuộc thư viện nặng.</li>
          <li>Xác thực form liên hệ nhiều điều kiện với phản hồi trực quan ngay lập tức.</li>
          <li>Hệ thống tìm kiếm dự án trực tiếp và bộ lọc đa danh mục linh hoạt.</li>
        </ul>
      `
    },
    {
      title: 'Truyền Thông Multicast & Giám Sát Wireshark',
      category: 'Hệ Thống Phân Tán & Mạng Máy Tính',
      time: 'Tháng 09 / 2026',
      tech: ['Python Socket', 'UDP Multicast (224.1.1.1)', 'Wireshark Analyzer', 'IGMP Protocol'],
      description: `
        <p><strong>Giới thiệu:</strong> Nghiên cứu và xây dựng mô hình truyền thông đa hướng (Multicast) phục vụ kịch bản phát sóng dữ liệu phân tán hiệu năng cao.</p>
        <br/>
        <h4>Điểm nổi bật:</h4>
        <ul style="padding-left: 1.25rem; line-height: 1.8;">
          <li>Lập trình mô hình Producer - Receiver bằng thư viện socket trong Python.</li>
          <li>Cấu hình tham gia nhóm địa chỉ Class D (224.1.1.1) qua giao thức quản lý nhóm IGMP.</li>
          <li>Bắt gói tin, phân tích cấu trúc header UDP, kiểm tra tính toàn vẹn và đo lường độ trễ mạng thực tế.</li>
          <li>Tối ưu băng thông mạng khi phục vụ đồng thời hàng trăm máy khách mà không nhân bản luồng dữ liệu tại nguồn.</li>
        </ul>
      `
    },
    {
      title: 'Mô Hình Khai Phá & Dự Đoán Sống Sót Titanic',
      category: 'Machine Learning & Data Mining',
      time: 'Tháng 09 / 2026',
      tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
      description: `
        <p><strong>Giới thiệu:</strong> Áp dụng các thuật toán học có giám sát (Supervised Learning) để phân tích bộ dữ liệu thảm họa chìm tàu Titanic kinh điển.</p>
        <br/>
        <h4>Điểm nổi bật:</h4>
        <ul style="padding-left: 1.25rem; line-height: 1.8;">
          <li>Tiền xử lý dữ liệu: Xử lý missing values (tuổi, giá vé, bến tàu), mã hóa biến phân loại (One-Hot Encoding, Label Encoding).</li>
          <li>Huấn luyện mô hình Cây quyết định (Decision Tree Classifier) với tiêu chuẩn Gini Impurity và Entropy.</li>
          <li>Trực quan hóa cây quyết định và biểu đồ phân phối xác suất.</li>
          <li>Đánh giá độ chính xác đạt trên 84% trên tập kiểm thử thông qua Confusion Matrix, Precision, Recall và ROC-AUC curve.</li>
        </ul>
      `
    },
    {
      title: 'Hệ Thống Data Pipeline ETL Tự Động Hoá',
      category: 'Data Engineering & Pipeline',
      time: 'Tháng 09 / 2026',
      tech: ['Python', 'PostgreSQL', 'Docker', 'REST API', 'Task Scheduling (Cron)'],
      description: `
        <p><strong>Giới thiệu:</strong> Xây dựng luồng trích xuất (Extract), biến đổi (Transform) và nạp (Load) dữ liệu có khả năng xử lý lượng lớn dữ liệu bán cấu trúc.</p>
        <br/>
        <h4>Điểm nổi bật:</h4>
        <ul style="padding-left: 1.25rem; line-height: 1.8;">
          <li>Thu thập dữ liệu định kỳ từ các endpoint API bên ngoài.</li>
          <li>Chuẩn hoá kiểu dữ liệu, khử trùng lặp và làm giàu thông tin trong bộ nhớ tạm.</li>
          <li>Lưu trữ vào hệ quản trị cơ sở dữ liệu quan hệ PostgreSQL với các ràng buộc khóa ngoại chặt chẽ.</li>
          <li>Đóng gói toàn bộ pipeline với Docker Compose, chạy tự động hóa trên môi trường Linux WSL.</li>
        </ul>
      `
    },
    {
      title: 'TaskFlow Pro - Quản Lý Tiến Độ Kanban',
      category: 'Frontend & Web Application',
      time: 'Tháng 08 / 2026',
      tech: ['Vanilla JavaScript', 'HTML5 Drag & Drop API', 'CSS Grid', 'LocalStorage API'],
      description: `
        <p><strong>Giới thiệu:</strong> Ứng dụng web quản lý công việc lấy cảm hứng từ phương pháp Kanban của Trello, cho phép người dùng tổ chức các đầu việc trực quan.</p>
        <br/>
        <h4>Điểm nổi bật:</h4>
        <ul style="padding-left: 1.25rem; line-height: 1.8;">
          <li>Kéo thả thẻ nhiệm vụ giữa các cột (To Do, In Progress, Done) mượt mà bằng HTML5 Drag and Drop API.</li>
          <li>Tự động lưu và phục hồi trạng thái làm việc vào bộ nhớ LocalStorage của trình duyệt.</li>
          <li>Gán nhãn độ ưu tiên (Cao, Trung bình, Thấp) và nhắc nhở thời hạn hoàn thành công việc.</li>
          <li>Giao diện tối giản, trực quan và đáp ứng linh hoạt trên cả màn hình di động lẫn máy tính bảng.</li>
        </ul>
      `
    }
  ];

  function openProjectModal(index) {
    const data = projectDetails[index];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="tag" style="background-color: var(--primary-light); color: var(--primary); font-weight: 700;">${data.category}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;"><i class="fa-regular fa-calendar"></i> ${data.time}</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
        ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div>
        ${data.description}
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectIndex = parseInt(btn.getAttribute('data-project'), 10);
      openProjectModal(projectIndex);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // ==========================================================================
  // FEATURE 12: TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="${iconClass} toast-icon"></i>
      <div class="toast-content">${message}</div>
      <span class="toast-close">&times;</span>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    let timerId;

    function removeToast() {
      toast.style.animation = 'toast-out 0.3s ease-out forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        clearTimeout(timerId);
        removeToast();
      });
    }

    timerId = setTimeout(removeToast, duration);
  }

  // Thông báo chào mừng nhẹ nhàng khi tải trang
  setTimeout(() => {
    showToast('👋 Chào mừng bạn đến với Website Portfolio của Phạm Xuân Kỳ (B23DCCC092)!', 'info', 4000);
  }, 1000);

  // Nút CV Alert
  const cvBtn = document.getElementById('cv-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      showToast('📄 Bản CV chi tiết định dạng PDF đang được cập nhật!', 'info', 3000);
    });
  }
});
