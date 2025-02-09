"use client"

import { Navbar } from "../components/Navbar"
import { GridLayout } from "../components/GridLayout"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <GridLayout />
      </main>
    </div>
  )
}

