import React from 'react';

function FeatherEmbed({ eventId }) {
  // Replace with your actual Feather.rsvp URL structure
  const embedUrl = `https://feather.rsvp/embed/event/${eventId}`;
  
  return (
    <div className="feather-embed-container">
      <iframe
        src={embedUrl}
        width="100%"
        height="600"
        frameBorder="0"
        title="Book Comedy Show Tickets"
        className="rounded-lg bg-white"
        loading="lazy"
      />
      
      {/* Fallback for no JavaScript */}
      <noscript>
        <div className="text-center py-8">
          <p className="mb-4">JavaScript is required for ticket booking.</p>
          <a 
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline"
          >
            Click here to book tickets directly
          </a>
        </div>
      </noscript>
    </div>
  );
}

export default FeatherEmbed;