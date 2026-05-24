import { useState, useRef, useCallback } from 'react';
import './ColouringIn.css';

const COLORS = [
  '#c41230', '#1a2db0', '#e8b84b', '#4ecb71',
  '#f97316', '#8b5cf6', '#06b6d4', '#ec4899',
  '#a3e635', '#fb923c', '#14b8a6', '#f472b6',
  '#000000', '#6b7280', '#92400e', '#ffffff',
];

// Add your colouring images to public/colouring/ and list them here
const PRESET_PAGES = [
  { name: 'Page 1', file: 'page1.png' },
  { name: 'Page 2', file: 'page2.png' },
  { name: 'Page 3', file: 'page3.png' },
  { name: 'Page 4', file: 'page4.png' },
  { name: 'Page 5', file: 'page5.png' },
  { name: 'Page 6', file: 'page6.png' },
];

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function floodFill(ctx, sx, sy, fillHex, tolerance) {
  const canvas = ctx.canvas;
  const { width, height } = canvas;

  if (sx < 0 || sx >= width || sy < 0 || sy >= height) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const base = (sy * width + sx) * 4;
  const tR = data[base], tG = data[base + 1], tB = data[base + 2];

  const [fR, fG, fB] = hexToRgb(fillHex);

  // Skip if already this colour
  if (Math.abs(tR - fR) + Math.abs(tG - fG) + Math.abs(tB - fB) < 15) return;

  const totalPixels = width * height;
  const visited = new Uint8Array(totalPixels);
  const queue = new Int32Array(totalPixels);
  let head = 0, tail = 0;

  const startPix = sy * width + sx;
  queue[tail++] = startPix;
  visited[startPix] = 1;

  while (head < tail) {
    const pix = queue[head++];
    const x = pix % width;
    const y = (pix - x) / width;
    const i = pix * 4;

    const dist = Math.abs(data[i] - tR) + Math.abs(data[i + 1] - tG) + Math.abs(data[i + 2] - tB);
    if (dist > tolerance) continue;

    data[i] = fR;
    data[i + 1] = fG;
    data[i + 2] = fB;
    data[i + 3] = 255;

    if (x > 0 && !visited[pix - 1]) { visited[pix - 1] = 1; queue[tail++] = pix - 1; }
    if (x < width - 1 && !visited[pix + 1]) { visited[pix + 1] = 1; queue[tail++] = pix + 1; }
    if (y > 0 && !visited[pix - width]) { visited[pix - width] = 1; queue[tail++] = pix - width; }
    if (y < height - 1 && !visited[pix + width]) { visited[pix + width] = 1; queue[tail++] = pix + width; }
  }

  ctx.putImageData(imageData, 0, 0);
}

export default function ColouringIn({ onBack }) {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('#c41230');
  const [tolerance, setTolerance] = useState(40);
  const [history, setHistory] = useState([]);
  const [currentSrc, setCurrentSrc] = useState(null);
  const [currentName, setCurrentName] = useState('');
  const [failedPresets, setFailedPresets] = useState(new Set());

  const loadImageToCanvas = useCallback((src, name) => {
    setIsLoading(true);
    setImageLoaded(false);
    setHistory([]);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      const maxW = container ? container.clientWidth - 32 : 600;
      const maxH = window.innerHeight * 0.58;
      const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);

      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setImageLoaded(true);
      setIsLoading(false);
      setCurrentSrc(src);
      setCurrentName(name);
    };
    img.onerror = () => setIsLoading(false);
    img.src = src;
  }, []);

  function getCanvasXY(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return [
      Math.floor((clientX - rect.left) * scaleX),
      Math.floor((clientY - rect.top) * scaleY),
    ];
  }

  function handleCanvasInteract(e) {
    if (!imageLoaded) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const [x, y] = getCanvasXY(e);

    // Save undo state (keep last 5)
    const prevData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-4), prevData]);

    floodFill(ctx, x, y, color, tolerance);
  }

  function handleUndo() {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.putImageData(history[history.length - 1], 0, 0);
    setHistory(prev => prev.slice(0, -1));
  }

  function handleReset() {
    if (currentSrc) loadImageToCanvas(currentSrc, currentName);
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `dharawal-colouring-${currentName || 'page'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    loadImageToCanvas(url, file.name.replace(/\.[^.]+$/, ''));
  }

  function handlePresetClick(preset) {
    loadImageToCanvas(`/colouring/${preset.file}`, preset.name);
  }

  function handlePresetError(file) {
    setFailedPresets(prev => new Set([...prev, file]));
  }

  const availablePresets = PRESET_PAGES.filter(p => !failedPresets.has(p.file));

  return (
    <div className="colour">
      <div className="colour__header">
        <button className="colour__back" onClick={onBack}>‹</button>
        <div>
          <h2 className="colour__title">Colouring In</h2>
          <p className="colour__sub">
            {imageLoaded ? currentName : 'Choose a page to colour'}
          </p>
        </div>
        {imageLoaded && (
          <div className="colour__header-btns">
            <button className="colour__icon-btn" onClick={handleUndo} disabled={history.length === 0} title="Undo">↩</button>
            <button className="colour__icon-btn" onClick={handleReset} title="Reset">↺</button>
            <button className="colour__icon-btn colour__icon-btn--dl" onClick={handleDownload} title="Download">Save</button>
          </div>
        )}
      </div>

      {/* Canvas area */}
      <div className="colour__canvas-wrap">
        {isLoading && (
          <div className="colour__loading">
            <div className="colour__spinner" />
            <p>Loading image...</p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="colour__canvas"
          style={{ display: imageLoaded ? 'block' : 'none', cursor: 'crosshair' }}
          onClick={handleCanvasInteract}
          onTouchEnd={handleCanvasInteract}
        />
        {!imageLoaded && !isLoading && (
          <div className="colour__empty">
            <p>Select a colouring page below</p>
          </div>
        )}
      </div>

      {/* Palette and controls */}
      <div className="colour__controls">
        {/* Color palette */}
        <div className="colour__palette">
          {COLORS.map(c => (
            <button
              key={c}
              className={`colour__swatch ${c === color ? 'colour__swatch--active' : ''}`}
              style={{
                background: c,
                boxShadow: c === '#ffffff' ? 'inset 0 0 0 1px #ccc' : undefined,
              }}
              onClick={() => setColor(c)}
              title={c}
            />
          ))}
          <input
            type="color"
            className="colour__custom"
            value={color}
            onChange={e => setColor(e.target.value)}
            title="Custom colour"
          />
        </div>

        {/* Tolerance */}
        <div className="colour__tolerance">
          <label className="colour__tol-label">
            Fill sensitivity: <strong>{tolerance}</strong>
          </label>
          <input
            type="range"
            min={10}
            max={100}
            value={tolerance}
            onChange={e => setTolerance(Number(e.target.value))}
            className="colour__tol-slider"
          />
          <div className="colour__tol-hints">
            <span>Precise</span><span>Broad</span>
          </div>
        </div>

        {/* Image selection */}
        <div className="colour__image-row">
          {/* Upload button */}
          <button className="colour__upload-btn" onClick={() => fileInputRef.current?.click()}>
            Load image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />

          {/* Preset pages */}
          {availablePresets.map(preset => (
            <button
              key={preset.file}
              className={`colour__preset-btn ${currentName === preset.name ? 'colour__preset-btn--active' : ''}`}
              onClick={() => handlePresetClick(preset)}
            >
              <PresetThumb
                src={`/colouring/${preset.file}`}
                onError={() => handlePresetError(preset.file)}
              />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PresetThumb({ src, onError }) {
  return (
    <img
      src={src}
      alt=""
      className="colour__preset-thumb"
      onError={onError}
    />
  );
}
