'use client';

import { useRef, useState, type ComponentPropsWithoutRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

/**
 * props for {@link ImageCropper}
 */
type Props = ComponentPropsWithoutRef<'img'> & {
  /** aspect */
  aspect: ComponentPropsWithoutRef<typeof ReactCrop>['aspect'];
  /** crop event handler */
  onCrop?: (dataURL: string) => void;
};

/**
 * image cropper
 */
export const ImageCropper = ({
  aspect,
  onCrop,
  alt,
  ...props
}: Props): JSX.Element => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();

  const handleCrop = (c: Crop): void => {
    setCrop(c);

    const image = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!image || !ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = c.width * pixelRatio;
    canvas.height = c.height * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);
    ctx.drawImage(
      image,
      c.x * scaleX,
      c.y * scaleY,
      c.width * scaleX,
      c.height * scaleY,
      0,
      0,
      c.width,
      c.height,
    );

    const base64Image = canvas.toDataURL('image/png', 1);
    if (base64Image === 'data:,') return;
    onCrop?.(base64Image);
  };

  return (
    <ReactCrop crop={crop} aspect={aspect} onChange={handleCrop}>
      <img {...props} alt={alt} ref={imageRef} />
    </ReactCrop>
  );
};
