import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  // Try multiple ways to get the user ID
  const { userId, sessionClaims } = auth();
  
  // Fallback methods to get user ID
  let finalUserId = userId;
  
  if (!finalUserId && sessionClaims) {
    finalUserId = sessionClaims.userId as string;
  }
  
  if (!finalUserId && sessionClaims) {
    finalUserId = sessionClaims.sub as string; // sub is another common property
  }

  // If still no userId, try getting current user
  if (!finalUserId) {
    const user = await currentUser();
    finalUserId = user?.id;
  }

  console.log('Auth result:', { userId, sessionClaims }); // Debug log
  console.log('Final userId:', finalUserId); // Debug log

  if (!finalUserId) {
    // Handle case where user is not authenticated
    return (
      <div className="wrapper text-center py-10">
        <h3 className="h3-bold">Please sign in to view your profile</h3>
      </div>
    );
  }

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId: finalUserId, page: ordersPage})

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId: finalUserId, page: eventsPage })

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage