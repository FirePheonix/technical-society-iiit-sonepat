// src/app/blockchaiin/page.tsx
"use client";

// 1. Import your new theme file
import "./theme.css";

import Hero from "@/sections/blockchain/Hero";
import Narrative from "@/sections/blockchain/Narrative";
import Footer from "@/sections/blockchain/Footer";

export default function BlockchaiinPage() {
  return (
    // 2. Wrap everything in the .blockchain-theme class
    <main className="blockchain-theme">
      <Hero />
      <Narrative />
      <Footer />
    </main>
  );
}