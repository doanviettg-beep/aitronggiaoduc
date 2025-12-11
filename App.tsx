
import React, { useState } from 'react';
import Header from './components/Header';
import ImageStudio from './components/ImageStudio';
import ExamGenerator from './components/ExamGenerator';
import OnlineTest from './components/OnlineTest';
import DocConverter from './components/DocConverter';
import { AppMode } from './types';
import { Image, FileText, MonitorPlay, Home, Video, Sparkles, FileType } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-10">
            <div 
              onClick={() => setMode(AppMode.IMAGE_STUDIO)}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group text-center"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Studio Sáng Tạo AI</h3>
              <p className="text-gray-500 text-sm">Tạo ảnh Pro, Video Veo, Chỉnh sửa & Ghép ảnh nghề nghiệp.</p>
            </div>

            <div 
              onClick={() => setMode(AppMode.EXAM_GENERATOR)}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group text-center"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tạo Đề & Ôn Tập</h3>
              <p className="text-gray-500 text-sm">Sinh đề thi tự động từ ma trận và xuất ra file Word.</p>
            </div>

            <div 
              onClick={() => setMode(AppMode.ONLINE_TEST)}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group text-center"
            >
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <MonitorPlay size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Thi Trực Tuyến</h3>
              <p className="text-gray-500 text-sm">Làm bài kiểm tra online có tính giờ và chấm điểm ngay.</p>
            </div>

            <div 
              onClick={() => setMode(AppMode.DOC_CONVERTER)}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group text-center"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <FileType size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Chuyển sang Word</h3>
              <p className="text-gray-500 text-sm">Chuyển đổi PDF/Ảnh sang Word giữ nguyên định dạng bảng.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      {/* Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm backdrop-blur-md bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2 no-scrollbar">
            <button 
              onClick={() => setMode(AppMode.HOME)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${mode === AppMode.HOME ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Home size={18} /> Trang Chủ
            </button>
            <div className="w-px bg-gray-200 mx-2 h-6 self-center hidden sm:block"></div>
            <button 
              onClick={() => setMode(AppMode.IMAGE_STUDIO)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${mode === AppMode.IMAGE_STUDIO ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Sparkles size={18} /> Studio AI
            </button>
            <button 
              onClick={() => setMode(AppMode.EXAM_GENERATOR)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${mode === AppMode.EXAM_GENERATOR ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FileText size={18} /> Tạo Đề
            </button>
            <button 
              onClick={() => setMode(AppMode.ONLINE_TEST)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${mode === AppMode.ONLINE_TEST ? 'bg-purple-50 text-purple-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <MonitorPlay size={18} /> Thi Online
            </button>
            <button 
              onClick={() => setMode(AppMode.DOC_CONVERTER)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${mode === AppMode.DOC_CONVERTER ? 'bg-orange-50 text-orange-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FileType size={18} /> Chuyển Word
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        <p>© 2024 Trường TH&THCS Nà Sáy - UBND Xã Chiềng Sinh. Powered by Google Gemini AI.</p>
      </footer>
    </div>
  );
};

export default App;
