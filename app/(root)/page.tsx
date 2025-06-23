// import CategoryFilter from '@/components/shared/CategoryFilter';
// import Collection from '@/components/shared/Collection'
// import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
// import { getAllEvents } from '@/lib/actions/event.actions';
// import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  // const page = Number(searchParams?.page) || 1;
  // const searchText = (searchParams?.query as string) || '';
  // const category = (searchParams?.category as string) || '';

  // const events = await getAllEvents({
  //   query: searchText,
  //   category,
  //   page,
  //   limit: 6
  // })

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-12 md:py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 2xl:gap-16 items-center">
            <div className="flex flex-col justify-center gap-8 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Host, Connect, 
                <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Celebrate:
                </span>
                Your Events, Our Platform!
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-fit">
                <Link href="#events">
                  Explore Now
                </Link>
              </Button>
            </div>

            <Image 
              src="/assets/images/hero.png"
              alt="hero"
              width={1000}
              height={1000}
              className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] 2xl:max-h-[50vh] object-contain object-center drop-shadow-2xl order-1 lg:order-2 hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </section> 

      <section id="events" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 md:gap-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center">
              Trusted by <br /> 
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Thousands of Events
              </span>
            </h2>

            {/* Commented out search and filter components */}
            {/* 
            <div className="flex w-full flex-col gap-5 md:flex-row">
              <Search />
              <CategoryFilter />
            </div>
            */}

            {/* Placeholder for search and filter */}
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-8 lg:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Search & Filter Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  Event search and category filtering will be available once the database is implemented.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Development in Progress
                </div>
              </div>
            </div>

            {/* Commented out Collection component */}
            {/* 
            <Collection 
              data={events?.data}
              emptyTitle="No Events Found"
              emptyStateSubtext="Come back later"
              collectionType="All_Events"
              limit={6}
              page={page}
              totalPages={events?.totalPages}
            />
            */}

            {/* Placeholder for events collection */}
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-8 lg:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Events Collection Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  Event listings will appear here once the database and event management features are implemented.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Ready for Database Integration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}