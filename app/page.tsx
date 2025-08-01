"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react" // Removido Instagram, Menu e X
import { cn } from "@/lib/utils"
import Cloud from "@/components/cloud"
import { useSound } from "@/hooks/use-sound"
import Image from "next/image" // Importado Image para usar a logo

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const { play: playClickSound } = useSound("/sounds/click.mp3")

  // Only run client-side code after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const socialLinks = [
    {
      name: "Loja Gelato Enzo", // Nome alterado
      icon: (
        <Image
          src="/images/gelato-enzo-transparent.webp" // Usando a logo principal
          alt="Gelato Enzo Logo"
          width={20} // Ajuste o tamanho conforme necessário
          height={20} // Ajuste o tamanho conforme necessário
          className="object-contain"
        />
      ),
      url: "https://app.cardapioweb.com/jeyzilla_dayenn_santos_de_sousa", // Link atualizado
      color: "bg-yellow-500", // Cor ajustada para combinar com a logo ou tema da loja
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-5 w-5" />,
      url: "https://wa.link/nj7xij", // Link atualizado
      color: "bg-green-500",
    },
  ]

  const handleLinkClick = () => {
    if (isMounted) {
      try {
        playClickSound()
      } catch (error) {
        console.error("Error playing sound:", error)
      }
    }
  }

  const renderSocialLinks = () => {
    const linkClass =
      "flex items-center p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-md transition-all duration-300 ease-in-out hover:bg-white/60 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-offset-2 hover:ring-sky-300"

    return (
      <>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            onClick={handleLinkClick}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <div className={cn("p-2 rounded-full mr-3", link.color)}>{link.icon}</div>
            <span className="font-medium">{link.name}</span>
          </a>
        ))}
      </>
    )
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url(/images/acai-background-final.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div> {/* Overlay for readability */}
      {/* Clouds background */}
      <div className="fixed inset-0 z-0">
        <Cloud className="absolute top-20 left-10 w-32 h-24 opacity-70 float-animation-1" />
        <Cloud className="absolute top-40 right-20 w-48 h-36 opacity-80 float-animation-2" />
        <Cloud className="absolute bottom-40 left-20 w-40 h-30 opacity-75 float-animation-3" />
        <Cloud className="absolute bottom-20 right-10 w-36 h-28 opacity-65 float-animation-4" />
        <Cloud className="absolute top-1/2 left-1/3 w-44 h-32 opacity-70 float-animation-5" />
      </div>
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Profile section */}
          <div className="mb-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg bounce-animation">
              <img
                src="/images/gelato-enzo-transparent.webp"
                alt="Gelato Enzo Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">GELATO ENZO</h1>
            <p className="text-white/90 text-lg drop-shadow">Entre em contato conosco</p>
          </div>

          {/* Social links - Agora sempre visíveis e responsivos */}
          <div className="space-y-3 w-full max-w-xs mx-auto">{renderSocialLinks()}</div>
        </div>
      </div>
    </main>
  )
}
