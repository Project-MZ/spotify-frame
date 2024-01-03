import type { ReactNode, ComponentType } from 'react';

/**
 * Props for HOC
 */
export interface HocProps {
  children: ReactNode;
  [key: string]: unknown;
}

/**
 * Type for general HOC
 */
export type Hoc = (
  Component: ComponentType<HocProps>,
) => ComponentType<HocProps>;

/**
 * Type for general provder
 */
export type Provider = (props: HocProps) => JSX.Element;

/**
 * Wrap component with multiple HOCs
 * @param hocs HOCs to apply
 * @returns Component wrapped with all HOCs
 * @example
 * ```
 * composeHocs(hocA, hocB)(ComponentToWrap)
 * ```
 */
export const composeHocs =
  (...hocs: Hoc[]) =>
  (ComponentToWrap: ComponentType<HocProps>): ComponentType<HocProps> =>
    hocs.reduce((component, hoc) => hoc(component), ComponentToWrap);

/**
 * Wrap component with multiple providers
 * @param Providers Providers to apply
 * @returns Component wrapped with all providers
 * @example
 * ```
 * composeProviders(ProviderA, ProviderB)(ComponentToWrap)
 * ```
 */
export const composeProviders =
  (...Providers: Provider[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends { [key: string]: any }>(ComponentToWrap: ComponentType<T>) => {
    const WrappedComponent = (props: T): JSX.Element => (
      <>
        {Providers.reduce(
          // TODO: fix type
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (C, P) => (
            <P>
              <C {...props} />
            </P>
          ),
          ComponentToWrap,
        )}
      </>
    );
    return WrappedComponent;
  };
