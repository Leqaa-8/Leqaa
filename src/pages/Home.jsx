import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import TemplatesPreview from '../components/home/TemplatesPreview'
import CustomDesign from '../components/home/CustomDesign'
import Testimonials from '../components/home/Testimonials'
import FAQ from '../components/home/FAQ'

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <TemplatesPreview />
      <CustomDesign />
      <Testimonials />
      <FAQ />
    </main>
  )
}
