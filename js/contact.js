/* ============================================
   Pro-Star KSA — Contact Form
   ============================================ */

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree endpoint

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('.form__submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جارٍ الإرسال...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً ✨', 'success');
        form.reset();
      } else {
        throw new Error('فشل الإرسال');
      }
    } catch (err) {
      showToast('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  // Real-time validation
  const inputs = form.querySelectorAll('.form__input, .form__select, .form__textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      const group = input.closest('.form__group');
      if (group.classList.contains('has-error')) {
        validateField(input);
      }
    });
  });
}

function validateForm(form) {
  const fields = form.querySelectorAll('[required]');
  let valid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      valid = false;
    }
  });

  return valid;
}

function validateField(field) {
  const group = field.closest('.form__group');
  const error = group.querySelector('.form__error');
  let valid = true;
  let message = '';

  if (field.required && !field.value.trim()) {
    valid = false;
    message = 'هذا الحقل مطلوب';
  } else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      valid = false;
      message = 'يرجى إدخال بريد إلكتروني صحيح';
    }
  } else if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[\+]?[0-9\s-]{8,15}$/;
    if (!phoneRegex.test(field.value)) {
      valid = false;
      message = 'يرجى إدخال رقم هاتف صحيح';
    }
  }

  if (valid) {
    group.classList.remove('has-error');
  } else {
    group.classList.add('has-error');
    if (error) error.textContent = message;
  }

  return valid;
}

function showToast(message, type) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('active');
  });

  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}
