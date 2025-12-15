import { FaCarSide } from "react-icons/fa"

export default function CarLoader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full bg-slate-50 relative overflow-hidden">

            {/* City Background Silhouette (Optional Effect) */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-slate-200 to-transparent opacity-30 z-0"></div>

            <div className="relative z-10 text-center">
                {/* Car Icon with Bounce Animation */}
                <div className="animate-bounce-drive text-orange-600">
                    <FaCarSide className="w-16 h-16" />
                </div>

                {/* Speed lines logic */}
                <div className="absolute top-1/2 -right-8 w-12 h-1 bg-slate-300 rounded-full animate-speed-line-1"></div>
                <div className="absolute top-1/3 -right-12 w-8 h-1 bg-slate-300 rounded-full animate-speed-line-2"></div>
            </div>

            {/* Road */}
            <div className="w-64 h-2 bg-slate-300 rounded-full mt-2 relative overflow-hidden">
                {/* Moving Road Lines */}
                <div className="absolute top-0 left-0 w-full h-full flex gap-8 animate-road-move">
                    <div className="w-12 h-full bg-slate-400"></div>
                    <div className="w-12 h-full bg-slate-400"></div>
                    <div className="w-12 h-full bg-slate-400"></div>
                    <div className="w-12 h-full bg-slate-400"></div>
                </div>
            </div>

            <p className="mt-4 text-slate-500 font-medium text-sm animate-pulse">Finding your perfect ride...</p>

            <style>{`
        @keyframes bounce-drive {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes road-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes speed-line-1 {
          0% { transform: translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes speed-line-2 {
          0% { transform: translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-80px); opacity: 0; }
        }
        .animate-bounce-drive {
          animation: bounce-drive 0.6s infinite ease-in-out;
        }
        .animate-road-move {
          animation: road-move 0.8s linear infinite;
        }
        .animate-speed-line-1 {
          animation: speed-line-1 1s linear infinite;
        }
        .animate-speed-line-2 {
          animation: speed-line-2 0.8s linear infinite 0.2s;
        }
      `}</style>
        </div>
    )
}
