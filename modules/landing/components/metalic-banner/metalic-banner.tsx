"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IBannerImage } from "@/interfaces/banner.interface";
import { cn } from "@/lib/utils";

interface MetallicBannerProps {
  imagen: IBannerImage;
  alt: string;
  onClick?: () => void;
  className?: string;
}

const MetallicBanner: React.FC<MetallicBannerProps> = ({
  imagen,
  alt = "Banner Image",
  onClick = () => console.log("Banner clicked"),
  className = "",
}) => {
  return (
    <div
      className={cn(
        "relative mx-auto rounded-xl overflow-hidden shadow-2xl group cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Imagen de fondo responsive */}
      <div className="relative w-full h-full">
        {/* image desktop */}
        <Image
          src={imagen?.desktop?.src}
          alt={alt}
          width={imagen?.desktop?.width}
          height={imagen?.desktop?.height}
          className="object-contain w-full h-full transition-transform duration-700 hidden md:block"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* image mobile */}
        <Image
          src={imagen?.mobile?.src}
          alt={alt}
          width={imagen?.mobile?.width}
          height={imagen?.mobile?.height}
          className="object-contain w-full h-full transition-transform duration-700 block md:hidden"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0  transition-opacity duration-500 group-hover:bg-black/10" />

        {/* Brillo metálico en los bordes */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Partículas brillantes mejoradas */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping delay-100" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-300" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-500" />
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-700" />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-900" />
      </div>

      <style jsx>{`
        @keyframes diagonal-sweep {
          0% {
            transform: rotate(-45deg) translate(-100%, -100%);
          }
          100% {
            transform: rotate(-45deg) translate(100%, 100%);
          }
        }

        @keyframes light-sweep {
          0% {
            transform: rotate(-45deg) translate(-150%, -150%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: rotate(-45deg) translate(150%, 150%);
            opacity: 0;
          }
        }

        .animate-diagonal-sweep {
          animation: diagonal-sweep 2s ease-in-out;
        }

        .animate-light-sweep {
          animation: light-sweep 2s ease-in-out 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MetallicBanner;
