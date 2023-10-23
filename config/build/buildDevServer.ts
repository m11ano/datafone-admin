import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import { type BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        // open: true,
        historyApiFallback: true,
        hot: true,
        static: {
            directory: path.join(__dirname, "public")
          },
        devMiddleware: {
            // publicPath: process.env.urlPrefix || '/',
            publicPath: 'auto',
        },
    };
}
