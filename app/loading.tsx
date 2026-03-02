export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0d0c0b] z-50 fixed inset-0">
            <div className="flex flex-col items-center space-y-6">
                {/* Sleek, pulsing luxury crown/fleur-de-lis */}
                <div className="relative h-16 w-16 animate-pulse">
                    <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-full h-full relative z-10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Outer ring */}
                        <circle cx="16" cy="16" r="15" stroke="url(#loadingGold)" strokeWidth="1" fill="none" className="opacity-60" />

                        {/* Crown/Fleur-de-lis hybrid */}
                        <path
                            d="M16 4C16 4 11 9 11 14C11 16.5 13 19 16 19C19 19 21 16.5 21 14C21 9 16 4 16 4Z"
                            fill="url(#loadingGold)"
                        />
                        <path
                            d="M16 21C12 21 9 24 9 28H23C23 24 20 21 16 21Z"
                            fill="url(#loadingGold)"
                        />
                        {/* Side petals */}
                        <path
                            d="M8 14C8 14 9 15 11 15C11 12 13 11 13 11C10 9 8 14 8 14Z"
                            fill="url(#loadingGold)"
                            opacity="0.9"
                        />
                        <path
                            d="M24 14C24 14 23 15 21 15C21 12 19 11 19 11C22 9 24 14 24 14Z"
                            fill="url(#loadingGold)"
                            opacity="0.9"
                        />

                        {/* Gold gradient definition */}
                        <defs>
                            <linearGradient id="loadingGold" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFD700" />
                                <stop offset="50%" stopColor="#DAA520" />
                                <stop offset="100%" stopColor="#FFD700" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Animated Loading Text */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xl font-sans font-light tracking-[0.2em] text-white/50 animate-pulse delay-75">
                        CHARGEMENT
                    </span>
                    <div className="flex space-x-1 ml-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
