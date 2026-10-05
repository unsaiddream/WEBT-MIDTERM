const cities = [
  {
    name: "Almaty",
    country: "Kazakhstan",
    lat: 43.2389,
    lng: 76.8897,
    genres: ["Indie", "Pop"],
  },
  {
    name: "Seoul",
    country: "South Korea",
    lat: 37.5665,
    lng: 126.978,
    genres: ["K-pop", "Hip-hop"],
  },
  {
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    genres: ["City pop", "Electronic"],
  },
  {
    name: "Berlin",
    country: "Germany",
    lat: 52.52,
    lng: 13.405,
    genres: ["Techno", "Electronic"],
  },
  {
    name: "Lagos",
    country: "Nigeria",
    lat: 6.5244,
    lng: 3.3792,
    genres: ["Afrobeats", "Pop"],
  },
  {
    name: "New York",
    country: "United States",
    lat: 40.7128,
    lng: -74.006,
    genres: ["Hip-hop", "Jazz"],
  },
];

function cityCard(city) {
  const query = new URLSearchParams({ city: city.name });

  return `
    <a class="city-card" href="map.html?${query}">
      <span class="eyebrow">${city.country}</span>
      <h3>${city.name}</h3>
      <p>${city.genres.join(" · ")}</p>
    </a>
  `;
}

const featuredCities = document.querySelector("#featured-cities");
if (featuredCities) {
  featuredCities.innerHTML = cities.slice(0, 3).map(cityCard).join("");
}

const cityList = document.querySelector("#city-list");
if (cityList) {
  cityList.innerHTML = cities.map(cityCard).join("");
}

const mapElement = document.querySelector("#music-map");
if (mapElement) {
  const bounds = [
    [-90, -180],
    [90, 180],
  ];
  const map = L.map(mapElement, {
    crs: L.CRS.EPSG4326,
    scrollWheelZoom: false,
    zoomSnap: 0.1,
    minZoom: -1,
    maxZoom: 5,
  });

  L.imageOverlay("assets/world-map.svg?v=3", bounds, {
    attribution: "Map shapes: Natural Earth via geo-countries",
  }).addTo(map);

  map.fitBounds(bounds, { padding: [20, 20] });

  const selectedCity = new URLSearchParams(window.location.search).get("city");

  cities.forEach((city) => {
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 10,
      color: "#fff",
      weight: 2,
      fillColor: "#2563eb",
      fillOpacity: 1,
    }).addTo(map);

    marker.bindPopup(
      `<strong>${city.name}, ${city.country}</strong><br>${city.genres.join(" · ")}`,
    );

    if (city.name === selectedCity) {
      map.setView(marker.getLatLng(), 4);
      marker.openPopup();
    }
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const artistCards = document.querySelectorAll("[data-genre]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    artistCards.forEach((card) => {
      card.closest(".artist-column").hidden =
        button.dataset.filter !== "all" && card.dataset.genre !== button.dataset.filter;
    });
  });
});

const form = document.querySelector("#suggestion-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form));
    const status = document.querySelector("#form-status");

    try {
      const suggestions = JSON.parse(localStorage.getItem("musicMapSuggestions") || "[]");
      suggestions.push(data);
      localStorage.setItem("musicMapSuggestions", JSON.stringify(suggestions));
      status.textContent = "Saved in this browser.";
      form.reset();
    } catch {
      status.textContent = "Could not save the suggestion in this browser.";
    }
  });
}
