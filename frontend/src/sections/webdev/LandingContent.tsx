"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LandingContent() {
    return (
        <div
            className="min-h-screen text-white"
            style={{
                background: "linear-gradient(135deg, #230c51, #000000)", // dark blue → black
            }}
        >
            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-10 py-6 fixed w-full backdrop-blur-md bg-white/5 z-50">
                <h1 className="text-2xl font-bold">WebDev Hub</h1>
                <ul className="flex gap-8 text-lg">
                    <li className="hover:text-blue-400 cursor-pointer">Home</li>
                    <li className="hover:text-blue-400 cursor-pointer">About</li>
                    <li className="hover:text-blue-400 cursor-pointer">Skills</li>
                </ul>
            </nav>

            {/* HERO SECTION */}
            <section className="h-screen flex flex-col justify-center items-center text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl font-extrabold mb-6"
                >
                    Master Web Development
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="max-w-2xl text-lg opacity-90 leading-relaxed mb-10"
                >
                    Build beautiful, functional, and scalable websites with modern web
                    technologies. Learn front-end, back-end, UI/UX, APIs, and deployment —
                    everything needed to thrive as a full-stack developer.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-3 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
                >
                    Get Started
                </motion.button>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-24 px-10">
                <motion.h2
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold mb-6"
                >
                    What is Web Development?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl text-lg opacity-80 leading-relaxed"
                >
                    Web development refers to building websites and applications for the internet.
                    It includes front-end (UI/UX, React, HTML/CSS/JS), back-end (servers,
                    APIs, databases), and full-stack development. Modern web development powers
                    the digital experiences used every day across the world.
                </motion.p>
            </section>

            {/* FEATURE CARDS SECTION */}
            <section id="skills" className="py-24 px-10">
                <h2 className="text-4xl font-bold text-center mb-16">Core Skills</h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Front-End",
                            desc: "Create beautiful, responsive interfaces using React, HTML, CSS, and JavaScript.",
                        },
                        {
                            title: "Back-End",
                            desc: "Build APIs and server logic with Node.js, Express, databases, and authentication.",
                        },
                        {
                            title: "Full-Stack",
                            desc: "Combine both front-end and back-end skills to build complete applications.",
                        },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 cursor-pointer transition"
                        >
                            <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                            <p className="opacity-80">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center py-8 opacity-60 text-sm">
                © {new Date().getFullYear()} WebDev Hub • All Rights Reserved
            </footer>
        </div>
    );
}
