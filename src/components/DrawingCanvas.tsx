import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Eraser, RotateCcw, RotateCw, Trash2, Pencil } from 'lucide-react';
import { playClick } from '../utils/audio';

interface DrawingCanvasProps {
  initialDataUrl: string | null;
  onCanvasSave: (dataUrl: string) => void;
  className?: string;
}

const PALETTE = [
  { name: 'Black', hex: '#1E293B' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Cyan', hex: '#06B6D4' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Lime', hex: '#84CC16' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Purple', hex: '#9333EA' },
  { name: 'Brown', hex: '#92400E' },
  { name: 'White', hex: '#FFFFFF' },
];

const STROKE_SIZES = [
  { label: 'S', size: 6, dotSize: 'w-2 h-2' },
  { label: 'M', size: 12, dotSize: 'w-3.5 h-3.5' },
  { label: 'L', size: 22, dotSize: 'w-5 h-5' },
];

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  initialDataUrl,
  onCanvasSave,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentColor, setCurrentColor] = useState<string>('#1E293B');
  const [strokeWidth, setStrokeWidth] = useState<number>(12);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Undo/redo history
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Keep a stable ref for onCanvasSave to avoid re-triggering effects and callbacks
  const onCanvasSaveRef = useRef(onCanvasSave);
  useEffect(() => {
    onCanvasSaveRef.current = onCanvasSave;
  });

  // Save current canvas state to history and parent
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    
    setHistory(prev => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, dataUrl];
    });
    setHistoryIndex(prev => prev + 1);
    onCanvasSaveRef.current(dataUrl);
  }, [historyIndex]);

  // Initialize canvas size and background
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(Math.floor(rect.width) || 750, 320);
    const height = Math.max(Math.floor(rect.height) || 460, 320);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw crisp off-white monster drawing paper
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Subtle soft grid dots to aid kid drawing
        ctx.fillStyle = '#F1F5F9';
        const gap = 32;
        for (let x = gap; x < width; x += gap) {
          for (let y = gap; y < height; y += gap) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (initialDataUrl) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            const initialSave = canvas.toDataURL('image/png');
            setHistory([initialSave]);
            setHistoryIndex(0);
            onCanvasSave(initialSave);
          };
          img.src = initialDataUrl;
        } else {
          const initialSave = canvas.toDataURL('image/png');
          setHistory([initialSave]);
          setHistoryIndex(0);
          onCanvasSave(initialSave);
        }
      }
    }

    return () => {
      if (canvasRef.current) {
        try {
          const finalUrl = canvasRef.current.toDataURL('image/png');
          onCanvasSaveRef.current(finalUrl);
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Pointer event coordinates relative to canvas
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = isEraser ? strokeWidth * 2.2 : strokeWidth;
    ctx.strokeStyle = isEraser ? '#FFFFFF' : currentColor;

    // Draw dot for single tap
    ctx.arc(x, y, (isEraser ? strokeWidth * 2.2 : strokeWidth) / 4, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? '#FFFFFF' : currentColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    setIsDrawing(false);
    saveState();
  };

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    playClick();
    const newIdx = historyIndex - 1;
    const targetDataUrl = history[newIdx];
    const canvas = canvasRef.current;
    if (!canvas || !targetDataUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistoryIndex(newIdx);
      onCanvasSave(targetDataUrl);
    };
    img.src = targetDataUrl;
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    playClick();
    const newIdx = historyIndex + 1;
    const targetDataUrl = history[newIdx];
    const canvas = canvasRef.current;
    if (!canvas || !targetDataUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistoryIndex(newIdx);
      onCanvasSave(targetDataUrl);
    };
    img.src = targetDataUrl;
  };

  const handleClearAll = () => {
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle dots
    ctx.fillStyle = '#F1F5F9';
    const gap = 32;
    for (let x = gap; x < canvas.width; x += gap) {
      for (let y = gap; y < canvas.height; y += gap) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    saveState();
  };

  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      {/* Canvas Box */}
      <div 
        ref={containerRef} 
        className="relative flex-1 w-full bg-white rounded-2xl shadow-inner border-4 border-amber-200 overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          style={{ touchAction: 'none' }}
          className="w-full h-full cursor-crosshair block"
        />

        {/* Quick action buttons on canvas top-right */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-2 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-all"
            title="Undo"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-all"
            title="Redo"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <div className="w-px h-5 bg-slate-200" />
          <button
            type="button"
            onClick={handleClearAll}
            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            title="Clear all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tool & Palette Bar (Below Canvas) */}
      <div className="mt-3 bg-white px-4 py-2.5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4 flex-wrap">
        {/* Tool Mode: Pen / Eraser */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsEraser(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
              !isEraser
                ? 'bg-amber-400 text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pencil className="w-4 h-4" />
            <span>펜 (Pen)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsEraser(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
              isEraser
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eraser className="w-4 h-4" />
            <span>지우개 (Eraser)</span>
          </button>
        </div>

        {/* Brush Size Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {STROKE_SIZES.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                playClick();
                setStrokeWidth(item.size);
              }}
              className={`w-9 h-8 flex items-center justify-center rounded-lg font-bold text-xs transition-all ${
                strokeWidth === item.size
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div
                className={`${item.dotSize} rounded-full bg-current`}
              />
            </button>
          ))}
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {PALETTE.map(c => {
            const isSelected = !isEraser && currentColor === c.hex;
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => {
                  playClick();
                  setCurrentColor(c.hex);
                  setIsEraser(false);
                }}
                className={`w-7 h-7 rounded-full transition-transform border-2 ${
                  isSelected
                    ? 'scale-125 border-slate-900 ring-2 ring-amber-400 z-10'
                    : 'border-slate-300 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
