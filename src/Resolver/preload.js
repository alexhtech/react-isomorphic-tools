import getDisplayName from 'react-display-name'


const preload = (preload, options) => Component => {
    Component.preload = preload
    Component.preloadOptions = options
    Component.displayName = getDisplayName(Component)
    return Component
}


export {
    preload as default
}