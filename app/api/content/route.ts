import { NextResponse } from "next/server"

export async function GET() {
  // 这里可以从数据库或其他数据源获取数据
  const data = {
    hero: {
      title: "Hello, I'm John Doe",
      subtitle: "A passionate Full Stack Developer crafting innovative digital solutions in New York City",
      avatarUrl: "/placeholder.svg?height=200&width=200",
    },
    projects: [
      {
        title: "Project 1",
        description: "A brief description of the project and its key features.",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["React", "Node.js", "MongoDB"],
        link: "#",
        longDescription:
          "This project showcases a full-stack application built with React, Node.js, and MongoDB. It features real-time data updates, user authentication, and responsive design.",
      },
      {
        title: "Project 2",
        description: "Another interesting project with its unique selling points.",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "#",
        longDescription:
          "A server-side rendered application built with Next.js and TypeScript. It utilizes Tailwind CSS for styling and implements advanced SEO techniques for optimal performance.",
      },
      {
        title: "Project 3",
        description: "Yet another cool project showcasing different technologies.",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Vue.js", "Express", "PostgreSQL"],
        link: "#",
        longDescription:
          "This project demonstrates a Vue.js frontend with an Express backend, using PostgreSQL for data storage. It includes features like data visualization and complex database queries.",
      },
    ],
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "SQL", "Git"],
  }

  return NextResponse.json(data)
}

