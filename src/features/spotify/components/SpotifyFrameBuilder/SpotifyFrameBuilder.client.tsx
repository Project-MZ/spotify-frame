'use client';

import type {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
} from 'react';
import { useState } from 'react';
import { DnDFileInput } from '~/components/DnDFileInput';
import { Fieldset } from '~/components/Fieldset';
import { ImageCropper } from '~/components/ImageCropper';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { SpotifyFrame } from '../SpotifyFrame';

/**
 * spotify frame builder
 */
export const SpotifyFrameBuilder = (): JSX.Element => {
  const now = new Date();
  const defaultDate = `${String(now.getMonth() + 1).padStart(2, '0')}.${String(
    now.getDate(),
  ).padStart(2, '0')}.${now.getFullYear()}`;
  const [src, setSrc] = useState('');
  const [dataURL, setCroppedDataURL] = useState('');
  const [title, setTitle] = useState("WE'RE GETTING MARRIED!");
  const [subTitle, setSubtitle] = useState('JOHN and JANE');
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
  };
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };
  const handleSubtitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSubtitle(e.target.value);
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

  return (
    <section className='grid h-full w-full max-w-[960px] grow grid-cols-1 gap-y-32 md:grid-cols-2 md:gap-x-16 lg:gap-x-32'>
      <div className='flex items-center justify-center'>
        <form className='flex w-full flex-col items-stretch space-y-8'>
          <Fieldset>
            <div className='flex justify-between'>
              <Label htmlFor='imaimagege'>Image</Label>
              {src && (
                <button
                  type='button'
                  className='text-xs text-blue-500'
                  onClick={handleClearFileButtonClick}
                >
                  Clear
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
                id='image'
                className='h-48'
                name='image'
                placeholder='Image'
                accept='image/*'
                value={src}
                onChange={handleFileChange}
                onDrop={handleFileDrop}
              >
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
            <Label htmlFor='subtitle'>Subtitle</Label>
            <Input
              id='subtitle'
              type='text'
              name='subtitle'
              placeholder='Subtitle'
              value={subTitle}
              onChange={handleSubtitleChange}
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
          <Fieldset>
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
          <Fieldset>
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
        </form>
      </div>
      <div className='grid place-content-center'>
        <SpotifyFrame
          src={dataURL}
          title={title}
          subTitle={subTitle}
          progress={progress}
          nowAt={nowAt}
          duration={duration}
        />
      </div>
    </section>
  );
};
