import { assets } from '../assets/assets';
import { Star } from 'lucide-react';
import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
    <div className="min-h-screen relative flex flex-col md:flex-row bg-gradient-to-br from-white to-gray-100 overflow-hidden">

      {/* Background image */}
      <img
        src={assets.bgImage}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.65 }}
      />

      {/* Optional faint overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-white/50 z-10 pointer-events-none" />

      {/* Left Side - Direct On-Screen Branding */}
      <div className="w-full md:w-7/12 flex flex-col justify-center items-start px-8 md:px-20 py-16 z-20">

        {/* Bigger logo as part of the page */}
        <img
          src={assets.logo}
          alt="SkillVault Logo"
          className="w-52 md:w-64 mb-10 mt-2 select-none"
          style={{
            filter: 'drop-shadow(0 2px 12px rgba(100,88,255,0.09))'
          }}
        />

        {/* Premium Headline & Subheadline */}
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tight text-[#382466] mb-4 drop-shadow-xl leading-tight"
            style={{ fontFamily: 'Inter,ui-sans-serif', letterSpacing: '-0.03em' }}>
          Connect <span className="text-violet-600">beyond</span> just friends.
        </h1>

        <p className="text-xl md:text-2xl text-[#958abb] font-medium mb-10 max-w-2xl leading-8"
           style={{ fontFamily: 'Inter,ui-sans-serif' }}>
          Join the <span className="font-bold text-violet-500">global SkillVault</span> community and grow with like-minded learners.
        </p>

        {/* Testimonial/Social proof as an inline badge, not a card */}
        <div className="flex items-center gap-4 select-none">
          <img
            src={assets.group_users}
            alt="Group"
            className="w-12 h-12 rounded-full object-cover border-2 border-violet-200"
          />
          <div>
            <div className="flex gap-1 text-yellow-400 mb-1">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-violet-700 font-semibold tracking-wide">
              Used by 12,000+ learners
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-5/12 flex items-center justify-center px-4 md:px-8 py-10 z-20 ">
        <div className="w-full max-w-md bg-white/90 border border-gray-200 shadow-2xl rounded-2xl p-10 backdrop-blur-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-7">Sign in to start building yourself</h2>
          <SignIn />
          <div className="mt-6 text-center text-xs text-gray-500">
            No account? <span className="underline decoration-dotted decoration-purple-400 text-purple-600 cursor-pointer">Register now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
