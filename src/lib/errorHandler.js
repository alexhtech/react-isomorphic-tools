import PrettyError from 'pretty-error'

const pe = new PrettyError()

const errorHandler = ({error, res, req}) => {
    const errorTemplate = {
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        cookies: req.cookies
    }

    if (error.hasOwnProperty('type')) {
        switch (error.type) {
            case 'notAvailableResource': {
                res.redirect('/error?errorData=' + JSON.stringify({...errorTemplate, error}))
            }
                break
            case 'redirect': {
                res.redirect(error.to)
            }
                break
        }
    }
    else {
        console.log(pe.render(new Error(error)))
        res.redirect(`/error?errorData=${JSON.stringify({
            type: 'Failed to render',
            params: errorTemplate
        })}`)
    }

}


export default errorHandler
