const DEFAULTS = {
  autoFill: true,
  firstName: "", lastName: "", email: "", birthDate: "", windowMatch: "",
  accept: true, autoSubmit: false, autoReload: false, reloadMs: 1500,
};
const ids = Object.keys(DEFAULTS);

chrome.storage.sync.get(DEFAULTS, (s) => {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el.type === "checkbox") el.checked = s[id];
    else el.value = s[id];
  }
});

document.getElementById("save").addEventListener("click", () => {
  const out = {};
  for (const id of ids) {
    const el = document.getElementById(id);
    out[id] = el.type === "checkbox" ? el.checked : el.type === "number" ? Number(el.value) || DEFAULTS[id] : el.value.trim();
  }
  chrome.storage.sync.set(out, () => {
    const m = document.getElementById("msg");
    m.classList.add("show");
    setTimeout(() => m.classList.remove("show"), 1500);
  });
});

// The toggles apply immediately, without pressing Save.
for (const id of ["autoFill", "autoReload", "autoSubmit", "accept"]) {
  document.getElementById(id).addEventListener("change", (e) => {
    chrome.storage.sync.set({ [id]: e.target.checked });
  });
}

document.getElementById("open").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://www.play-system.eu/playmat?lang=it" });
});

// Reflect changes made by the content script (auto-refresh switches itself off after a fill).
chrome.storage.onChanged.addListener((changes) => {
  for (const id of ["autoFill", "autoReload", "autoSubmit", "accept"]) {
    if (changes[id]) document.getElementById(id).checked = changes[id].newValue;
  }
});
