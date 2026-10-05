const form = document.querySelector("#suggestion-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const artist = form.elements.artist.value.trim();
  const city = form.elements.city.value.trim();
  const status = document.querySelector("#form-status");

  status.textContent = `${artist} from ${city}. This is a preview; nothing was sent.`;
});
