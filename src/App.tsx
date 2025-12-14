import { Routes, Route, useNavigate } from 'react-router-dom'
import HeroSection from './pages/HeroSection/HeroSection'
import Fleet from './pages/Fleet/Fleet'
import Certified from './pages/Certified/Certified'
import Subscription from './pages/Subscription/Subscription'
import CorporateFleet from './pages/CorporateFleet/CorporateFleet'
import Guide from './pages/Guide/Guide'
import AdminDashboard from './pages/AdminDashboardPage/AdminDashboard'
import AccountSettings from './pages/AccountSettingsPage/AccountSettings'
import WhoWeAre from './pages/WhoWeAre/WhoWeAre'
import Reviews from './pages/Reviews/ReviewListsSection/Reviews'
import Press from './pages/Press&Media/Press'
import Careers from './pages/Careers/Careers'
import GetInTouch from './pages/GetInTouch/GetInTouch'
import FAQs from './pages/FAQs/FAQs'
import TermsOfService from './pages/TermsOfService/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPoiicy/PrivacyPolicy'
import Notify from './components/Layouts/Common/Notify'
import './App.css'

function App() {
  const navigate = useNavigate()

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    let path = page === 'home' ? '/' : `/${page}`

    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.set(key, value)
      })
      const queryString = searchParams.toString()
      if (queryString) {
        path += `?${queryString}`
      }
    }

    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Notify />
      <Routes>
        <Route path="/" element={<HeroSection onNavigate={handleNavigate} />} />
        <Route path="/fleet" element={<Fleet onNavigate={handleNavigate} />} />
        <Route path="/certified" element={<Certified onNavigate={handleNavigate} />} />
        <Route path="/subscription" element={<Subscription onNavigate={handleNavigate} />} />
        <Route path="/corporateFleet" element={<CorporateFleet onNavigate={handleNavigate} />} />
        <Route path="/guide" element={<Guide onNavigate={handleNavigate} />} />
        <Route path="/admin" element={<AdminDashboard onNavigate={handleNavigate} />} />
        <Route path="/accountSetting" element={<AccountSettings onNavigate={handleNavigate} />} />
        <Route path="/whoWeAre" element={<WhoWeAre onNavigate={handleNavigate} />} />
        <Route path="/reviews" element={<Reviews onNavigate={handleNavigate} />} />
        <Route path="/press" element={<Press onNavigate={handleNavigate} />} />
        <Route path="/careers" element={<Careers onNavigate={handleNavigate} />} />
        <Route path="/getInTouch" element={<GetInTouch onNavigate={handleNavigate} />} />
        <Route path="/faqs" element={<FAQs onNavigate={handleNavigate} />} />
        <Route path="/terms" element={<TermsOfService onNavigate={handleNavigate} />} />
        <Route path="/privacy" element={<PrivacyPolicy onNavigate={handleNavigate} />} />
        <Route path="*" element={<HeroSection onNavigate={handleNavigate} />} />
      </Routes>
    </div>
  )
}

export default App
