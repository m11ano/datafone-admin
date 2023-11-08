declare module '*.less' {
    type IClassNames = Record<string, string>;
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
    import type React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __APP_URL_PREFIX__: string;
declare const __RECAPTCHA_V2_PUBLIC__: string;
declare const __PROJECT__: 'storybook' | 'jest' | 'frontend';
declare const __LIMIT_FILESIZE_MB__: string;

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
