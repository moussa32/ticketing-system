"use client"
import React from 'react'
import { Download, File, FileText, Image, Music, Archive } from 'lucide-react'

export default function ReplyAttachments({ attachments }) {
  if (!attachments) {
    return null
  }
  
  let files = [];
  try {
    if (typeof attachments === 'string') {
      // Try to parse as JSON
      try {
        files = JSON.parse(attachments);
      } catch (e) {
        // If it's not valid JSON, treat it as a single URL string
        if (attachments.trim()) {
          files = [attachments];
        }
      }
    } else if (Array.isArray(attachments)) {
      files = attachments;
    } else if (typeof attachments === 'object' && attachments !== null) {
      files = [attachments];
    }
  } catch (e) {
    console.error('Error parsing attachments:', e);
    return null;
  }

  // Filter out empty values
  files = files.filter(f => f && (typeof f === 'string' ? f.trim() : f.name || f.url || f.path));

  if (!Array.isArray(files) || files.length === 0) {
    return null;
  }

  const getFileIcon = (fileName) => {
    const name = typeof fileName === 'string' ? fileName : (fileName?.name || '');
    const ext = name.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return <Image className="w-4 h-4" />;
    }
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) {
      return <Music className="w-4 h-4" />;
    }
    if (['pdf', 'doc', 'docx', 'txt', 'xlsx'].includes(ext)) {
      return <FileText className="w-4 h-4" />;
    }
    if (['zip', 'rar', '7z', 'tar'].includes(ext)) {
      return <Archive className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  const getFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleDownload = (fileUrl, fileName) => {
    // Construct full URL if it's a relative path
    let fullUrl = fileUrl;
    if (fileUrl && !fileUrl.startsWith('http')) {
      fullUrl = window.location.origin + fileUrl;
    }

    const link = document.createElement('a');
    link.href = fullUrl;
    link.download = fileName || 'download';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-3 pt-3 border-t border-gray-300">
      <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Attachments ({files.length})</p>
      <div className="space-y-2">
        {files.map((file, index) => {
          // Handle both string URLs and object formats
          const fileUrl = typeof file === 'string' ? file : (file?.url || file?.path || '');
          let fileName = typeof file === 'string' 
            ? file.split('/').pop() || `File ${index + 1}`
            : (file?.name || file?.originalName || `File ${index + 1}`);
          
          const fileSize = typeof file === 'object' ? file?.size : undefined;
          
          if (!fileUrl) return null;

          return (
            <div
              key={index}
              className="flex items-center justify-between bg-blue-50 rounded p-2 hover:bg-blue-100 transition"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="text-blue-600 flex-shrink-0">
                  {getFileIcon(fileName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {fileName}
                  </p>
                  {fileSize && (
                    <p className="text-xs text-gray-500">
                      {getFileSize(fileSize)}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDownload(fileUrl, fileName)}
                className="ml-2 p-1 text-blue-600 hover:bg-blue-200 rounded transition flex-shrink-0"
                title={`Download ${fileName}`}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
