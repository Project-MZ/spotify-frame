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
import { FaCameraRetro, FaImage, FaX } from 'react-icons/fa6';
import { DnDFileInput } from '~/components/DnDFileInput';
import { Fieldset } from '~/components/Fieldset';
import { ImageCropper } from '~/components/ImageCropper';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { KonvaProvider } from '~/features/konva';
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
  const [src, setSrc] = useState('');
  const [dataURL, setCroppedDataURL] = useState('');
  const [title, setTitle] = useState("WE'RE GETTING MARRIED!");
  const [artist, setArtist] = useState('JOHN and JANE');
  const [progress, setProgress] = useState(33);
  const [nowAt, setNowAt] = useState(defaultDate);
  const [duration, setDuration] = useState('@HILLSIDE CLUB');

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
    const stage = stageRef.current;
    if (!stage) return;
    const canvas = stage.content.querySelector('canvas');
    if (!canvas) return;

    const offscreen = new OffscreenCanvas(960, 1280);
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;
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
      <div className='relative grid h-screen shrink-0 basis-full snap-center place-content-center p-8 lg:h-auto lg:basis-auto lg:p-0'>
        <div
          className={classNames(
            'sticky h-96 w-72',
            styles['preview-container'],
          )}
        >
          <KonvaProvider>
            <SpotifyFrame
              stageRef={stageRef}
              src={dataURL}
              title={title}
              artist={artist}
              progress={progress}
              nowAt={nowAt}
              duration={duration}
              onClick={handleDownload}
            />
          </KonvaProvider>
        </div>
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
                placeholder='Cover'
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
          <Fieldset>
            <Label htmlFor='progress'>Progress</Label>
            <Input
              id='progress'
              type='range'
              name='progress'
              min='0'
              max='100'
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
      <button
        type='button'
        className='fixed bottom-8 right-8 rounded-full bg-gradient-to-br from-[#1DB954] to-[#191414] p-6 shadow-md'
        onClick={handleDownload}
      >
        <FaCameraRetro
          className='size-6 fill-white'
          title='download'
          aria-label='download'
        />
      </button>
    </section>
  );
};
