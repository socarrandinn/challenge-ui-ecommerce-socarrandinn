"use client";
import { useEffect, useState, useRef, useCallback } from "react";

export const useScrollBar = () => {
  const [navigationState, setNavigationState] = useState({
    isVisible: true,
    lastScrollY: 0,
    isMobileMenuOpen: false,
    hasAnimated: false,
  });

  const scrollTimeoutRef = useRef<any>(null);
  const animationFrameRef = useRef(null);

  const updateNavigationVisibility = useCallback((scrollPosition: number) => {
    const isInTriggerZone = scrollPosition >= 100 && scrollPosition <= 180;

    setNavigationState((prevState) => {
      // Si ya animó y seguimos en la zona, no hacer nada
      if (isInTriggerZone && prevState.hasAnimated) {
        return { ...prevState, lastScrollY: scrollPosition };
      }

      // Si no ha animado y estamos en la zona de activación
      if (isInTriggerZone && !prevState.hasAnimated) {
        // Ocultar inmediatamente
        const newState = {
          ...prevState,
          isVisible: false,
          lastScrollY: scrollPosition,
        };

        // Mostrar después del delay
        scrollTimeoutRef.current = setTimeout(() => {
          setNavigationState((currentState) => ({
            ...currentState,
            isVisible: true,
            hasAnimated: true,
          }));
        }, 300);

        return newState;
      }

      // Si salimos de la zona de activación
      if (!isInTriggerZone) {
        return {
          ...prevState,
          isVisible: true,
          hasAnimated: false,
          lastScrollY: scrollPosition,
        };
      }

      // Estado por defecto
      return { ...prevState, lastScrollY: scrollPosition };
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // @ts-ignore
    animationFrameRef.current = requestAnimationFrame(() => {
      updateNavigationVisibility(window.scrollY);
    });
  }, [updateNavigationVisibility]);

  const toggleMobileMenu = useCallback((isOpen: boolean) => {
    setNavigationState((prevState) => ({
      ...prevState,
      isMobileMenuOpen:
        typeof isOpen === "boolean" ? isOpen : !prevState.isMobileMenuOpen,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  return {
    isVisible: navigationState.isVisible,
    lastScrollY: navigationState.lastScrollY,
    isMobileMenuOpen: navigationState.isMobileMenuOpen,
    setIsMobileMenuOpen: toggleMobileMenu,
    hasAnimated: navigationState.hasAnimated,
  };
};
