"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { MdMenu, MdClose } from "react-icons/md";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { CursorEffect } from "../components/CursorEffect";
import { useCursorEffect } from "@hooks/cursor-effect-hook";
import { useNotification } from "@hooks/notification-hook";
import { Analytics } from "@vercel/analytics/react";
import { EditorTabs } from "./EditorTabs";

/**
 * Defines the main shell structure for the application, handling the responsive sidebar,
 * custom cursor effects, and network status notifications.
 * This ensures a consistent UI across all Next.js pages and encapsulates global layout logic.
 * 
 * @param children - The Next.js page content rendered inside the layout.
 * @returns The main application layout shell.
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { cursorPosition, isHovering, cursorTransition, isMoving } = useCursorEffect();
  const notify = useNotification();

  useEffect(() => {
    const handleOffline = () => {
      notify("You are offline.", false);
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, [notify]);

  return (
    <div className="relative flex bg-primary text-white">
      <motion.button
        className="absolute top-4 right-4 z-50 text-white md:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
        whileHover={{ scale: 1.2, color: "#FFD700" }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: showSidebar ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {showSidebar ? <MdClose size={28} /> : <MdMenu size={28} />}
        </motion.div>
      </motion.button>

      <div
        className={`bg-primary h-screen w-screen md:w-[450px] xl:w-[550px] pl-10 flex flex-col justify-around transition-all duration-300 fixed md:static ${showSidebar ? "left-0 z-40 pr-10" : "-left-full"
          } lg:left-0 border-r border-white/5`}
      >
        <div>
          <Header />
          <Menu setShowSidebar={setShowSidebar} />
        </div>

        <Footer />
      </div>

      <main className="w-full h-screen bg-primary overflow-auto relative flex flex-col">
        <EditorTabs />
        <img
          src="https://i.ibb.co/R7nJpLv/HI.png"
          alt="Background"
          className="fixed w-[200px] h-[125px] lg:w-[350px] lg:h-[300px] top-1/2 left-1/3 lg:left-1/2 transform -translate-x-1/1 -translate-y-1/2 z-10 opacity-100"
          style={{ zIndex: 1 }}
        />
        <div style={{ position: "relative", zIndex: 2 }} className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col w-full h-full">
            {children}
            <Analytics />
          </div>
        </div>
      </main>

      {/* Custom Cursor */}
      <CursorEffect
        cursorPosition={cursorPosition}
        width="10px"
        height="10px"
        backgroundColor="#fff"
        transition={cursorTransition}
        transform={`translate(-50%, -50%) ${isHovering ? "scale(9)" : "scale(1)"}`}
        opacity={1}
        zIndex={9999}
      />

      {/* Larger Ring for Movement */}
      {isMoving && !isHovering && (
        <CursorEffect
          cursorPosition={cursorPosition}
          width="50px"
          height="50px"
          backgroundColor="rgba(255, 255, 255, 0.1)"
          transform="translate(-50%, -50%)"
          transition="transform 0.3s ease-out, opacity 0.3s ease-out"
          opacity={isMoving && !isHovering ? 1 : 0}
          zIndex={9998}
        />
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
