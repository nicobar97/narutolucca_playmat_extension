const DEFAULTS = {
  autoFill: true,
  firstName: "", lastName: "", email: "", birthDate: "", windowMatch: "",
  accept: true, autoSubmit: false, autoReload: false, reloadMs: 1500,
};

// Field ids are opaque hashes, so locate fields by their label text.
function inputByLabel(form, text) {
  for (const l of form.querySelectorAll("label[for]")) {
    if (l.textContent.trim().toLowerCase() === text) return form.querySelector("#" + CSS.escape(l.htmlFor));
  }
  return null;
}

function setValue(el, value) {
  if (!el || !value) return;
  el.value = value;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

function fill(form, s) {
  const select = form.querySelector("select");
  if (select) {
    const opts = [...select.options].filter((o) => o.value);
    const wanted = s.windowMatch && opts.find((o) => o.textContent.toLowerCase().includes(s.windowMatch.toLowerCase()));
    const match = wanted || opts[0];
    if (match) setValue(select, match.value);
  }
  setValue(inputByLabel(form, "nome"), s.firstName);
  setValue(inputByLabel(form, "cognome"), s.lastName);
  setValue(inputByLabel(form, "email"), s.email);
  setValue(inputByLabel(form, "data di nascita"), s.birthDate);
  const box = form.querySelector('input[type=checkbox][required]');
  if (box && s.accept && !box.checked) box.click();
}

chrome.storage.sync.get(DEFAULTS, (s) => {
  const form = document.querySelector("form.pm-form");
  const select = form && form.querySelector("select");
  const hasWindow = select && [...select.options].some((o) => o.value);

  if (!form || !hasWindow) {
    if (s.autoReload) setTimeout(() => location.reload(), s.reloadMs);
    return;
  }

  // The window is open: stop refreshing for good, so a later visit doesn't loop.
  if (s.autoReload) chrome.storage.sync.set({ autoReload: false });
  if (!s.autoFill) return;

  fill(form, s);
  const captcha = form.querySelector(".g-recaptcha");
  if (captcha) captcha.scrollIntoView({ block: "center" });

  // The reCAPTCHA is still solved by the user; once it yields a token, optionally submit.
  if (s.autoSubmit) {
    const timer = setInterval(() => {
      const resp = form.querySelector('textarea[name="g-recaptcha-response"]');
      if (resp && resp.value) {
        clearInterval(timer);
        form.querySelector('button[type=submit]').click();
      }
    }, 200);
  }
});
