const cities=[
  {name:'Almaty',country:'Kazakhstan',lat:43.2389,lng:76.8897,genres:['Indie','Pop'],note:'A starting point for discovering contemporary music from Kazakhstan.',color:'gold'},
  {name:'Seoul',country:'South Korea',lat:37.5665,lng:126.9780,genres:['K-pop','Hip-hop'],note:'A city where polished pop and independent scenes meet.',color:'blue'},
  {name:'Tokyo',country:'Japan',lat:35.6762,lng:139.6503,genres:['City pop','Electronic'],note:'A wide range of sounds, from city pop to electronic music.',color:'pink'},
  {name:'Berlin',country:'Germany',lat:52.52,lng:13.405,genres:['Techno','Electronic'],note:'Explore the city through its electronic music culture.',color:'green'},
  {name:'Lagos',country:'Nigeria',lat:6.5244,lng:3.3792,genres:['Afrobeats','Pop'],note:'Rhythm-led music and a lively contemporary pop scene.',color:'gold'},
  {name:'New York',country:'United States',lat:40.7128,lng:-74.006,genres:['Hip-hop','Jazz'],note:'Discover a city connected with many influential sounds.',color:'blue'}
];
function card(city){const q=new URLSearchParams({city:city.name});return `<a class="city-card" data-color="${city.color}" href="map.html?${q}"><div class="city-art"><span aria-hidden="true">${city.name.slice(0,2).toUpperCase()}</span></div><div class="card-copy"><span class="eyebrow">${city.country}</span><h3>${city.name}</h3><p>${city.genres.join(' · ')}</p></div></a>`}
const featured=document.querySelector('#featured-cities');if(featured){featured.innerHTML=cities.slice(0,3).map(c=>`<div class="col-md-4">${card(c)}</div>`).join('')}
