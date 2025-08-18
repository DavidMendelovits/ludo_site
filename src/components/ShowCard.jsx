import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function ShowCard({ show }) {
  const showDate = new Date(show.date);
  const formattedDate = format(showDate, 'EEEE, MMMM d');
  const formattedTime = format(showDate, 'h:mm a');

  return (
    <article className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition">
      <img 
        src={show.thumbnailImage || show.image} 
        alt={show.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {show.title}
        </h3>
        <div className="text-gray-300 mb-4">
          <p>{formattedDate} at {formattedTime}</p>
          <p className="text-sm">{show.venue.name}</p>
        </div>
        <p className="text-gray-400 mb-4 line-clamp-2">
          {show.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">${show.tickets.price}</span>
          <Link 
            to={show.url}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ShowCard;