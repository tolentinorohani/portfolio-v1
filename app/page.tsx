import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BackToTop } from "@/components/BackToTop";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Certificates } from "@/components/Certificates";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}