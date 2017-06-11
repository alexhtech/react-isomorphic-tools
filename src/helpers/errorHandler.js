import PrettyError from 'pretty-error'

const pe = new PrettyError()

const errorHandler = ({error, res, req}) => {
    const {code, to, location, e} = error
    const errorTemplate = {
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        cookies: req.cookies
    }

    if (code == 303) {
        res.redirect(to == '/error' ? to + '?errorData=' + JSON.stringify({location, ...errorTemplate, e}) : to)
    } else {
        console.log(pe.render(new Error(error)))
        res.redirect(`/error?errorData=${JSON.stringify({
            type: 'Failed to render',
            params: errorTemplate
        })}`)
    }
}


export {
    errorHandler
}