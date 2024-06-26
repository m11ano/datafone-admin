import path from 'path';
import dotenv from 'dotenv';
import type webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { type BuildEnv, type BuildPaths } from './config/build/types/config';

dotenv.config({ path: './.env' });

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode === 'production' ? 'production' : 'development';
    const isDev = mode === 'development';
    const PORT = env.port || 3000;
    const apiUrl = env.API_URL || process.env.API_URL || 'http://127.0.0.1:5000/api';
    const urlPrefix = process.env.URL_PREFIX || '/';
    const recaptchaV2Public = process.env.RECAPTCHA_V2_PUBLIC || '/';
    const limitFileSizeMb = Number(process.env.LIMIT_FILESIZE_MB) || 1;

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        urlPrefix,
        recaptchaV2Public,
        project: 'frontend',
        limitFileSizeMb,
    });

    return config;
};
