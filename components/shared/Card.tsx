'use client'

import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { useAuth, useUser } from '@clerk/nextjs'  // ADDED: useUser hook
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { Calendar, Clock, MapPin, User, Edit, DollarSign, ExternalLink, Tag } from 'lucide-react'

type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  // FIX: Get both auth and user data
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  // FIX: Get MongoDB userId from publicMetadata (same as other components)
  const userId = user?.publicMetadata?.userId as string;

  // FIX: Now this comparison will work correctly
  const isEventCreator = isSignedIn && userId && userId === event.organizer._id.toString();

  return (
    <div className="group relative w-full max-w-[400px] bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden border border-slate-200 hover:border-blue-300">
      
      {/* Event Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Link href={`/events/${event._id}`}>
          <div 
            style={{backgroundImage: `url(${event.imageUrl})`}}
            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 bg-gradient-to-br from-slate-200 to-slate-300"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Creator Actions */}
        {isEventCreator && !hidePrice && (
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Link 
              href={`/events/${event._id}/update`}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 group/edit"
            >
              <Edit className="w-4 h-4 text-slate-700 group-hover/edit:text-blue-600" />
            </Link>
            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
              <DeleteConfirmation eventId={event._id} />
            </div>
          </div>
        )}

        {/* Price & Category Badges */}
        {!hidePrice && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className={`px-3 py-1.5 rounded-full font-semibold text-sm shadow-lg backdrop-blur-sm ${
              event.isFree 
                ? 'bg-emerald-500/90 text-white' 
                : 'bg-blue-600/90 text-white'
            }`}>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {event.isFree ? 'FREE' : `$${event.price}`}
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1.5 rounded-full font-medium text-sm shadow-lg">
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {event.category.name}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6 space-y-4">
        
        {/* Event Title */}
        <Link href={`/events/${event._id}`}>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer group-hover:text-blue-600">
            {event.title}
          </h3>
        </Link>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-slate-600">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">
              {formatDateTime(event.startDateTime).dateOnly}
            </p>
            <p className="text-xs text-slate-500">
              {formatDateTime(event.startDateTime).timeOnly}
            </p>
          </div>
        </div>

        {/* Location (if available) */}
        {event.location && (
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm text-slate-600 line-clamp-1 flex-1">
              {event.location}
            </p>
          </div>
        )}

        {/* Organizer */}
        <div className="flex items-center gap-2 text-slate-600">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>
            <p className="text-xs text-slate-500">Event Organizer</p>
          </div>
        </div>

        {/* Order Link */}
        {hasOrderLink && (
          <div className="pt-2 border-t border-slate-200">
            <Link 
              href={`/orders?eventId=${event._id}`} 
              className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-200 group/order"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">View Order Details</span>
              </div>
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover/order:scale-110 transition-transform duration-200">
                <ExternalLink className="w-3 h-3 text-white" />
              </div>
            </Link>
          </div>
        )}

        {/* Action Button */}
        {!hasOrderLink && (
          <div className="pt-2">
            <Link href={`/events/${event._id}`}>
              <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center">
                <span className="flex items-center justify-center gap-2">
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  )
}

export default Card