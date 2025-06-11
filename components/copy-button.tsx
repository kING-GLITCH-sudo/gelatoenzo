"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  value: string
  className?: string
  onCopy?: () => void
}

export function CopyButton({ value, className, onCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // Use a safer approach to copy text
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        if (onCopy) {
          try {
            onCopy()
          } catch (error) {
            console.error("Error in onCopy callback:", error)
          }
        }

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = value
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
          document.execCommand("copy")
          setCopied(true)
          if (onCopy) onCopy()

          // Reset copied state after 2 seconds
          setTimeout(() => {
            setCopied(false)
          }, 2000)
        } catch (err) {
          console.error("Fallback: Could not copy text: ", err)
        }

        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.error("Failed to copy text: ", error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn("p-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors", className)}
      title={copied ? "Copied!" : "Copy to clipboard"}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}
