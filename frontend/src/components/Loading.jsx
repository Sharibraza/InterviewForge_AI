import React from 'react'
import './Loading.scss'

export default function Loading() {
    return (
        <div className="loading-wrap">
            <div className="loading-core">
                {/* Orbiting rings */}
                <span className="loading-ring loading-ring--1" />
                <span className="loading-ring loading-ring--2" />
                <span className="loading-ring loading-ring--3" />

                {/* Center bolt icon */}
                <span className="loading-bolt">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M13 2L4.5 13.5H11.5L10 22L20.5 10H13L13 2Z"
                            fill="url(#bolt-load)"
                        />
                        <defs>
                            <linearGradient id="bolt-load" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#ff6b9d" />
                                <stop offset="100%" stopColor="#ff2d78" />
                            </linearGradient>
                        </defs>
                    </svg>
                </span>
            </div>

            {/* Animated dots */}
            <div className="loading-dots">
                <span />
                <span />
                <span />
            </div>
        </div>
    )
}
