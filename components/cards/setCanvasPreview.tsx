const setCanvasPreview = (
  image: HTMLImageElement, // HTMLImageElement
  canvas: HTMLCanvasElement, // HTMLCanvasElement
  crop: { x: number; y: number; width: number; height: number } // PixelCrop
): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2D context");
  }

  // devicePixelRatio slightly increases sharpness on retina devices
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Set the canvas width and height based on the crop dimensions
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

export default setCanvasPreview;
