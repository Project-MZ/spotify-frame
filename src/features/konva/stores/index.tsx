import type { Vector2d } from 'konva/lib/types';
import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';

/**
 * konva state
 */
type KonvaState = {
  /** scale */
  scale: Vector2d;
};

/**
 * konva context
 */
type IKonvaContext = {
  state: KonvaState;
  dispatch: ProjectDispatch;
};

/**
 * konva dispatch
 */
type ProjectDispatch = (action: KonvaAction) => void;

/**
 * konva context
 */
const KonvaContext = createContext<IKonvaContext | undefined>(undefined);

/**
 * konva action types
 */
const KONVAS_ACTION_TYPE = {
  SET_SCALE: 'SET_SCALE',
} as const;

/**
 * konva action
 */
type KonvaAction = {
  type: typeof KONVAS_ACTION_TYPE.SET_SCALE;
  scale: Vector2d;
};

/**
 * konva reducer
 */
const konvaReducer = (state: KonvaState, action: KonvaAction): KonvaState => {
  switch (action.type) {
    case KONVAS_ACTION_TYPE.SET_SCALE:
      return {
        ...state,
        scale: action.scale,
      };

    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/**
 * props for {@link KonvaProvider}
 */
type Props = {
  /** children to pass */
  children: ReactNode;
  /** initial state */
  initialState?: Partial<KonvaState>;
};

/**
 * konva provider
 */
export const KonvaProvider = ({
  children,
  initialState,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(konvaReducer, {
    scale: { x: 1, y: 1 },
    ...initialState,
  });
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <KonvaContext.Provider value={value}>{children}</KonvaContext.Provider>
  );
};

/**
 * hook to use konva context
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useKonvaContext = () => {
  const context = useContext(KonvaContext);

  if (context === undefined) {
    throw new Error(
      `${useKonvaContext.name} must be used within a KonvaProvider`,
    );
  }

  const { state, dispatch } = context;

  const setScale = useCallback(
    (scale: KonvaState['scale']) => {
      dispatch({ type: KONVAS_ACTION_TYPE.SET_SCALE, scale });
    },
    [dispatch],
  );

  const relativeX = useCallback(
    (n: number) => n * state.scale.x,
    [state.scale.x],
  );
  const relativeY = useCallback(
    (n: number) => n * state.scale.y,
    [state.scale.y],
  );

  return {
    /** scale */
    scale: state.scale,
    /** set scale */
    setScale,
    /** calc relative scale for x */
    relativeX,
    /** calc relative scale for y */
    relativeY,
  };
};
