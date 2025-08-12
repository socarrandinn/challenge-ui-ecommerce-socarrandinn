"use client";
import Image from "next/image";
import Link from "next/link";
import { IBannerImage } from "@/interfaces/banner.interface";
import { cn } from "@/lib/utils";

interface MetallicBannerProps {
  imagen: IBannerImage;
  alt: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  openInNewTab?: boolean;
  unoptimized?: boolean;
  // ✅ NUEVO: Prop para indicar si es imagen LCP
  priority?: boolean;
  // ✅ NUEVO: Prop para fetchPriority
  fetchPriority?: "high" | "low" | "auto";
}

const MetallicBanner: React.FC<MetallicBannerProps> = ({
  imagen,
  alt = "Banner Image",
  href,
  onClick = () => console.log("Banner clicked"),
  className = "",
  openInNewTab = false,
  unoptimized = false,
  // ✅ Por defecto asume que NO es LCP (lazy loading)
  priority = false,
  fetchPriority = "auto",
}) => {
  const handleClick = () => {
    if (!href) {
      onClick();
    }
  };

  // ✅ Determinar si debe usar lazy loading
  const shouldUseLazyLoading = !priority;

  const bannerContent = (
    <div
      className={cn(
        "relative mx-auto rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-500",
        "hover:shadow-card",
        className
      )}
      onClick={handleClick}
    >
      {/* Imagen de fondo responsive */}
      <div className="relative w-full h-full">
        {/* ✅ Image desktop optimizada */}
        <Image
          src={imagen?.desktop?.src}
          alt={alt}
          width={imagen?.desktop?.width}
          height={imagen?.desktop?.height}
          className="object-contain w-full h-full transition-all duration-700 hidden md:block"
          unoptimized={unoptimized}
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/images/no-image.webp"
          // ✅ CORREGIDO: Condicional para loading
          {...(shouldUseLazyLoading ? { loading: "lazy" } : {})}
          // ✅ AGREGADO: Priority y fetchPriority
          priority={priority}
          {...(fetchPriority !== "auto" ? { fetchPriority } : {})}
        />

        {/* ✅ Image mobile optimizada */}
        <Image
          src={imagen?.mobile?.src}
          alt={alt}
          width={imagen?.mobile?.width}
          height={imagen?.mobile?.height}
          className="object-contain w-full h-full transition-all duration-700 block md:hidden"
          unoptimized={unoptimized}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/images/no-image.webp"
          // ✅ CORREGIDO: Condicional para loading
          {...(shouldUseLazyLoading ? { loading: "lazy" } : {})}
          // ✅ AGREGADO: Priority y fetchPriority
          priority={priority}
          {...(fetchPriority !== "auto" ? { fetchPriority } : {})}
        />

        {/* Overlay con gradiente metálico */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

        {/* Efecto de barrido diagonal mejorado */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -top-full -left-full w-full h-full bg-gradient-to-br from-transparent via-white/30 to-transparent transform rotate-12 translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-[200%] group-hover:translate-y-[200%] transition-transform duration-1000 ease-out" />
        </div>

        {/* Bordes metálicos brillantes mejorados */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Borde superior */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/80 to-transparent animate-pulse" />
          {/* Borde inferior */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/80 to-transparent animate-pulse delay-200" />
          {/* Borde izquierdo */}
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/80 to-transparent animate-pulse delay-100" />
          {/* Borde derecho */}
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/80 to-transparent animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );

  // Si hay href, envolver con Link de Next.js
  if (href) {
    return (
      <Link
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        className="block"
      >
        {bannerContent}
      </Link>
    );
  }

  return bannerContent;
};


export default MetallicBanner