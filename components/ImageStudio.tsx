import React, { useState } from 'react';
import { Upload, Briefcase, Users, Image as ImageIcon, Sparkles, Loader2, Wand2, Crown, Clapperboard, Video, Eraser } from 'lucide-react';
import { generateCareerImage, mergeTwoImages, editImageWithPrompt, generateProImage, generateVeoVideo, removeBackground } from '../services/geminiService';

const CAREERS = [
  'Giáo viên', 'Công an', 'Bác sĩ', 'Cứu hoả', 'Đầu bếp', 'Phi hành gia', 'Kỹ sư', 'Nông dân'
];

const QUICK_EDITS = [
  "Thêm hiệu ứng Retro cổ điển",
  "Xóa người ở nền phía sau",
  "Chuyển thành tranh sơn dầu",
  "Làm ảnh sáng và rõ nét hơn"
];

// Helper to access global aistudio object
const getAiStudio = () => (window as any).aistudio;

const ImageStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'career' | 'merge' | 'edit' | 'removeBg' | 'genPro' | 'veo'>('career');
  
  // States for Career Mode
  const [careerImage, setCareerImage] = useState<File | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string>(CAREERS[0]);
  
  // States for Merge Mode
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [bgImage, setBgImage] = useState<File | null>(null);

  // States for Edit Mode
  const [editSourceImage, setEditSourceImage] = useState<File | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>("");

  // States for Remove Bg Mode
  const [removeBgImage, setRemoveBgImage] = useState<File | null>(null);

  // States for Pro Gen Mode
  const [proPrompt, setProPrompt] = useState<string>("");
  const [proSize, setProSize] = useState<'1K' | '2K' | '4K'>('1K');

  // States for Veo Mode
  const [veoImage, setVeoImage] = useState<File | null>(null);
  const [veoPrompt, setVeoPrompt] = useState<string>("");
  const [veoRatio, setVeoRatio] = useState<'16:9' | '9:16'>('16:9');

  // General States
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetState = (tab: any) => {
    setActiveTab(tab);
    setResultImage(null);
    setResultVideo(null);
    setError(null);
  };

  const ensureApiKey = async () => {
    const aiStudio = getAiStudio();
    if (aiStudio && aiStudio.hasSelectedApiKey && aiStudio.openSelectKey) {
      const hasKey = await aiStudio.hasSelectedApiKey();
      if (!hasKey) {
        await aiStudio.openSelectKey();
      }
    }
  };

  const handleCareerGenerate = async () => {
    if (!careerImage) return;
    setIsGenerating(true);
    setError(null);
    setResultImage(null);
    try {
      const result = await generateCareerImage(careerImage, selectedCareer);
      setResultImage(result);
    } catch (e) {
      setError("Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMergeGenerate = async () => {
    if (!faceImage || !bgImage) return;
    setIsGenerating(true);
    setError(null);
    setResultImage(null);
    try {
      const result = await mergeTwoImages(faceImage, bgImage);
      setResultImage(result);
    } catch (e) {
      setError("Có lỗi xảy ra khi ghép ảnh. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditGenerate = async () => {
    if (!editSourceImage || !editPrompt) return;
    setIsGenerating(true);
    setError(null);
    setResultImage(null);
    try {
      const result = await editImageWithPrompt(editSourceImage, editPrompt);
      setResultImage(result);
    } catch (e) {
      setError("Có lỗi xảy ra khi chỉnh sửa ảnh.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRemoveBgGenerate = async () => {
    if (!removeBgImage) return;
    setIsGenerating(true);
    setError(null);
    setResultImage(null);
    try {
      const result = await removeBackground(removeBgImage);
      setResultImage(result);
    } catch (e) {
      setError("Có lỗi xảy ra khi xóa nền ảnh.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProGenerate = async () => {
    if (!proPrompt) return;
    await ensureApiKey(); // Premium feature
    setIsGenerating(true);
    setError(null);
    setResultImage(null);
    try {
      const result = await generateProImage(proPrompt, proSize);
      setResultImage(result);
    } catch (e) {
      setError("Lỗi tạo ảnh. Vui lòng kiểm tra API Key và thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVeoGenerate = async () => {
    if (!veoImage) return;
    await ensureApiKey(); // Premium feature
    setIsGenerating(true);
    setError(null);
    setResultVideo(null);
    try {
      const result = await generateVeoVideo(veoImage, veoPrompt, veoRatio);
      setResultVideo(result);
    } catch (e) {
      setError("Lỗi tạo video. Có thể mất vài phút hoặc do API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <Sparkles className="text-blue-500" /> Studio Sáng Tạo AI
           </h2>
           <p className="text-gray-500 text-sm mt-1">Công cụ xử lý hình ảnh và video đa năng</p>
        </div>
        
        {/* Horizontal Scrollable Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar">
          {[
            { id: 'career', label: 'Nghề Nghiệp', icon: <Briefcase size={16} /> },
            { id: 'merge', label: 'Ghép Ảnh', icon: <Users size={16} /> },
            { id: 'edit', label: 'Chỉnh Sửa', icon: <Wand2 size={16} /> },
            { id: 'removeBg', label: 'Xóa Nền', icon: <Eraser size={16} /> },
            { id: 'genPro', label: 'Tạo Ảnh Pro', icon: <Crown size={16} /> },
            { id: 'veo', label: 'Tạo Video', icon: <Video size={16} /> },
          ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => resetState(tab.id)}
               className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm whitespace-nowrap border ${
                 activeTab === tab.id 
                   ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                   : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
               }`}
             >
               {tab.icon} {tab.label}
             </button>
          ))}
        </div>
      </div>

      {/* Controls Area */}
      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
          {/* LEFT: INPUTS */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-y-auto">
            
            {/* --- CAREER MODE --- */}
            {activeTab === 'career' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1. Chọn ảnh chân dung</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative h-48 flex flex-col justify-center items-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setCareerImage(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {careerImage ? (
                      <img src={URL.createObjectURL(careerImage)} alt="Preview" className="h-full object-contain rounded" />
                    ) : (
                      <>
                        <Upload className="text-gray-400 mb-2" size={32} />
                        <span className="text-gray-500 text-sm">Nhấn để tải ảnh lên</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">2. Chọn nghề nghiệp</label>
                  <select 
                    value={selectedCareer}
                    onChange={(e) => setSelectedCareer(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {CAREERS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <button
                  disabled={!careerImage || isGenerating}
                  onClick={handleCareerGenerate}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 mt-auto"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : <Briefcase />} 
                  {isGenerating ? 'Đang xử lý...' : 'Tạo Ảnh'}
                </button>
              </div>
            )}

            {/* --- MERGE MODE --- */}
            {activeTab === 'merge' && (
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">1. Ảnh người</label>
                    <input type="file" accept="image/*" onChange={(e) => setFaceImage(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">2. Ảnh bối cảnh</label>
                    <input type="file" accept="image/*" onChange={(e) => setBgImage(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/>
                 </div>
                 <button
                   disabled={!faceImage || !bgImage || isGenerating}
                   onClick={handleMergeGenerate}
                   className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 mt-4"
                 >
                   {isGenerating ? <Loader2 className="animate-spin" /> : <Users />} 
                   {isGenerating ? 'Đang xử lý...' : 'Ghép Ảnh'}
                 </button>
              </div>
            )}

            {/* --- EDIT MODE --- */}
            {activeTab === 'edit' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1. Ảnh cần sửa</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative h-48 flex flex-col justify-center items-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setEditSourceImage(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                     {editSourceImage ? (
                      <img src={URL.createObjectURL(editSourceImage)} alt="Preview" className="h-full object-contain rounded" />
                    ) : (
                      <div className="text-gray-400"><Upload className="mx-auto mb-2" />Tải ảnh gốc</div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">2. Yêu cầu chỉnh sửa</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_EDITS.map(prompt => (
                      <button 
                        key={prompt}
                        onClick={() => setEditPrompt(prompt)}
                        className="text-xs bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-full transition border border-gray-200"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  <textarea 
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder='Ví dụ: "Thêm hiệu ứng tuyết rơi", "Xóa người ở nền"...'
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none h-24 resize-none"
                  />
                </div>
                <button
                  disabled={!editSourceImage || !editPrompt || isGenerating}
                  onClick={handleEditGenerate}
                  className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 />} 
                  {isGenerating ? 'Đang xử lý...' : 'Chỉnh Sửa'}
                </button>
              </div>
            )}

             {/* --- REMOVE BG MODE --- */}
             {activeTab === 'removeBg' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh cần xóa nền</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative h-64 flex flex-col justify-center items-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setRemoveBgImage(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                     {removeBgImage ? (
                      <img src={URL.createObjectURL(removeBgImage)} alt="Preview" className="h-full object-contain rounded" />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <Upload className="mb-3" size={32} />
                        <span>Tải ảnh gốc</span>
                        <span className="text-xs mt-1 text-gray-300">Hỗ trợ JPG, PNG</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  disabled={!removeBgImage || isGenerating}
                  onClick={handleRemoveBgGenerate}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 mt-4"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : <Eraser />} 
                  {isGenerating ? 'Đang xử lý...' : 'Xóa Nền'}
                </button>
              </div>
            )}

            {/* --- GEN PRO MODE --- */}
            {activeTab === 'genPro' && (
              <div className="space-y-4">
                <div className="bg-amber-50 p-3 rounded-lg text-amber-800 text-xs mb-2 flex items-center gap-2 border border-amber-100">
                   <Crown size={14} className="flex-shrink-0" /> 
                   <span>Sử dụng <b>Gemini 3 Pro</b> (Yêu cầu API Key trả phí). Hỗ trợ độ phân giải cao 4K.</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả hình ảnh</label>
                  <textarea 
                    value={proPrompt}
                    onChange={(e) => setProPrompt(e.target.value)}
                    placeholder='Mô tả chi tiết hình ảnh bạn muốn tạo...'
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none h-32 resize-none"
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Độ phân giải</label>
                   <div className="flex gap-4">
                      {['1K', '2K', '4K'].map((size) => (
                        <label key={size} className={`flex-1 border rounded-lg p-3 text-center cursor-pointer transition ${proSize === size ? 'bg-amber-100 border-amber-500 font-bold text-amber-900' : 'hover:bg-gray-50'}`}>
                           <input type="radio" name="size" className="hidden" value={size} checked={proSize === size} onChange={() => setProSize(size as any)} />
                           {size}
                        </label>
                      ))}
                   </div>
                </div>
                <button
                  disabled={!proPrompt || isGenerating}
                  onClick={handleProGenerate}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 mt-4"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : <Crown />} 
                  {isGenerating ? 'Đang xử lý...' : 'Tạo Ảnh Pro'}
                </button>
              </div>
            )}

            {/* --- VEO MODE --- */}
            {activeTab === 'veo' && (
              <div className="space-y-4">
                <div className="bg-indigo-50 p-3 rounded-lg text-indigo-800 text-xs mb-2 flex items-center gap-2 border border-indigo-100">
                   <Video size={14} className="flex-shrink-0" /> 
                   <span>Sử dụng <b>Veo Video Generation</b> (Yêu cầu API Key trả phí).</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh gốc</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative h-40 flex flex-col justify-center items-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setVeoImage(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                     {veoImage ? (
                      <img src={URL.createObjectURL(veoImage)} alt="Preview" className="h-full object-contain rounded" />
                    ) : (
                      <div className="text-gray-400"><Upload className="mx-auto mb-2" />Tải ảnh để tạo video</div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chuyển động (Tùy chọn)</label>
                  <input 
                    type="text"
                    value={veoPrompt}
                    onChange={(e) => setVeoPrompt(e.target.value)}
                    placeholder='Ví dụ: Camera zoom in, nước chảy, mây trôi...'
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Tỉ lệ khung hình</label>
                   <div className="flex gap-4">
                      <label className={`flex-1 border rounded-lg p-3 text-center cursor-pointer ${veoRatio === '16:9' ? 'bg-indigo-100 border-indigo-500 font-bold text-indigo-900' : 'hover:bg-gray-50'}`}>
                         <input type="radio" name="ratio" className="hidden" checked={veoRatio === '16:9'} onChange={() => setVeoRatio('16:9')} />
                         Ngang (16:9)
                      </label>
                      <label className={`flex-1 border rounded-lg p-3 text-center cursor-pointer ${veoRatio === '9:16' ? 'bg-indigo-100 border-indigo-500 font-bold text-indigo-900' : 'hover:bg-gray-50'}`}>
                         <input type="radio" name="ratio" className="hidden" checked={veoRatio === '9:16'} onChange={() => setVeoRatio('9:16')} />
                         Dọc (9:16)
                      </label>
                   </div>
                </div>
                <button
                  disabled={!veoImage || isGenerating}
                  onClick={handleVeoGenerate}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 mt-2"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : <Clapperboard />} 
                  {isGenerating ? 'Đang tạo Video...' : 'Tạo Video'}
                </button>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100 animate-in fade-in slide-in-from-top-2">
                {error}
                { (activeTab === 'veo' || activeTab === 'genPro') && (
                    <div className="mt-2 text-xs text-red-500">
                       Nếu bạn gặp lỗi, hãy chắc chắn rằng bạn đã chọn một Project có liên kết tài khoản thanh toán.
                       <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline font-bold ml-1">Xem tài liệu</a>
                    </div>
                )}
              </div>
            )}
          </div>
          
          {/* RIGHT: RESULT DISPLAY */}
          <div className="lg:col-span-8 bg-gray-900 rounded-2xl p-4 h-full flex items-center justify-center border border-gray-800 shadow-inner relative overflow-hidden">
             {/* Background Grid Pattern */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             {isGenerating ? (
               <div className="text-center text-gray-300 relative z-10">
                 <Loader2 size={48} className="animate-spin mx-auto mb-4 text-blue-500" />
                 <p className="font-medium animate-pulse text-lg text-white">Đang thực hiện phép màu AI...</p>
                 <p className="text-xs mt-2 text-gray-400">Vui lòng đợi trong giây lát</p>
                 {activeTab === 'veo' && (
                    <div className="mt-6 p-4 bg-indigo-900/50 text-indigo-200 text-sm rounded-lg border border-indigo-700/50 max-w-sm mx-auto backdrop-blur-sm">
                       <p className="font-bold mb-2 flex items-center justify-center gap-2"><Video size={14}/> Veo Video Generation</p>
                       <p className="mb-2">Quá trình này có thể mất từ 1-2 phút.</p>
                       <p className="text-xs opacity-70">Chúng tôi đang render từng khung hình cho bạn. Đừng đóng tab nhé!</p>
                    </div>
                 )}
               </div>
             ) : (
               <>
                 {resultImage && (
                   <div className="relative group w-full h-full flex items-center justify-center z-10 p-4">
                      <img src={resultImage} alt="AI Result" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                      <div className="absolute bottom-6 flex gap-2">
                        <a 
                          href={resultImage} 
                          download={`ai-generated-${Date.now()}.png`}
                          className="bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 font-bold text-sm hover:bg-blue-50 flex items-center gap-2"
                        >
                          <Upload className="rotate-180" size={16} /> Tải ảnh về
                        </a>
                      </div>
                   </div>
                 )}

                 {resultVideo && (
                   <div className="w-full h-full flex flex-col items-center justify-center z-10 p-4">
                      <video controls src={resultVideo} className="w-full h-full rounded-lg shadow-2xl bg-black object-contain" autoPlay loop />
                      <a href={resultVideo} download="veo-video.mp4" className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg border border-indigo-500">
                         <Upload className="rotate-180" size={18} /> Tải video về máy
                      </a>
                   </div>
                 )}

                 {!resultImage && !resultVideo && (
                   <div className="text-gray-600 text-center relative z-10">
                     {activeTab === 'veo' ? <Video size={80} className="mx-auto mb-4 opacity-20" /> : <ImageIcon size={80} className="mx-auto mb-4 opacity-20" />}
                     <p className="text-xl font-medium opacity-50">Khu vực hiển thị kết quả</p>
                     <p className="text-sm opacity-30 mt-2">Chọn tính năng bên trái và nhấn Tạo</p>
                   </div>
                 )}
               </>
             )}
          </div>
      </div>
    </div>
  );
};

export default ImageStudio;