import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import './Navbar.scss'

export default function Navbar() {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [ripples, setRipples] = useState([])
    const dropdownRef = useRef(null)
    const btnRef = useRef(null)

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleGetStarted = (e) => {
        // Ripple effect
        const btn = btnRef.current
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now()
        setRipples(prev => [...prev, { x, y, id }])
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700)
        navigate('/register')
    }

    const avatarLetter = user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'

    return (
        <nav className="strike-nav">
            {/* Subtle top glow line */}
            <div className="strike-nav__glow-line" />

            <div className="strike-nav__inner">
                {/* ── Logo ── */}
                <Link to="/" className="strike-nav__logo">
                    <span className="strike-nav__logo-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M13 2L4.5 13.5H11.5L10 22L20.5 10H13L13 2Z"
                                fill="url(#bolt-grad)"
                                stroke="none"
                            />
                            <defs>
                                <linearGradient id="bolt-grad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#ff6b9d" />
                                    <stop offset="100%" stopColor="#ff2d78" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span className="strike-nav__logo-text">StriveX</span>
                </Link>

                {/* ── Right Side ── */}
                <div className="strike-nav__right">
                    {!user ? (
                        /* Get Started Button */
                        <button
                            ref={btnRef}
                            className="strike-nav__cta"
                            onClick={handleGetStarted}
                        >
                            <span className="strike-nav__cta-shimmer" />
                            <span className="strike-nav__cta-label">
                                Get Started
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </span>
                            {ripples.map(r => (
                                <span
                                    key={r.id}
                                    className="strike-nav__cta-ripple"
                                    style={{ left: r.x, top: r.y }}
                                />
                            ))}
                        </button>
                    ) : (
                        /* Avatar + Dropdown */
                        <div
                            className={`strike-nav__avatar-wrap ${dropdownOpen ? 'strike-nav__avatar-wrap--open' : ''}`}
                            ref={dropdownRef}
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button
                                className="strike-nav__avatar"
                                onClick={() => setDropdownOpen(o => !o)}
                                aria-label="User menu"
                            >
                                <span className="strike-nav__avatar-ring" />
                                <span className="strike-nav__avatar-letter">{avatarLetter}</span>
                            </button>

                            {/* Dropdown */}
                            <div className={`strike-nav__dropdown ${dropdownOpen ? 'strike-nav__dropdown--visible' : ''}`}>
                                <div className="strike-nav__dropdown-arrow" />

                                <div className="strike-nav__dropdown-header">
                                    <div className="strike-nav__dropdown-avatar">{avatarLetter}</div>
                                    <div>
                                        <p className="strike-nav__dropdown-name">{user.username || 'User'}</p>
                                        <p className="strike-nav__dropdown-email">{user.email}</p>
                                    </div>
                                </div>


                                <div className="strike-nav__dropdown-divider" />

                                <button
                                    className="strike-nav__dropdown-item strike-nav__dropdown-item--danger"
                                    onClick={() => { handleLogout(); setDropdownOpen(false) }}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
