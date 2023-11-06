import type webpack from 'webpack';
import path from 'path';
import { type BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            '~includes.less': path.resolve(options.paths.src, 'app/styles/includes/index.less'),
            '@module': path.resolve(options.paths.src, 'modules/client'),
            '@core': path.resolve(options.paths.src, 'modules/core'),
            '@': options.paths.src,
        },
    };
}
