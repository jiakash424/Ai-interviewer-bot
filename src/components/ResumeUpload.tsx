'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ResumeUploadProps {
  onResumeText: (text: string) => void;
  resumeText: string;
}

export function ResumeUpload({ onResumeText, resumeText }: ResumeUploadProps) {
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setFileName(file.name);

    try {
      const text = await file.text();
      onResumeText(text);
    } catch {
      // If text extraction fails, just use filename
      onResumeText(`Resume uploaded: ${file.name}`);
    } finally {
      setIsProcessing(false);
    }
  }, [onResumeText]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    maxFiles: 1,
  });

  const clearResume = () => {
    onResumeText('');
    setFileName('');
  };

  if (resumeText) {
    return (
      <div className="glass-light rounded-xl p-3 flex items-center gap-3">
        <FileText className="w-5 h-5 text-green-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium truncate">{fileName || 'Resume uploaded'}</p>
          <p className="text-xs text-slate-400">{resumeText.length} characters</p>
        </div>
        <button onClick={clearResume} className="text-slate-400 hover:text-red-400 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const rootProps = getRootProps();

  return (
    <div className="space-y-2">
      <motion.div
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/30'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={rootProps.onClick}
        onKeyDown={rootProps.onKeyDown}
        onFocus={rootProps.onFocus}
        onBlur={rootProps.onBlur}
        onDragEnter={rootProps.onDragEnter}
        onDragOver={rootProps.onDragOver}
        onDragLeave={rootProps.onDragLeave}
        onDrop={rootProps.onDrop}
        role={rootProps.role}
        tabIndex={rootProps.tabIndex}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-sm text-slate-400">Processing...</span>
          </div>
        ) : (
          <>
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-400">
              {isDragActive ? 'Drop resume here' : 'Drop resume (.txt, .md) or click'}
            </p>
          </>
        )}
      </motion.div>

      {/* Manual text input */}
      <div className="relative">
        <textarea
          placeholder="Or paste resume text here..."
          className="w-full h-20 bg-slate-800/30 border border-slate-600/50 rounded-xl p-3 text-xs text-slate-300 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500/50 transition-colors"
          onChange={(e) => {
            onResumeText(e.target.value);
            setFileName('Pasted text');
          }}
        />
      </div>
    </div>
  );
}
