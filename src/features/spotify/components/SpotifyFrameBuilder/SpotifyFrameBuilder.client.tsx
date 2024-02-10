'use client';

import classNames from 'classnames';
import { type Stage } from 'konva/lib/Stage';
import {
  useRef,
  useState,
  type ChangeEventHandler,
  type DragEventHandler,
  type MouseEventHandler,
} from 'react';
import { FaCameraRetro, FaImage, FaX, FaArrowRightLong } from 'react-icons/fa6';
import { DnDFileInput } from '~/components/DnDFileInput';
import { Fieldset } from '~/components/Fieldset';
import { ImageCropper } from '~/components/ImageCropper';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { RangeInput } from '~/components/RangeInput';
import { SwitchInput } from '~/components/SwitchInput';
import { KonvaProvider } from '~/features/konva';
import { useMounted } from '~/hooks/useMounted';
import { downloadURI } from '~/utils/download';
import { SpotifyFrame } from '../SpotifyFrame';
import styles from './SpotifyFrameBuilder.module.css';

/**
 * spotify frame builder
 */
export const SpotifyFrameBuilder = (): JSX.Element => {
  const now = new Date();
  const defaultDate = `${String(now.getMonth() + 1).padStart(2, '0')}.${String(
    now.getDate(),
  ).padStart(2, '0')}.${now.getFullYear()}`;
  const stageRef = useRef<Stage>(null);
  const [showTutorail, setShowTutorial] = useState(true);
  const [src, setSrc] = useState('');
  const [dataURL, setCroppedDataURL] = useState('');
  const [darkTheme, setDarkTheme] = useState(true);
  const [showCover, setShowCover] = useState(true);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.8);
  const [backgroundBlur, setBackgroundBlur] = useState(10);
  const [title, setTitle] = useState("WE'RE GETTING MARRIED!");
  const [artist, setArtist] = useState('JOHN and JANE');
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(33);
  const [nowAt, setNowAt] = useState(defaultDate);
  const [duration, setDuration] = useState('@HILLSIDE CLUB');
  const [canvasFilterSupported, setCanvasFilterSupported] = useState(true);

  useMounted(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setCanvasFilterSupported('filter' in ctx);
  });

  useMounted(() => {
    const timer = setTimeout(() => {
      setShowTutorial(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  });

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    URL.revokeObjectURL(src);
    const file = e.target.files?.[0];
    if (!file) return;
    setSrc(URL.createObjectURL(file));
  };
  const handleFileDrop: DragEventHandler<HTMLButtonElement> = (e) => {
    URL.revokeObjectURL(src);
    const file = e.dataTransfer.files[0];
    setSrc(URL.createObjectURL(file));
  };
  const handleClearFileButtonClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    URL.revokeObjectURL(src);
    setSrc('');
    setCroppedDataURL('');
  };
  const handleBackgroundOpacityChange: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setBackgroundOpacity(+e.target.value);
  };
  const handleBackgroundBlur: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBackgroundBlur(+e.target.value);
  };
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };
  const handleArtistChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setArtist(e.target.value);
  };
  const handleProgressChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setProgress(+e.target.value);
  };
  const handleNowAtChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNowAt(e.target.value);
  };
  const handleDurationChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDuration(e.target.value);
  };
  const handleDownload = async (): Promise<void> => {
    const canvasElements = stageRef.current?.content.querySelectorAll('canvas');
    if (canvasElements?.length !== 2) throw new Error('Dowload failed');
    const bgCanvas = canvasElements[0];
    const canvas = canvasElements[1];

    const aspectRatio = canvas.height / canvas.width;
    const witdh = 1000;
    const height = witdh * aspectRatio;
    const offscreen = new OffscreenCanvas(witdh, height);
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(
      bgCanvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });
    const objectURL = URL.createObjectURL(blob);
    const timestamp = Date.now();
    downloadURI(objectURL, `spotify-framed-${timestamp}.png`);
    URL.revokeObjectURL(objectURL);
  };

  return (
    <section
      className={classNames(
        'flex size-full grow snap-x snap-mandatory overflow-x-auto overflow-y-hidden lg:flex-row-reverse lg:justify-evenly lg:overflow-x-visible lg:overflow-y-visible',
        styles['no-scrollbar'],
      )}
    >
      <div className='relative flex h-screen shrink-0 basis-full snap-center items-center justify-center p-8 lg:h-auto lg:basis-auto lg:p-0'>
        <div
          className={classNames(
            'aspect-[2/3] w-72 lg:fixed lg:top-1/2 lg:-translate-y-1/2',
          )}
        >
          <KonvaProvider>
            <SpotifyFrame
              stageRef={stageRef}
              src={dataURL}
              darkTheme={darkTheme}
              showCover={showCover}
              backgroundOpacity={backgroundOpacity}
              backgroundFilter={`blur(${backgroundBlur}px)`}
              title={title}
              artist={artist}
              liked={liked}
              playing={playing}
              progress={progress}
              nowAt={nowAt}
              duration={duration}
              onClick={handleDownload}
            />
          </KonvaProvider>
        </div>
        <button
          type='button'
          className='absolute bottom-8 right-8 rounded-full bg-gradient-to-br from-spotify-green to-spotify-black p-6 shadow-md lg:fixed'
          onClick={handleDownload}
        >
          <FaCameraRetro
            className='size-6 fill-white'
            title='download'
            aria-label='download'
          />
        </button>
      </div>
      <div className='relative flex h-screen shrink-0 basis-full snap-center items-center justify-center overflow-y-auto lg:h-auto lg:basis-auto lg:overflow-y-visible'>
        <form className='absolute top-0 flex w-full max-w-[480px] flex-col items-stretch space-y-8 p-8 lg:static lg:inset-auto'>
          <Fieldset>
            <div className='flex justify-between'>
              <Label htmlFor='cover'>Cover</Label>
              {src && (
                <button
                  type='button'
                  className='text-xs'
                  onClick={handleClearFileButtonClick}
                >
                  <FaX
                    className='size-3 fill-gray-400'
                    title='clear'
                    aria-label='clear'
                  />
                </button>
              )}
            </div>
            {src ? (
              <div className='grid place-content-center'>
                <ImageCropper
                  src={src}
                  className='h-48'
                  aspect={1}
                  onCrop={setCroppedDataURL}
                />
              </div>
            ) : (
              <DnDFileInput
                id='cover'
                className='flex h-48 flex-col items-center justify-center gap-y-4'
                name='cover'
                accept='image/*'
                value={src}
                onChange={handleFileChange}
                onDrop={handleFileDrop}
              >
                <FaImage className='block size-8 fill-gray-200' />
                <span className='text-xs text-gray-400'>
                  Upload or drag and drop a image
                </span>
              </DnDFileInput>
            )}
          </Fieldset>
          <Fieldset className='items-center justify-between' horizontal>
            <Label htmlFor='darkTheme'>Dark Theme</Label>
            <SwitchInput
              id='darkTheme'
              checked={darkTheme}
              onChange={setDarkTheme}
            />
          </Fieldset>
          <Fieldset className='items-center justify-between' horizontal>
            <Label htmlFor='showCover'>Show Cover Photo</Label>
            <SwitchInput
              id='showCover'
              checked={showCover}
              onChange={setShowCover}
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor='backgroundOpacity'>Background Opacity</Label>
            <RangeInput
              id='backgroundOpacity'
              name='backgroundOpacity'
              min='0'
              max='1'
              step={0.01}
              value={backgroundOpacity}
              onChange={handleBackgroundOpacityChange}
            />
          </Fieldset>
          {canvasFilterSupported && (
            <Fieldset>
              <Label htmlFor='backgroundBlur'>Background Blur</Label>
              <RangeInput
                id='backgroundBlur'
                name='backgroundBlur'
                min='0'
                max='25'
                step={0.25}
                value={backgroundBlur}
                onChange={handleBackgroundBlur}
              />
            </Fieldset>
          )}
          <Fieldset>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={handleTitleChange}
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor='artist'>Artist</Label>
            <Input
              id='artist'
              type='text'
              name='artist'
              placeholder='Artist'
              value={artist}
              onChange={handleArtistChange}
            />
          </Fieldset>
          <Fieldset className='items-center justify-between' horizontal>
            <Label htmlFor='liked'>Liked</Label>
            <SwitchInput id='liked' checked={liked} onChange={setLiked} />
          </Fieldset>
          <Fieldset className='items-center justify-between' horizontal>
            <Label htmlFor='playing'>Playing</Label>
            <SwitchInput id='playing' checked={playing} onChange={setPlaying} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor='progress'>Progress</Label>
            <RangeInput
              id='progress'
              name='progress'
              min='0'
              max='100'
              step={1}
              value={progress}
              onChange={handleProgressChange}
            />
          </Fieldset>
          <div className='flex flex-col justify-between gap-y-8 md:flex-row md:gap-x-4'>
            <Fieldset className='min-w-0 grow'>
              <Label htmlFor='nowAt'>Now at</Label>
              <Input
                id='nowAt'
                type='text'
                name='nowAt'
                placeholder='Now at'
                value={nowAt}
                onChange={handleNowAtChange}
              />
            </Fieldset>
            <Fieldset className='min-w-0 grow'>
              <Label htmlFor='duration'>Duration</Label>
              <Input
                id='duration'
                type='text'
                name='duration'
                placeholder='Duration'
                value={duration}
                onChange={handleDurationChange}
              />
            </Fieldset>
          </div>
        </form>
      </div>
      {showTutorail && (
        <div
          className={classNames(
            'fixed inset-0 flex flex-col items-center justify-center gap-y-8 bg-black/50 lg:hidden',
            styles['scroll-tutorial'],
          )}
        >
          <span className='text-lg text-gray-200'>
            Scroll right to customize
          </span>
          <FaArrowRightLong
            className={classNames(
              'size-8 animate-bounce fill-gray-200',
              styles['animate-horizontal-bounce'],
            )}
            title='scroll right to preview'
            aria-label='scroll right to preview'
          />
        </div>
      )}
    </section>
  );
};
