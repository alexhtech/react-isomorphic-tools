import serialize from 'serialize-javascript'


const isDev = process.env.NODE_ENV === 'development'

export default ({state, helmet, html = '', css = '', resolved = [], config}) => `
        <!DOCTYPE html>
        <html ${helmet.htmlAttributes.toString()}>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                ${css}
            </head>
            <body ${helmet.bodyAttributes.toString()}>
                <span id='react-root'>${html}</span>
                <script charSet="UTF-8">
                    window.__preloadState=${serialize(state)};
                    window.__preloadRoutes=${serialize(resolved)};
                    config = ${serialize(config)};
                </script>
                <script src="${isDev ? 'http://127.0.0.1:3001' : ''}/public/bundle.js"></script>
            </body>
        </html>
`