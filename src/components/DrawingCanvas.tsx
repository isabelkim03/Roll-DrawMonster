import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Eraser, RotateCcw, RotateCw, Trash2, Pencil } from 'lucide-react';
import { playClick } from '../utils/audio';

interface DrawingCanvasProps {
  initialDataUrl: string | null;
  onCanvasSave: (dataUrl: string) => void;
  className?: string;
}

const PALETTE = [
  { name: 'Charcoal Black', hex: '#1E293B' },
  { name: 'Kawaii Pink', hex: '#F472B6' },
  { name: 'Pastel Baby Pink', hex: '#FBCFE8' },
  { name: 'Lilac Lavender', hex: '#C084FC' },
  { name: 'Baby Sky Blue', hex: '#38BDF8' },
  { name: 'Pastel Mint', hex: '#34D399' },
  { name: 'Buttercup Yellow', hex: '#FDE047' },
  { name: 'Sweet Peach', hex: '#FB923C' },
  { name: 'Cherry Rose', hex: '#F43F5E' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Teddy Brown', hex: '#92400E' },
  { name: 'Marshmallow White', hex: '#FFFFFF' },
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

  const onCanvasSaveRef = useRef(onCanvasSave);
  useEffect(() => {
    onCanvasSaveRef.current = onCanvasSave;
  });

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');

    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, dataUrl];
    });
    setHistoryIndex((prev) => prev + 1);
    onCanvasSaveRef.current(dataUrl);
  }, [historyIndex]);

  const CANVAS_WIDTH = 900;
  const CANVAS_HEIGHT = 675; // 4:3 high-res ratio

  // Canvas initialization with internal coordinate resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (initialDataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const currentUrl = canvas.toDataURL('image/png');
        setHistory([currentUrl]);
        setHistoryIndex(0);
      };
      img.src = initialDataUrl;
    } else {
      const currentUrl = canvas.toDataURL('image/png');
      setHistory([currentUrl]);
      setHistoryIndex(0);
    }
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>;
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = isEraser ? strokeWidth * 2.5 : strokeWidth;
    ctx.strokeStyle = isEraser ? '#FFFFFF' : currentColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    playClick();
    const newIndex = historyIndex - 1;
    restoreFromHistory(newIndex);
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    playClick();
    const newIndex = historyIndex + 1;
    restoreFromHistory(newIndex);
  };

  const restoreFromHistory = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetUrl = history[index];
    if (!targetUrl) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistoryIndex(index);
      onCanvasSaveRef.current(targetUrl);
    };
    img.src = targetUrl;
  };

  const handleClear = () => {
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  return (
    <div className={`flex flex-col h-full w-full min-h-0 ${className}`}>
      {/* Canvas Area with touch-none */}
      <div
        ref={containerRef}
        className="flex-1 w-full min-h-[180px] sm:min-h-[320px] bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-pink-300 shadow-inner relative overflow-hidden cursor-crosshair touch-none flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block object-contain"
        />
      </div>

      {/* Drawing Toolbar: Pen / Eraser / Brush size / Undo / Redo / Clear / Color palette */}
      <div className="mt-2 bg-white/95 backdrop-blur-md p-1.5 sm:p-2.5 rounded-2xl border-2 border-pink-200 shadow-xs flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 shrink-0">
        {/* Tool Selector & History Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsEraser(false);
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-black transition-all ${
              !isEraser
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-pink-50'
            }`}
          >
            <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>펜</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsEraser(true);
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-black transition-all ${
              isEraser
                ? 'bg-purple-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-pink-50'
            }`}
          >
            <Eraser className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>지우개</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          {/* Undo / Redo */}
          <button
            type="button"
            disabled={historyIndex <= 0}
            onClick={handleUndo}
            className="p-1 sm:p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 active:scale-95"
            title="실행 취소 (Undo)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={historyIndex >= history.length - 1}
            onClick={handleRedo}
            className="p-1 sm:p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 active:scale-95"
            title="다시 실행 (Redo)"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="p-1 sm:p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 active:scale-95"
            title="전체 지우기 (Clear)"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Brush Size Selector */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 p-0.5 rounded-xl">
          {STROKE_SIZES.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                playClick();
                setStrokeWidth(item.size);
              }}
              className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg font-bold text-xs transition-all ${
                strokeWidth === item.size
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`${item.dotSize} rounded-full bg-current`} />
            </button>
          ))}
        </div>

        {/* Color Palette (horizontally scrollable if screen is narrow) */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full py-0.5 no-scrollbar">
          {PALETTE.map((c) => {
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
                className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full shrink-0 transition-transform border-2 ${
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
