export type BuildMode = 'production' | 'development'

export interface BuildPaths {
    entry: string
    build: string
    html: string
    src: string
}

export interface BuildEnv {
    mode: BuildMode
    port: number
    API_URL: string
}

export interface BuildOptions {
    mode: BuildMode
    paths: BuildPaths
    isDev: boolean
    port: number
    apiUrl: string;
    urlPrefix: string;
    recaptchaV2Public: string;
    limitFileSizeMb: number;
    project: 'storybook' | 'frontend' | 'jest';
}
