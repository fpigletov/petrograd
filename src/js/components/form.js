export function form() {
  //Application Form
  const appForm = document.querySelector('.application__form');
  const formInputs = document.querySelectorAll('.application__input');
  const formCheckbox = document.querySelector('.application__checkbox');
  const appNotice = document.querySelector('.application__notice');
  const phoneInput = document.querySelector('input[type="tel"]');
  const inputMask = new Inputmask('+7 999-999-99-99', { autoUnmask: true });
  inputMask.mask(phoneInput);

  appForm.addEventListener('submit', sendForm);

  function addFormError(input) {
    input.parentElement.classList.add('err');
    input.classList.add('err');
  }

  function removeFormError(input) {
    input.parentElement.classList.remove('err');
    input.classList.remove('err');
  }

  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.length > 0) {
        input.classList.add('active');

        if (input.getAttribute('type') === 'text') {
          removeFormError(input);
        }
      } else {
        input.classList.remove('active');
        addFormError(input);
      }

      if (input.getAttribute('type') === 'tel') {
        if (input.value.length >= 10) {
          removeFormError(input);
        } else {
          addFormError(input);
        }
      }
    });
  });

  formCheckbox.addEventListener('change', () => {
    if (formCheckbox.checked === true) {
      removeFormError(formCheckbox);
    }
  });

  function validateForm(form) {
    let formReqs = form.querySelectorAll('.required');
    let error = 0;

    for (let i = 0; i < formReqs.length; i++) {
      const input = formReqs[i];
      removeFormError(input);

      if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        addFormError(input);
        error++;
      } else {
        if (input.value === '') {
          addFormError(input);
          error++;
        }
      }
    }

    return error;
  }

  async function sendForm(e) {
    e.preventDefault();
    let error = validateForm(appForm);

    let formData = new FormData(appForm);

    if (error === 0) {
      let response = await fetch('resources/mail/mailer.php', {
        method: 'POST',
        body: formData,
      }).then(() => {
        appNotice.classList.add('active');
        appForm.reset();
        setTimeout(() => {
          appNotice.classList.remove('active');
        }, 4000);
      }).catch(() => {

      }).finally(() => {

      });
    }
  }
}