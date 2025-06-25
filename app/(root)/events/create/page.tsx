import EventForm from "@/components/shared/EventForm"
import { auth, currentUser } from "@clerk/nextjs/server";

const CreateEvent = async () => {
  const { userId: clerkUserId } = await auth();
  
  if (!clerkUserId) {
    return <div>Sign in to create an event</div>
  }

  // Get the user object to access metadata
  const user = await currentUser();
  
  // Get the MongoDB userId from public metadata
  const userId = user?.publicMetadata?.userId as string;

  // If no MongoDB userId in metadata, show error
  if (!userId) {
    return <div>User profile not properly set up. Please contact support.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4 md:px-8 relative overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-blue-400/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-24 h-24 md:w-32 md:h-32 bg-purple-400/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Create Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Event</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bring your vision to life and create memorable experiences that bring people together
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <EventForm userId={userId} type="Create" />
        </div>
      </section>
    </div>
  )
}

export default CreateEvent