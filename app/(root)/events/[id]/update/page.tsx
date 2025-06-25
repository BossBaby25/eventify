import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { auth, currentUser } from "@clerk/nextjs/server";  // FIX: Import from /server

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params }: UpdateEventProps) => {
  // FIX 1: Await params before accessing properties (Next.js 15+ requirement)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // FIX 2: Use the same auth pattern as CreateEvent and ProfilePage
  const { userId: clerkUserId } = await auth();
  
  if (!clerkUserId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Please Sign In</h3>
          <p className="text-slate-600">You need to be signed in to update events</p>
        </div>
      </div>
    );
  }

  // FIX 3: Get MongoDB userId from publicMetadata
  const user = await currentUser();
  const userId = user?.publicMetadata?.userId as string;

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Profile Setup Required</h3>
          <p className="text-slate-600">Please contact support to set up your profile</p>
        </div>
      </div>
    );
  }

  const event = await getEventById(id);

  // Check if user owns this event
  const isEventOwner = userId === event.organizer._id.toString();

  if (!isEventOwner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h3>
          <p className="text-slate-600">You can only update your own events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      
      {/* Simple Header */}
      <section className="pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Update Your Event
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Make changes to your event details
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <EventForm 
            type="Update" 
            event={event} 
            eventId={event._id} 
            userId={userId} 
          />
        </div>
      </section>
    </div>
  )
}

export default UpdateEvent