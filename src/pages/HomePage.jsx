import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { fetchComedyEvents } from '../lib/sanity';


function EventCard({ event }) {
  const eventDate = new Date(event.eventDate);
  const formattedDate = format(eventDate, 'EEEE, MMMM d');
  const formattedTime = format(eventDate, 'h:mm a');

  return (
    <article className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {event.title}
        </h3>
        <div className="text-gray-300 mb-2">
          <p>{formattedDate} at {formattedTime}</p>
          <p className="text-sm">{event.venue}{event.neighborhood ? ` — ${event.neighborhood}` : ''}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{event.price}</span>
          {event.ticketUrl ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
            >
              Get Tickets
            </a>
          ) : (
            <Link
              to={`/shows/${event.slug?.current}`}
              className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
            >
              Details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComedyEvents()
      .then(data => {
        setEvents(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch comedy events:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>LUDO Comedy - For Comedy Fans</title>
        <meta name="description" content="LUDO promotes the best comedy shows in NYC and produces our own. For people who actually go to comedy shows." />
        <meta property="og:title" content="LUDO Comedy - For Comedy Fans" />
        <meta property="og:description" content="We promote the best comedy in NYC and produce our own shows. For comedy fans." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://project-ludo.com" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-ludo-orange to-ludo-burgundy">
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="mb-6">
            <img
              src="/ludo-banner.png"
              alt="LUDO Comedy"
              className="mx-auto h-64 md:h-96 w-auto"
            />
          </div>
          <p className="text-2xl md:text-3xl text-ludo-cream mb-4">
            For people who actually go to comedy shows.
          </p>
          <p className="text-lg text-ludo-cream/70 mb-8">
            We promote shows we believe in and produce our own.
          </p>
          <a
            href="#shows"
            className="inline-block px-8 py-4 bg-ludo-coral text-white font-bold rounded-full hover:bg-ludo-burgundy transition"
          >
            SEE UPCOMING SHOWS
          </a>
        </div>
      </section>

      {/* Shows Section */}
      <section id="shows" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-4">
          Upcoming Shows
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          Every show is hand-picked. No filler, no open mics, no "bring your friends" nights.
        </p>

        {loading && (
          <p className="text-center text-gray-400">Loading shows...</p>
        )}

        {error && (
          <p className="text-center text-red-400">Failed to load shows.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-center text-gray-400 mb-12">
            No upcoming shows right now. Check back soon.
          </p>
        )}

      </section>

      {/* Who We Are */}
      <section id="about" className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
            Who We Are
          </h2>
          <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            LUDO is for comedy fans. We promote shows we believe in and produce our own &mdash; all in NYC.
          </p>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4">Shows We Believe In</h3>
              <p className="text-gray-300">
                We find the best comedy happening in NYC and help get the word out. If it's on our page, it's worth your night.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Shows We Produce</h3>
              <p className="text-gray-300">
                We also create and produce our own comedy events &mdash; original formats, lineups we put together, shows built from the ground up.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">For the Fans</h3>
              <p className="text-gray-300">
                Everything we do is for people who actually go to comedy shows. LUDO is where the real fans find each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          Get In Touch
        </h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-300 mb-6">
            Booking inquiries, collaborations, press, or just want to say what's up:
          </p>
          <a
            href="mailto:ludocomedynyc@gmail.com"
            className="text-2xl text-yellow-400 hover:text-yellow-300"
          >
            ludocomedynyc@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}

export default HomePage;
