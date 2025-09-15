import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 w-full">
        <div className="container mx-auto flex h-24 w-full items-center justify-between px-9">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10">
              <h1 className="font-extrabold font-colmeak italic text-3xl text-emerald-400">
                NF
              </h1>
            </div>
          </div>

          <button className="text-gray-400 hover:text-emerald-400 text-sm tracking-wider transition-colors duration-300 cursor-pointer">
            [ / ] MENU
          </button>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="w-[100vw]">
          <div className="container mx-auto w-full px-8">
            <h1 className="font-bold font-colmeak leading-none text-[7vh] md:text-[14vh] lg:text-[33.25vh] text-center whitespace-nowrap text-white">
              NANOFLUX
            </h1>

            <div className="flex justify-between font-colmeak items-center px-1">
              <div className="text-emerald-400 text-lg font-medium tracking-wide">
                AUTOMATING
              </div>
              <div className="text-gray-400 text-lg font-medium tracking-wide">
                WORKFLOWS
              </div>
            </div>
          </div>
        </section>

        <section className="flex-1 flex items-center justify-center min-h-[50vh] relative">
          <div className="container mx-auto w-full px-8 text-center"></div>

          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex justify-between items-end w-full">
              <a
                href="#"
                className="group flex items-center gap-2 text-emerald-400 hover:text-white transition-colors duration-300"
              >
                <ChevronRight className="w-4 h-4" />
                <span className="relative">
                  Get Started Free
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>

              <Link
                href="/dashboard"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="relative">
                  Read the Docs
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
