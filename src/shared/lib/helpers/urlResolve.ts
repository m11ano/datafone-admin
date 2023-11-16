export function urlResolve(...args: string[]) {
    args = args.map((item, i) => {
        if (i > 0 && item.charAt(0) === '/') {
            item = item.slice(1);
        }

        if (i < args.length - 1 && item.charAt(item.length - 1) === '/') {
            item = item.slice(0, -1);
        }

        return item;
    });
    return args.join('/');
}
