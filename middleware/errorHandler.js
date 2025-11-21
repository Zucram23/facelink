module.exports = (err, req, res, next) => {
    console.error('fejl:', err);



    if (err.isJoi) {
        return res.status(400).json({
            error: 'Valideringsfejl',
            details: err.details.map(d => d.message)
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Ugyldig ID-format',
            details: 'Det angivne ID er ikke gyldigt'
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            error: 'Duplikat',
            details: 'En post med disse data eksisterer allerede'
        });
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            error: 'Valideringsfejl',
            details: messages
        });
    }

    // Standard serverfejl
    res.status(500).json({
        error: 'Der opstod en serverfejl',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });


};

