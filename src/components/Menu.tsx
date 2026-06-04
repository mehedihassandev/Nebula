import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { menus } from '@constants/menu';
import { iconHash } from '@utils/icons';
import { IMenu } from '@models/Menu';

/**
 * Renders the primary sidebar navigation menu.
 * This component maps configured route constants to interactive UI links,
 * handling active state styles and responsive sidebar collapsing automatically.
 * 
 * @param setShowSidebar - State setter to control mobile sidebar visibility.
 * @returns The navigation Menu UI component.
 */

export const Menu = ({ setShowSidebar }: { setShowSidebar: (show: boolean) => void }) => {
  const pathname = usePathname();

  return (
    <nav className="mt-10">
      {menus.map((item: IMenu, index: number) => {
        const isActive = pathname === item.path;
        return (
          <Link
            href={item.path}
            key={index}
            className={`flex items-center py-[10px] px-[10px] gap-[15px] transition-all duration-500 ${
              isActive ? 'text-secondary font-semibold' : 'text-textColor'
            }`}
            onClick={() => setShowSidebar(false)}
          >
            <div className="flex items-center gap-[15px]">
              {iconHash[item.icon as keyof typeof iconHash]}
              <motion.span
                className="text-[1rem] font-saira"
                whileHover={{
                  scale: 1.05,
                  transform: 'translateX(10px)',
                  transition: { duration: 0.2 }
                }}
                animate={
                  isActive
                    ? {
                        transform: 'translateX(10px)'
                      }
                    : {}
                }
              >
                {item.name}
              </motion.span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;
