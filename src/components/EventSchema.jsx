import React from 'react';
import { Helmet } from 'react-helmet-async';

function EventSchema({ show }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComedyEvent",
    "name": show.title,
    "startDate": show.date,
    "endDate": show.endDate,
    "doorTime": show.doorTime,
    "url": `https://project-ludo.com${show.url}`,
    
    "location": {
      "@type": "Place",
      "name": show.venue.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": show.venue.streetAddress,
        "addressLocality": show.venue.city,
        "addressRegion": show.venue.state,
        "postalCode": show.venue.postalCode,
        "addressCountry": show.venue.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": show.venue.latitude,
        "longitude": show.venue.longitude
      }
    },
    
    "offers": {
      "@type": "Offer",
      "url": show.tickets.url,
      "price": show.tickets.price,
      "priceCurrency": show.tickets.currency,
      "availability": `https://schema.org/${show.tickets.availability}`,
      "validFrom": show.tickets.validFrom,
      "inventoryLevel": {
        "@type": "QuantitativeValue",
        "value": show.tickets.availableSeats
      }
    },
    
    "performer": show.performers.map(performer => ({
      "@type": "Person",
      "name": performer.name,
      "sameAs": performer.instagram ? `https://instagram.com/${performer.instagram}` : undefined
    })),
    
    "description": show.description,
    "image": show.image,
    "eventStatus": `https://schema.org/${show.status}`,
    "typicalAgeRange": show.policies.ageRestriction,
    
    "organizer": {
      "@type": "Organization",
      "name": "LUDO Comedy",
      "url": "https://project-ludo.com"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export default EventSchema;