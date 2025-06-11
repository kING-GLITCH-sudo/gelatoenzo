import { cn } from "@/lib/utils"

interface CloudProps {
  className?: string
}

export default function Cloud({ className }: CloudProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-white rounded-full opacity-90"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-white rounded-full opacity-70"></div>
    </div>
  )
}
