"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ScrambleImageProps = {
  src: string;
  width: number; // intrinsic image width (px)
  height: number; // intrinsic image height (px)
  progress: number; // 0..1
  cropTop?: number; // pixels to crop from the top visually (applied as draw offset)
  resolveAt?: number; // portion of scroll (0..1) by which the image should be fully resolved (default 0.3)
  className?: string;
  style?: React.CSSProperties;
};

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ScrambleImage({
  src,
  width,
  height,
  progress,
  cropTop = 0,
  resolveAt = 0.3,
  className,
  style,
}: ScrambleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

  // Setup a fixed grid for tiles. More tiles = finer scramble but more work.
  const cols = 24;
  const rows = Math.round((cols * (height / width)) || 24);
  const total = cols * rows;

  // Precompute a random permutation for starting positions
  const permutation = useMemo(() => {
    const arr = Array.from({ length: total }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [total]);

  // Load the image once
  useEffect(() => {
    const im = new Image();
    im.src = src;
    const maybeDecode = (im as HTMLImageElement & { decode?: () => Promise<void> }).decode;
    if (typeof maybeDecode === "function") {
      maybeDecode
        .call(im)
        .then(() => setImgEl(im))
        .catch(() => {
          // Fallback to onload if decode fails
          im.onload = () => setImgEl(im);
        });
    } else {
      im.onload = () => setImgEl(im);
    }
  }, [src]);

  // Draw when progress or image changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // Size the canvas to the displayed CSS size (we'll let CSS control layout width)
    // We'll set the internal buffer to DPR for crispness
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, rect.width);
    const cssH = Math.max(1, rect.height);
    const scaleToFit = cssW / width; // maintain aspect ratio to fit width
    const targetH = (height * scaleToFit) - cropTop * scaleToFit;

    // If height changed due to responsive layout, adjust canvas element size
    const bufW = Math.max(1, Math.floor(cssW * dpr));
    const bufH = Math.max(1, Math.floor(Math.max(cssH, targetH) * dpr));
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scale drawing for DPR and responsive width
    ctx.scale(dpr * scaleToFit, dpr * scaleToFit);

    // We draw tiles from the source image to the destination at interpolated positions
    const tileW = width / cols;
    const tileH = height / rows;

    // Progress with easing and clamp, resolve fully by `resolveAt` (e.g., first 30% of scroll)
    const p = Math.min(1, Math.max(0, progress));
    const end = Math.min(1, Math.max(0.01, resolveAt));
    const local = Math.min(1, p / end);
    const t = easeInOutCubic(local);

    // As we approach resolved state, shrink jitter radius
    const jitterMax = (1 - t) * tileW * 0.5; // pixels

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c; // destination tile index
        const srcIdx = permutation[idx]; // starting tile index

        // Target (final) tile top-left
        const tx = c * tileW;
        const ty = r * tileH;

        // Start (scrambled) tile top-left from random permuted tile
        const sc = srcIdx % cols;
        const sr = Math.floor(srcIdx / cols);
        const sx0 = sc * tileW;
        const sy0 = sr * tileH;

        // Interpolate position
        const ix = sx0 + (tx - sx0) * t;
        const iy = sy0 + (ty - sy0) * t;

        // Add a little jitter that decays to 0 near the end
        const jx = (Math.random() - 0.5) * 2 * jitterMax;
        const jy = (Math.random() - 0.5) * 2 * jitterMax;

        // Source crop (from the target tile location)
        const sX = tx;
        const sY = ty;

        // Destination where we draw this tile (shift up by cropTop)
        const dX = ix;
        const dY = iy - cropTop;

        // Draw tile
        ctx.drawImage(
          imgEl,
          sX, // sx
          sY, // sy
          tileW, // sWidth
          tileH, // sHeight
          dX + jx, // dx
          dY + jy, // dy
          tileW, // dWidth
          tileH // dHeight
        );
      }
    }
  }, [imgEl, width, height, cropTop, cols, rows, permutation, progress, resolveAt]);

  const arH = Math.max(1, height - cropTop);
  const mergedStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    // Ensure the canvas has intrinsic height in layout to avoid 0px collapse
    aspectRatio: `${width} / ${arH}`,
    display: "block",
    ...style,
  };

  return (
    <canvas ref={canvasRef} className={className} style={mergedStyle} aria-hidden />
  );
}
