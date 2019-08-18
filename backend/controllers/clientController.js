const Client = require('../db/models/clientData')

let createClient = (req, res) => {   
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a client',
        })
    }

    const client = new Client(body)

    if (!client) {
        return res.status(400).json({ success: false, error: err })
    }

    client.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: client._id,
                message: 'Client created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Client not created!',
            })
        })
}

let updateClient = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Client not found!',
            })
        }
        client.name = body.name
        client.time = body.time
        client.rating = body.rating
        client
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: client._id,
                    message: 'Client updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Client not updated!',
                })
            })
    })
}

let deleteClient = async (req, res) => {
    await Client.findOneAndDelete({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `Client not found` })
        }

        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

let getClientById = async (req, res) => {
    await Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

let getClients = async (req, res) => {
    await Client.find({}, (err, clients) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!clients.length) {
            return res
                .status(404)
                .json({ success: false, error: `Client not found` })
        }
        return res.status(200).json({ success: true, data: clients })
    }).catch(err => console.log(err))
}

module.exports = {
    createClient,
    updateClient,
    deleteClient,
    getClients,
    getClientById,
}