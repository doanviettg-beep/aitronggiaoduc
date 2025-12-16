import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm bg-opacity-90 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 relative hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Thông báo">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:shadow-lg transition-shadow">
           NS
        </div>
      </div>
    </header>
  );
};

export default Header;