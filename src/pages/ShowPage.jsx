import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { fetchComedyEventBySlug } from '../lib/sanity';

function ShowPage() {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchComedyEventBySlug(showId)
      .then(data => {
        if (!data) {
          setNotFound(true);
        } else {
          setShow(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch event:', err);
        setNotFound(true);
        setLoading(false);
      });
  }, [showId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/" replace />;
  }

  const eventDate = new Date(show.eventDate);
  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');
  const slug = show.slug?.current || showId;

  return (
    <>
      <Helmet>
        <title>{show.title} - Comedy Show | {formattedDate}</title>
        <meta
          name="description"
          content={`${show.title} — ${show.venue} on ${formattedDate}. Presented by LUDO Comedy.`}
        />
        <meta property="og:title" content={show.title} />
        <meta property="og:description" content={show.title} />
        {show.imageUrl && <meta property="og:image" content={show.imageUrl} />}
        <meta property="og:type" content="event" />
        <link rel="canonical" href={`https://project-ludo.com/shows/${slug}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex space-x-2 text-gray-400">
            <li><a href="/" className="hover:text-yellow-400">Home</a></li>
            <li>/</li>
            <li className="text-white">{show.title}</li>
          </ol>
        </nav>

        {/* Show Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">
            {show.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div>
              <span className="text-gray-400">Date:</span>{' '}
              <span className="text-white font-semibold">{formattedDate}</span>
            </div>
            <div>
              <span className="text-gray-400">Time:</span>{' '}
              <span className="text-white font-semibold">{formattedTime}</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Show Image */}
            {show.imageUrl && (
              <img
                src={show.imageUrl}
                alt={show.title}
                className="w-full rounded-lg mb-8"
              />
            )}

            {/* Venue Info */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Venue</h2>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-1">{show.venue}</h3>
                {show.neighborhood && (
                  <p className="text-sm text-gray-400 mb-3">{show.neighborhood}</p>
                )}
                <p className="text-sm text-gray-400">Presented by LUDO Comedy</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {/* Ticket Info Card */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4">Ticket Information</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      {show.price}
                    </span>
                  </div>
                </div>

                {show.ticketUrl ? (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-red-600 text-white text-center font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    GET TICKETS
                  </a>
                ) : (
                  <span className="block w-full py-3 bg-gray-600 text-gray-400 text-center font-bold rounded-lg">
                    Check back for tickets
                  </span>
                )}
              </div>

              {/* Quick Facts */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>📍 {show.venue}</li>
                  {show.neighborhood && <li>🏘️ {show.neighborhood}</li>}
                  <li>📅 {formattedDate}</li>
                  <li>🕐 {formattedTime}</li>
                  <li>💰 {show.price}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowPage;
