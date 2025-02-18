"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="md:hidden p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" 
          size="icon"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[280px] border-l-neutral-200 bg-white/95 backdrop-blur-md"
      >
        <nav className="flex flex-col items-center justify-center h-full">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href.substring(1))}
              className="relative text-xl font-medium py-4 text-neutral-600 hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-neutral-200 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

