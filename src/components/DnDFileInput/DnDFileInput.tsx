import classNames from 'classnames';
import {
  useRef,
  useState,
  type ReactNode,
  type ChangeEventHandler,
  type MouseEventHandler,
  type DragEventHandler,
  type ComponentPropsWithoutRef,
} from 'react';

/**
 * props for {@link DnDFileInput}
 */
type Props = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onDrop'> & {
  /** children */
  children: ReactNode;
  /** change event handler */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** drop event handler */
  onDrop: DragEventHandler<HTMLButtonElement>;
};

/**
 * file input with drag and drop
 */
export const DnDFileInput = ({
  className,
  children,
  onDrop,
  ...props
}: Props): JSX.Element => {
  const dndAreaRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };
  const handleDragOver: DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsOver(true);
  };
  const handleDragLeave: DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsOver(false);
  };
  const handleDrop: DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsOver(false);
    if (inputRef.current) inputRef.current.files = e.dataTransfer.files;
    onDrop(e);
  };

  return (
    <button
      type='button'
      ref={dndAreaRef}
      className={classNames(
        'grid cursor-pointer place-content-center rounded-md border border-dashed',
        isOver && 'bg-gray-100',
        className,
      )}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      <input {...props} ref={inputRef} type='file' className='hidden' />
    </button>
  );
};
