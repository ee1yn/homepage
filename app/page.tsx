"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MobileNav } from "@/components/mobile-nav"
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, ArrowUp, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  longDescription: string
}

interface ContentData {
  hero: {
    title: string
    subtitle: string
    avatarUrl: string
  }
  projects: Project[]
  skills: string[]
}

// 默认数据
const defaultData: ContentData = {
  hero: {
    title: "Hello, I'm John Doe",
    subtitle: "A passionate Full Stack Developer",
    avatarUrl: "/placeholder.svg?height=200&width=200",
  },
  projects: [
    {
      title: "Default Project",
      description: "A placeholder project description.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["React"],
      link: "#",
      longDescription: "This is a placeholder project.",
    },
  ],
  skills: ["JavaScript", "React", "Node.js"],
}

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [contentData, setContentData] = useState<ContentData>(defaultData)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content")
        if (!response.ok) {
          throw new Error("Failed to fetch content")
        }
        const data = await response.json()
        setContentData(data)
      } catch (error) {
        console.error("Error fetching content:", error)
        // 如果获取失败，保持使用默认数据
      }
    }

    fetchContent()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted text-foreground">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => scrollToTop()}
            className="text-xl md:text-2xl font-bold hover:text-primary transition-colors"
          >
            John Doe
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-primary transition-colors">
              Projects
            </button>
            <Button onClick={() => scrollToSection("contact")} variant="outline" size="sm">
              Contact
            </Button>
          </nav>
          <MobileNav />
        </div>
      </header>

      <main className="pt-16">
        <section
          id="about"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background"
        >
          <div className="container mx-auto px-4 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-48 h-48 mx-auto mb-8"
            >
              <Image
                src={contentData.hero.avatarUrl || "/placeholder.svg"}
                alt="John Doe"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse"></div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              {contentData.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto"
            >
              {contentData.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-16 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="cursor-pointer"
                onClick={() => scrollToSection("projects")}
              >
                <ChevronDown className="h-12 w-12 text-primary hover:text-secondary transition-colors" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-50 bg-grid-pattern"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contentData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group bg-card">
                    <div className="relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full object-cover h-48"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button asChild variant="secondary">
                          <Link href={project.link} className="flex items-center gap-2">
                            View Project <ExternalLink size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 hidden group-hover:block transition-all duration-300 ease-in-out">
                        {project.longDescription}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">My Skills</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {contentData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Badge className="text-lg py-2 px-4 transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-wave-pattern"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Get in Touch</h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              I'm always open to new opportunities and collaborations. Let's create something amazing together!
            </p>
            <form className="max-w-md mx-auto space-y-4 mb-8">
              <Input type="text" placeholder="Your Name" className="bg-background" />
              <Input type="email" placeholder="Your Email" className="bg-background" />
              <Textarea placeholder="Your Message" className="bg-background" />
              <Button type="submit" size="lg" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
            <div className="flex justify-center space-x-6">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
              >
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
              >
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
              >
                <Link href="mailto:johndoe@example.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>

      {showScrollTop && (
        <Button className="fixed bottom-4 right-4 rounded-full p-2" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

