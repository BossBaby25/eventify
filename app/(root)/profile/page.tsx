import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import { Ticket, Calendar, Plus, Search, User, Crown, Star, TrendingUp, Activity } from 'lucide-react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  // FIX 1: Await searchParams before accessing properties (Next.js 15+ requirement)
  const resolvedSearchParams = await searchParams;
  
  // FIX 2: Get Clerk userId and currentUser
  const { userId: clerkUserId } = await auth();
  
  if (!clerkUserId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full border border-slate-200">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Welcome to Eventify</h3>
          <p className="text-slate-600 mb-6">Please sign in to view your profile and manage your events</p>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  // FIX 3: Get the MongoDB userId from public metadata (same as CreateEvent fix)
  const user = await currentUser();
  const userId = user?.publicMetadata?.userId as string;

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full border border-slate-200">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Profile Setup Required</h3>
          <p className="text-slate-600 mb-6">Your profile needs to be properly configured. Please contact our support team for assistance.</p>
          <Button asChild variant="outline" className="border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-semibold px-8 py-3 rounded-xl">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    );
  }

  const ordersPage = Number(resolvedSearchParams?.ordersPage) || 1;
  const eventsPage = Number(resolvedSearchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId: userId, page: ordersPage})
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId: userId, page: eventsPage })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      
      {/* Profile Header */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            
            {/* User Avatar */}
            <div className="relative inline-block">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
                Welcome back, {user?.firstName || 'Event Creator'}!
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                Manage your events, track your tickets, and create amazing experiences
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto pt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{orderedEvents.length}</div>
                <div className="text-sm text-slate-600">Tickets</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-purple-600">{organizedEvents?.data?.length || 0}</div>
                <div className="text-sm text-slate-600">Events Created</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Tickets Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Ticket className="w-4 h-4" />
                My Collection
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">My Event Tickets</h2>
              <p className="text-lg text-slate-600">Keep track of all your upcoming events and experiences</p>
            </div>
            
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <Link href="/#events" className="flex items-center gap-2">
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Explore More Events
              </Link>
            </Button>
          </div>

          {/* Tickets Collection */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-200 shadow-lg">
            <Collection 
              data={orderedEvents}
              emptyTitle="No Event Tickets Yet"
              emptyStateSubtext="Start your journey by discovering amazing events near you!"
              collectionType="My_Tickets"
              limit={3}
              page={ordersPage}
              urlParamName="ordersPage"
              totalPages={orders?.totalPages}
            />
          </div>
        </div>
      </section>

      {/* Events Organized Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Calendar className="w-4 h-4" />
                Event Creator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Events I've Organized</h2>
              <p className="text-lg text-slate-600">Manage and track the performance of your created events</p>
            </div>
            
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <Link href="/events/create" className="flex items-center gap-2">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Create New Event
              </Link>
            </Button>
          </div>

          {/* Events Collection */}
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl">
            <Collection 
              data={organizedEvents?.data}
              emptyTitle="Ready to Create Your First Event?"
              emptyStateSubtext="Share your passion and bring people together with your amazing event ideas!"
              collectionType="Events_Organized"
              limit={3}
              page={eventsPage}
              urlParamName="eventsPage"
              totalPages={organizedEvents?.totalPages}
            />
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Quick Actions</h3>
            <p className="text-lg text-slate-600">Everything you need to manage your event experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Browse Events */}
            <div className="group cursor-pointer h-full">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Browse Events</h4>
                <p className="text-blue-100 mb-6 flex-grow">Discover amazing events happening near you</p>
                <Button asChild variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold mt-auto">
                  <Link href="/#events">Explore Now</Link>
                </Button>
              </div>
            </div>

            {/* Create Event */}
            <div className="group cursor-pointer h-full">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Create Event</h4>
                <p className="text-purple-100 mb-6 flex-grow">Start organizing your next amazing event</p>
                <Button asChild variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50 font-semibold mt-auto">
                  <Link href="/events/create">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* View Analytics */}
            <div className="group cursor-pointer h-full">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold mb-3">View Analytics</h4>
                <p className="text-green-100 mb-6 flex-grow">Track your event performance and insights</p>
                <Button asChild variant="secondary" className="bg-white text-green-600 hover:bg-green-50 font-semibold mt-auto">
                  <Link href="/analytics">View Stats</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage