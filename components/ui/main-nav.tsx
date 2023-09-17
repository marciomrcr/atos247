import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-1 md:space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-gray-200 transition-colors hover:text-purple-500"
      >
        Overview
      </Link>
      <Link
        href="/cells"
        className="text-sm font-medium text-gray-200 text-muted-foreground transition-colors hover:text-purple-500"
      >
        Células
      </Link>
      <Link
        href="/networks"
        className="text-sm font-medium text-gray-200 text-muted-foreground transition-colors hover:text-purple-500"
      >
        Redes
      </Link>
      <Link
        href="/members"
        className="text-sm font-medium text-gray-200 text-muted-foreground transition-colors hover:text-purple-500"
      >
        Membros
      </Link>
    </nav>
  )
}
