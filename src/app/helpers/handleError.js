const httpError = (res, err) => {
    console.log(err)
    res.status(500)
    res.send({ error: 'Something went wrong '})
}

module.exports = {httpError}