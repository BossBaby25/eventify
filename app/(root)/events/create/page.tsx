import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs/server";

const CreateEvent = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-16 md:py-20 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-6">
            Create <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">Event</span>
          </h3>
          <p className="text-xl text-gray-600 text-center mt-4 max-w-3xl mx-auto leading-relaxed">
            Bring your vision to life and create memorable experiences for your community
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 lg:p-12 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
          {/* Subtle background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Form content */}
          <div className="relative z-10">
            <EventForm userId={userId} type="Create" />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateEvent