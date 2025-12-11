
import React, { useState } from 'react';
import { FileInput, Download, Loader2, FileType, CheckCircle } from 'lucide-react';
import { convertDocumentToHtml } from '../services/geminiService';

const DocConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedHtml, setConvertedHtml] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setConvertedHtml(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setConvertedHtml(null);
    try {
      const html = await convertDocumentToHtml(file);
      setConvertedHtml(html);
    } catch (e) {
      alert("Lỗi khi chuyển đổi file. Vui lòng thử lại.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedHtml) return;

    // Construct valid HTML for Word
    const fullHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Document Converted</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.5; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 10px; }
          td, th { border: 1px solid black; padding: 5px; }
          .title { text-align: center; font-weight: bold; font-size: 16pt; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        ${convertedHtml}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', fullHtml], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Converted_${file?.name.split('.')[0] || 'Document'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FileType className="text-orange-600" /> Chuyển Ảnh/PDF sang Word
        </h2>
        <p className="text-gray-500 mt-2">Giữ nguyên định dạng bảng biểu, phông chữ và cấu trúc văn bản</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition relative">
            <input 
              type="file" 
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <FileType size={48} className="text-gray-400" />
              <span className="font-medium text-gray-700">
                {file ? file.name : "Tải lên tệp ảnh hoặc PDF"}
              </span>
              <span className="text-xs text-gray-400">Hỗ trợ JPG, PNG, PDF</span>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!file || isConverting}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all"
          >
            {isConverting ? <Loader2 className="animate-spin" /> : <FileType />}
            {isConverting ? 'Đang chuyển đổi...' : 'Chuyển sang Word'}
          </button>
          
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
            <strong>Lưu ý:</strong> Công cụ sử dụng AI để nhận diện cấu trúc. Kết quả tốt nhất với các tài liệu scan rõ nét, có bảng biểu rõ ràng.
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
             <h3 className="font-bold text-gray-700 flex items-center gap-2">
               <CheckCircle size={18} className="text-green-500" /> Xem trước kết quả
             </h3>
             {convertedHtml && (
               <button 
                 onClick={handleDownload}
                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
               >
                 <Download size={16} /> Tải về .doc
               </button>
             )}
          </div>

          <div className="flex-grow bg-gray-50 rounded border p-4 overflow-auto max-h-[500px]">
            {isConverting ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Loader2 size={48} className="animate-spin text-orange-500 mb-4" />
                  <p>AI đang phân tích cấu trúc bảng và văn bản...</p>
               </div>
            ) : convertedHtml ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: convertedHtml }} 
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                 <FileType size={64} className="mb-4" />
                 <p>Nội dung chuyển đổi sẽ hiện ở đây</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocConverter;
