import React, { useState } from 'react';
import Header from './components/Header';
import ImageStudio from './components/ImageStudio';
import ExamGenerator from './components/ExamGenerator';
import OnlineTest from './components/OnlineTest';
import DocConverter from './components/DocConverter';
import { AppMode } from './types';
import { 
  Image, 
  FileText, 
  MonitorPlay, 
  Home, 
  Video, 
  Sparkles, 
  FileType, 
  GraduationCap, 
  Menu,
  Key,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenKeySettings = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio?.openSelectKey) {
      await aiStudio.openSelectKey();
    } else {
      alert("Chức năng chọn API Key chỉ khả dụng trong môi trường được hỗ trợ (AI Studio).");
    }
  };

  const NavItem = ({ mode: itemMode, icon: Icon, label }: { mode: AppMode, icon: any, label: string }) => (
    <button
      onClick={() => {
        setMode(itemMode);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 font-medium ${
        mode === itemMode 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (mode) {
      case AppMode.IMAGE_STUDIO:
        return <ImageStudio />;
      case AppMode.EXAM_GENERATOR:
        return <ExamGenerator />;
      case AppMode.ONLINE_TEST:
        return <OnlineTest />;
      case AppMode.DOC_CONVERTER:
        return <DocConverter />;
      case AppMode.HOME:
      default:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-lg mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Chào mừng trở lại!</h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                Nền tảng hỗ trợ giảng dạy và học tập thông minh dành cho Trường TH&THCS Nà Sáy. 
                Sử dụng sức mạnh của Google Gemini để sáng tạo nội dung và quản lý thi cử.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { m: AppMode.IMAGE_STUDIO, icon: Sparkles, color: 'bg-blue-50 text-blue-600', title: 'Studio Sáng Tạo', desc: 'Tạo ảnh Pro, Video Veo, Chỉnh sửa & Ghép ảnh.' },
                { m: AppMode.EXAM_GENERATOR, icon: FileText, color: 'bg-green-50 text-green-600', title: 'Tạo Đề Thi', desc: 'Sinh đề thi tự động từ ma trận và xuất Word.' },
                { m: AppMode.ONLINE_TEST, icon: MonitorPlay, color: 'bg-purple-50 text-purple-600', title: 'Thi Trực Tuyến', desc: 'Làm bài kiểm tra online có chấm điểm ngay.' },
                { m: AppMode.DOC_CONVERTER, icon: FileType, color: 'bg-orange-50 text-orange-600', title: 'Chuyển Word', desc: 'Chuyển đổi PDF/Ảnh sang Word giữ định dạng.' },
              ].map((item) => (
                <div 
                  key={item.title}
                  onClick={() => setMode(item.m)}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group"
                >
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 flex-col bg-slate-900 text-white h-full shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 text-blue-400 mb-1">
             <div className="bg-blue-600 p-2 rounded-lg text-white">
                <GraduationCap size={24} />
             </div>
             <span className="font-bold text-lg tracking-tight">AI PLATFORM</span>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-2 pl-1">Trường TH&THCS Nà Sáy</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
          <NavItem mode={AppMode.HOME} icon={Home} label="Trang Chủ" />
          <NavItem mode={AppMode.IMAGE_STUDIO} icon={Sparkles} label="Studio AI" />
          <NavItem mode={AppMode.EXAM_GENERATOR} icon={FileText} label="Tạo Đề Thi" />
          <NavItem mode={AppMode.ONLINE_TEST} icon={MonitorPlay} label="Thi Trực Tuyến" />
          <NavItem mode={AppMode.DOC_CONVERTER} icon={FileType} label="Chuyển Đổi File" />
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
           <button 
             onClick={handleOpenKeySettings}
             className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between group border border-slate-700"
           >
             <div className="flex items-center gap-2">
               <Key size={16} className="text-yellow-500" />
               <span>API Key</span>
             </div>
             <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400 group-hover:text-white">Settings</span>
           </button>
           <p className="text-center text-xs text-slate-600 mt-4">© 2024 Nà Sáy School</p>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-white z-50 transform transition-transform duration-300 md:hidden flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
           <span className="font-bold text-xl text-white">Menu</span>
           <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white">
             <X size={24} />
           </button>
        </div>
        <nav className="flex-1 py-6 px-4">
          <NavItem mode={AppMode.HOME} icon={Home} label="Trang Chủ" />
          <NavItem mode={AppMode.IMAGE_STUDIO} icon={Sparkles} label="Studio AI" />
          <NavItem mode={AppMode.EXAM_GENERATOR} icon={FileText} label="Tạo Đề Thi" />
          <NavItem mode={AppMode.ONLINE_TEST} icon={MonitorPlay} label="Thi Trực Tuyến" />
          <NavItem mode={AppMode.DOC_CONVERTER} icon={FileType} label="Chuyển Đổi File" />
          
          <div className="mt-8 pt-8 border-t border-slate-800">
             <button 
               onClick={handleOpenKeySettings}
               className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
             >
               <Key size={20} className="text-yellow-500" />
               <span>Cấu hình API Key</span>
             </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
          title={
            mode === AppMode.HOME ? "Trang Tổng Quan" : 
            mode === AppMode.IMAGE_STUDIO ? "Studio Sáng Tạo" :
            mode === AppMode.EXAM_GENERATOR ? "Công Cụ Tạo Đề" :
            mode === AppMode.ONLINE_TEST ? "Hệ Thống Thi" : "Chuyển Đổi Tài Liệu"
          }
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <div className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth">
           <div className="max-w-6xl mx-auto min-h-full">
             {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;