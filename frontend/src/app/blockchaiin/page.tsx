// src/app/blockchaiin/page.tsx
"use client";

import "./theme.css";
import dynamic from "next/dynamic";

// Dynamically import components that may access window/document at import or mount
const Hero = dynamic(() => import("@/sections/blockchain/Hero"), { ssr: false });
const Narrative = dynamic(() => import("@/sections/blockchain/Narrative"), { ssr: false });
// Footer usually safe; if it also touches window, switch it to dynamic too
import Footer from "@/sections/blockchain/Footer";

export default function BlockchaiinPage() {
  return (
    <main className="blockchain-theme">
      <Hero />
      <Narrative />
      <Footer />
    </main>
  );
}
