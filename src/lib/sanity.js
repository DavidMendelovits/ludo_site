const PROJECT_ID = 'dw44knzc';
const DATASET = 'production';
const API_VERSION = '2024-01-01';

const SANITY_CDN = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

function sanityFetch(query, params = {}) {
  const searchParams = new URLSearchParams({ query });
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(`$${key}`, JSON.stringify(value));
  }
  return fetch(`${SANITY_CDN}?${searchParams}`)
    .then(res => {
      if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);
      return res.json();
    })
    .then(data => data.result);
}

export function fetchComedyEvents() {
  const query = `*[_type == "event" && category == "Comedy" && status == "approved" && eventDate >= now()] | order(eventDate asc) {
    _id,
    title,
    slug,
    venue,
    neighborhood,
    category,
    eventDate,
    price,
    vibe,
    ticketUrl,
    "imageUrl": image.asset->url
  }`;
  return sanityFetch(query);
}

export function fetchComedyEventBySlug(slug) {
  const query = `*[_type == "event" && slug.current == $slug && category == "Comedy"][0] {
    _id,
    title,
    slug,
    venue,
    neighborhood,
    category,
    eventDate,
    price,
    vibe,
    ticketUrl,
    "imageUrl": image.asset->url
  }`;
  return sanityFetch(query, { slug });
}
