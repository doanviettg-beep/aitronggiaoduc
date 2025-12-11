import React from 'react';
import { GraduationCap, Key } from 'lucide-react';

const Header: React.FC = () => {
  const handleOpenKeySettings = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio?.openSelectKey) {
      await aiStudio.openSelectKey();
    } else {
      alert("Chức năng chọn API Key chỉ khả dụng trong môi trường được hỗ trợ (AI Studio).");
    }
  };

  return (
    <header className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-full text-blue-700 mr-4 shadow-sm">
             <GraduationCap size={40} />
          </div>
          <div>
            <h2 className="text-sm font-light uppercase tracking-wide opacity-90">UBND Xã Chiềng Sinh</h2>
            <h1 className="text-2xl font-bold uppercase tracking-tight">Trường TH&THCS Nà Sáy</h1>
          </div>
        </div>
        
        <button 
          onClick={handleOpenKeySettings}
          className="flex items-center gap-2 bg-blue-800 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-600 shadow-sm"
          title="Chọn API Key"
        >
           <Key size={16} />
           <span>API Key</span>
        </button>
      </div>
    </header>
  );
};

export default Header;