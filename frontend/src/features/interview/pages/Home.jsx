import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Loading from '../../../components/Loading.jsx'


const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        console.log("Generated Report:", data._id);
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <Loading />
            </main>
        )
    }

    return (
        <>

            <div className='home-page'>

                {/* Page Header */}
                <header className='page-header'>
                    <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                    <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </header>

                {/* Main Card */}
                <div className='interview-card'>
                    <div className='interview-card__body'>

                        {/* Left Panel - Job Description */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            <textarea
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className='panel__textarea'
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                maxLength={5000}
                            />
                            <div className='char-counter'>0 / 5000 chars</div>
                        </div>

                        {/* Vertical Divider */}
                        <div className='panel-divider' />

                        {/* Right Panel - Profile */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2>Your Profile</h2>
                            </div>

                            {/* Upload Resume */}
                            <div className='upload-section'>
                                <label className='section-label' htmlFor='resume'>
                                    Upload Resume
                                    <span className='badge badge--best'>Best Results</span>
                                </label>
                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    </span>
                                    <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                    <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                    <input ref={resumeInputRef} type='file' id='resume' name='resume' accept='.pdf,.docx' required />
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className='or-divider'>-</div>

                            {/* Quick Self-Description */}
                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Self-Description <span className='badge badge--required'>Required</span></label>
                                <textarea
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                    required
                                />
                            </div>

                            {/* Info Box */}
                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#f59e0b" stroke="#f59e0b" />
                                        <line x1="12" y1="9" x2="12" y2="13" stroke="#1a1a1a" strokeWidth="2" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" stroke="#1a1a1a" strokeWidth="2" />
                                    </svg>                            </span>
                                <p><strong>Resume</strong> and <strong>Self Description</strong> are required to generate a personalized plan.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className='interview-card__footer'>
                        <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                        <button
                            onClick={handleGenerateReport}
                            className='generate-btn'
                            href='#reports'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate Plan
                        </button>
                    </div>
                </div>

                {/* Recent Reports List */}
                {reports.length > 0 && (
                    <section className='recent-reports' id='reports'>
                        <h2><span className="footer-info" >
                            <svg width="32" height="28" viewBox="1 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                {/* <!-- Antenna --> */}
                                <line x1="16" y1="2" x2="16" y2="7" stroke="#ff2d78" stroke-width="1.5" stroke-linecap="round" />
                                <circle cx="16" cy="2" r="1.5" fill="#ff2d78" />

                                {/* <!-- Head --> */}
                                <rect x="5" y="7" width="22" height="16" rx="5" fill="#ff2d78" opacity="0.12" />
                                <rect x="5" y="7" width="22" height="16" rx="5" fill="none" stroke="#ff2d78" stroke-width="1.4" />

                                {/* <!-- Eyes --> */}
                                <circle cx="11.5" cy="14" r="2.5" fill="#ff2d78" opacity="0.2" />
                                <circle cx="11.5" cy="14" r="2.5" fill="none" stroke="#ff2d78" stroke-width="1.2" />
                                <circle cx="11.5" cy="14" r="1" fill="#ff2d78" />
                                <circle cx="20.5" cy="14" r="2.5" fill="#ff2d78" opacity="0.2" />
                                <circle cx="20.5" cy="14" r="2.5" fill="none" stroke="#ff2d78" stroke-width="1.2" />
                                <circle cx="20.5" cy="14" r="1" fill="#ff2d78" />

                                {/* <!-- Mouth --> */}
                                <path d="M12 19.5 Q16 21.5 20 19.5" fill="none" stroke="#ff2d78" stroke-width="1.3" stroke-linecap="round" />

                                {/* <!-- Body --> */}
                                <rect x="9" y="23" width="14" height="7" rx="3" fill="#ff2d78" opacity="0.12" />
                                <rect x="9" y="23" width="14" height="7" rx="3" fill="none" stroke="#ff2d78" stroke-width="1.4" />
                                <circle cx="16" cy="26.5" r="1.2" fill="#ff2d78" opacity="0.9" />

                                {/* <!-- Arms -->    */}
                                <rect x="1" y="24" width="5" height="5" rx="2" fill="#ff2d78" opacity="0.12" />
                                <rect x="1" y="24" width="5" height="5" rx="2" fill="none" stroke="#ff2d78" stroke-width="1.2" />
                                <rect x="26" y="24" width="5" height="5" rx="2" fill="#ff2d78" opacity="0.12" />
                                <rect x="26" y="24" width="5" height="5" rx="2" fill="none" stroke="#ff2d78" stroke-width="1.2" />
                            </svg>  AI-Powered Interview Plan
                        </span> </h2>
                        <ul className='reports-list'>
                            {reports.map(report => (
                                <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Page Footer */}
                <footer className='page-footer'>
                    {/* <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a> */}
                    <p>made with <span style={{ color: "red" }}>&hearts;</span> by <span id='sharib' onClick={() => window.open('https://www.linkedin.com/in/sharib-shaikh/', '_blank')}>Muhammad_Sharib</span></p>
                </footer>
            </div>
        </>
    )
}

export default Home