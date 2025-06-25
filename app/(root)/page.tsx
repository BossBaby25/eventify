import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Users, Star, ArrowRight, Sparkles } from 'lucide-react'

export default async function Home({ searchParams }: SearchParamProps) {
  // FIX: Await searchParams before accessing properties (Next.js 15+ requirement)
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const searchText = (resolvedSearchParams?.query as string) || '';
  const category = (resolvedSearchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-16 md:py-24 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-400/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 2xl:gap-20 items-center">
            <div className="flex flex-col justify-center gap-8 text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  Welcome to Eventify
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-800">
                  Host, Connect, 
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
                    Celebrate:
                  </span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl block mt-4 text-slate-700">
                    Your Events, Our Platform!
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Discover amazing events, connect with like-minded people, and create unforgettable experiences. Join thousands of event organizers and attendees worldwide.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto group">
                  <Link href="#events" className="flex items-center gap-2">
                    Explore Events
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild className="border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 w-full sm:w-auto">
                  <Link href="/events/create" className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Create Event
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-800">10K+</div>
                  <div className="text-sm text-slate-600">Events Created</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-800">50K+</div>
                  <div className="text-sm text-slate-600">Happy Users</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-800">99%</div>
                  <div className="text-sm text-slate-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
              <Image 
                src="/assets/images/hero.png"
                alt="Event management hero illustration"
                width={1000}
                height={1000}
                className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] 2xl:max-h-[80vh] object-contain object-center drop-shadow-2xl hover:scale-105 transition-transform duration-700 relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section> 

      {/* Events Section */}
      <section id="events" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-12 md:gap-16">
            
            {/* Section Header */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                Discover Amazing Events
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800">
                Trusted by <br className="hidden sm:block" /> 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Thousands of Events
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                From workshops and conferences to parties and networking events, find experiences that inspire and connect you with your community.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-6 md:p-8 shadow-lg border border-slate-200">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Find Your Perfect Event</h3>
                </div>
                
                <div className="flex w-full flex-col gap-5 md:flex-row">
                  <div className="flex-1">
                    <Search />
                  </div>
                  <div className="md:w-72">
                    <CategoryFilter />
                  </div>
                </div>
              </div>
            </div>

            {/* Events Collection */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-slate-800">
                    {searchText || category ? 'Search Results' : 'Latest Events'}
                  </h3>
                  {events?.data && events.data.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {events.data.length} events
                    </span>
                  )}
                </div>
                
                {!searchText && !category && (
                  <Button variant="outline" asChild className="hidden sm:flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
                    <Link href="/events">
                      View All Events
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>

              <Collection 
                data={events?.data}
                emptyTitle="No Events Found"
                emptyStateSubtext="Try adjusting your search or browse different categories"
                collectionType="All_Events"
                limit={6}
                page={page}
                totalPages={events?.totalPages}
              />
            </div>

            {/* Call to Action */}
            {!searchText && !category && (
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                {/* REMOVED: Pattern SVG reference that was causing 404 */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                </div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    Ready to Host Your Own Event?
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
                    Join thousands of event creators who trust Eventify to bring their visions to life.
                  </p>
                  <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <Link href="/events/create" className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Create Your Event
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}