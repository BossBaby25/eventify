import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { Calendar, Clock, MapPin, User, Tag, DollarSign, ExternalLink, Share2, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
  // FIX: Await params and searchParams before accessing properties (Next.js 15+ requirement)
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { id } = resolvedParams;
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: resolvedSearchParams?.page as string || '1',
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Event Image */}
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl group-hover:scale-105 transition-transform duration-500"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image 
                  src={event.imageUrl}
                  alt={event.title}
                  width={1000}
                  height={600}
                  className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Image Overlay Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="order-1 lg:order-2 space-y-8">
              
              {/* Category & Price Badge */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">{event.category.name}</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg font-bold text-white ${
                  event.isFree 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                  <DollarSign className="w-4 h-4" />
                  <span>{event.isFree ? 'FREE' : `$${event.price}`}</span>
                </div>
              </div>

              {/* Event Title */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                  {event.title}
                </h1>
                
                {/* Organizer */}
                <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Organized by</p>
                    <p className="font-semibold text-slate-800">
                      {event.organizer.firstName} {event.organizer.lastName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="pt-4">
                <CheckoutButton event={event} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Date & Time */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-200 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Event Schedule
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Start Date</p>
                        <p className="font-semibold text-slate-800">
                          {formatDateTime(event.startDateTime).dateOnly}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Start Time</p>
                        <p className="font-semibold text-slate-800">
                          {formatDateTime(event.startDateTime).timeOnly}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">End Date</p>
                        <p className="font-semibold text-slate-800">
                          {formatDateTime(event.endDateTime).dateOnly}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">End Time</p>
                        <p className="font-semibold text-slate-800">
                          {formatDateTime(event.endDateTime).timeOnly}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-200 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  Location
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">{event.location}</p>
              </div>

              {/* Description */}
              <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">About This Event</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg">{event.description}</p>
                </div>
                
                {event.url && (
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <Button asChild variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
                      <a href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Visit Event Website
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl">
                <h4 className="text-xl font-bold mb-4">Quick Info</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-200" />
                    <div>
                      <p className="text-sm text-blue-200">Category</p>
                      <p className="font-medium">{event.category.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-blue-200" />
                    <div>
                      <p className="text-sm text-blue-200">Price</p>
                      <p className="font-medium">{event.isFree ? 'Free Event' : `$${event.price}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-200" />
                    <div>
                      <p className="text-sm text-blue-200">Organizer</p>
                      <p className="font-medium">{event.organizer.firstName} {event.organizer.lastName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
                <h4 className="text-xl font-bold text-slate-800 mb-4">Share This Event</h4>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Tag className="w-4 h-4" />
              More Like This
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Related Events
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover more amazing events in the same category
            </p>
          </div>

          <Collection 
            data={relatedEvents?.data}
            emptyTitle="No Related Events Found"
            emptyStateSubtext="Check back later for more events in this category"
            collectionType="All_Events"
            limit={3}
            page={resolvedSearchParams?.page as string || '1'}
            totalPages={relatedEvents?.totalPages}
          />
        </div>
      </section>
    </>
  )
}

export default EventDetails