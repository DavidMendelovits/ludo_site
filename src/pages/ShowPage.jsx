import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import EventSchema from '../components/EventSchema';
import FeatherEmbed from '../components/FeatherEmbed';
import { getShowById } from '../data/shows';


function ShowPage() {
  const { showId } = useParams();
  const show = getShowById(showId);

  if (!show) {
    return <Navigate to="/" replace />;
  }

  const showDate = new Date(show.date);
  const formattedDate = format(showDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(showDate, 'h:mm a');

  return (
    <>
      <Helmet>
        <title>{show.title} - Comedy Show Tickets | {formattedDate}</title>
        <meta 
          name="description" 
          content={`${show.description} Live at ${show.venue.name} on ${formattedDate}. Get tickets now!`} 
        />
        <meta property="og:title" content={show.title} />
        <meta property="og:description" content={show.description} />
        <meta property="og:image" content={show.image} />
        <meta property="og:type" content="event" />
        <link rel="canonical" href={`https://yourcomedysite.com${show.url}`} />
      </Helmet>

      {/* CRITICAL: Google Event Structured Data */}
      <EventSchema show={show} />

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
            <div>
              <span className="text-gray-400">Doors:</span>{' '}
              <span className="text-white font-semibold">30 min before</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Show Image */}
            <img 
              src={show.image} 
              alt={show.title}
              className="w-full rounded-lg mb-8"
            />

            {/* Description */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">About This Show</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {show.description}
              </p>
            </section>

            {/* Performers */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Featured Comedians</h2>
              <div className="space-y-6">
                {show.performers.map((performer, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-yellow-400">
                        {performer.name}
                      </h3>
                      <span className="text-sm bg-red-600 px-3 py-1 rounded-full">
                        {performer.type}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{performer.bio}</p>
                    {performer.instagram && (
                      <a 
                        href={`https://instagram.com/${performer.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        @{performer.instagram}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Venue Info */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Venue Information</h2>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">{show.venue.name}</h3>
                <address className="text-gray-300 not-italic mb-4">
                  {show.venue.streetAddress}<br />
                  {show.venue.city}, {show.venue.state} {show.venue.postalCode}
                </address>
                
                <h4 className="font-bold mb-2">Important Information:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• {show.policies.ageRestriction} - Valid ID required</li>
                  <li>• {show.policies.drinkMinimum}</li>
                  <li>• {show.policies.doorPolicy}</li>
                  <li>• {show.policies.seatingPolicy}</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar with Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {/* Ticket Info Card */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4">Ticket Information</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ${show.tickets.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400 font-semibold">
                      {show.tickets.availability === 'InStock' ? 'On Sale' : 'Sold Out'}
                    </span>
                  </div>
                </div>
                
                {show.tickets.availability === 'InStock' ? (
                  <a 
                    href="#booking"
                    className="block w-full py-3 bg-red-600 text-white text-center font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    GET TICKETS
                  </a>
                ) : (
                  <button 
                    disabled 
                    className="block w-full py-3 bg-gray-600 text-gray-400 text-center font-bold rounded-lg cursor-not-allowed"
                  >
                    SOLD OUT
                  </button>
                )}
              </div>

              {/* Quick Facts */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>📍 {show.venue.name}</li>
                  <li>📅 {formattedDate}</li>
                  <li>🕐 {formattedTime}</li>
                  <li>🚪 Doors: 30 min before</li>
                  <li>🍺 2 drink minimum</li>
                  <li>🔞 {show.policies.ageRestriction}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section with Feather Embed */}
        {show.tickets.availability === 'InStock' && (
          <section id="booking" className="mt-16">
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8">
                Select Your Seats
              </h2>
              <FeatherEmbed eventId={show.featherId} />
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ShowPage;