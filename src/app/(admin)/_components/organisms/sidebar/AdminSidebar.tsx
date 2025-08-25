import React, { ComponentType } from 'react';
import Link from 'next/link';
import {LockKeyhole, LockKeyholeOpen, LucideProps} from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon?: ComponentType<LucideProps>;
}

interface AdminSidebarProps {
  title: string;
  items: SidebarItem[];
  isLocked?: boolean;
  onLockButton?: (isLocked: boolean) => void;
}

export function AdminSidebar({ title, items, isLocked, onLockButton }: AdminSidebarProps) {
  const lockHiddenButton = (isLocked: boolean) => {
    return (
      <button
        className={"absolute top-5 right-1 p-1 rounded-full shadow-lg cursor-pointer outline outline-gray-500 dark:outline-gray-600 " +
          "bg-white dark:bg-zinc-800/10 hover:bg-violet-300 dark:hover:bg-slate-500/30 "}
        onClick={() => onLockButton?.(!isLocked)}
      >
        {isLocked ? <LockKeyhole className="w-3 h-3" /> : <LockKeyholeOpen className="w-3 h-3" />}
      </button>
    );
  }
  
  return (
    <aside className={`h-screen bg-gray-50/60 dark:bg-zinc-900 text-gray-800 dark:text-gray-100 ${title}`}>
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-center text-xl font-bold">
          { title }
        </h2>
        {lockHiddenButton(isLocked)}
      </div>
      <nav className="p-4">
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className="my-4 rounded-lg shadow-xl outline outline-gray-200 dark:outline-gray-600 bg-white dark:bg-zinc-700/10 transform transition-transform duration-200 ease-in-out hover:scale-110"
            >
              <Link
                href={item.href}
                className="flex items-center p-3 hover:bg-violet-300 focus:bg-violet-300 dark:hover:bg-slate-500/30 rounded-lg transition-colors"
              >
                {item.icon && <item.icon className="w-6 h-6 mr-2 text-gray-600 dark:text-gray-300" />}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;