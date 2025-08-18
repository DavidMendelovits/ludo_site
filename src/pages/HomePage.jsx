import React from 'react';
import { Helmet } from 'react-helmet-async';
const FEATHER_URL = 'https://www.feather.rsvp/o/ludo-comedy';

function HomePage() {

  return (
    <>
      <Helmet>
        <title>Comedy Nights - Live Stand-up Comedy Shows in NYC</title>
        <meta name="description" content="Experience the best stand-up comedy in New York. Live shows every Friday and Saturday featuring top comedians. Get tickets now!" />
        <meta property="og:title" content="Comedy Nights - Live Comedy Shows" />
        <meta property="og:description" content="NYC's premier comedy venue featuring the best stand-up comedians" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://project-ludo.com" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-ludo-orange to-ludo-burgundy">
        <div className="text-center">
          <div className="mb-6">
            <img 
              src="/ludo-banner.png" 
              alt="LUDO Comedy" 
              className="mx-auto h-64 md:h-96 w-auto"
            />
          </div>
          <p className="text-2xl text-ludo-cream mb-8">
            Specialty Comedy Events
          </p>
          <a 
            href="#shows" 
            className="inline-block px-8 py-4 bg-ludo-coral text-white font-bold rounded-full hover:bg-ludo-burgundy transition"
          >
            GET TICKETS
          </a>
        </div>
      </section>

      {/* Shows Section */}
      <section id="shows" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          Upcoming Shows
        </h2>
        <div className="flex justify-center">
        <iframe src={FEATHER_URL} width="100%" height="600" title="Book Comedy Show Tickets" className="rounded-lg bg-white md:w-1/2" loading="lazy" />
        </div>
      </section>

      {/* Venue Info */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
            The Venue
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Comedy Shop</h3>
              <p className="text-gray-300 mb-4">
                Located in the heart of Manhattan, The Comedy Shop has been NYC's premier comedy venue for over 20 years. Our intimate 50-seat club room provides the perfect atmosphere for that classic new york city stand up experience.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Full bar service</li>
                <li>✓ 2 drink minimum</li>
                <li>✓ 21+ only with valid ID</li>
                <li>✓ Located near subway stations</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Location</h4>
              <address className="text-gray-300 not-italic">
                167 Bleecker Street<br />
                New York, NY 10012<br />
                718-986-9871
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          Contact Us
        </h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-300 mb-6">
            For group bookings, private events, or general inquiries:
          </p>
          <a 
            href="mailto:info@comedynights.com" 
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