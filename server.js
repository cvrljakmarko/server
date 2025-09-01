const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

// Dummy in-memory "database"
let tariffs = [
    {
        id: "basic-plan",
        name: "Basic",
        features: {
            bandwidth: "100 GB",
            online_duration: "30 days",
            support: "Email only"
        },
        prices: {
            monthly: { currency: "EUR", amount: 9.99 },
            yearly: { currency: "EUR", amount: 99.99 }
        }
    },
    {
        id: "pro-plan",
        name: "Pro",
        features: {
            bandwidth: "1 TB",
            online_duration: "Unlimited",
            support: "24/7 Chat & Email",
            custom_domain: true
        },
        prices: {
            monthly: { currency: "EUR", amount: 29.99 },
            yearly: { currency: "EUR", amount: 299.99 }
        }
    }
]

app.get('/api/tariffs', (req, res) => {
    res.json(tariffs)
})

app.get('/api/tariffs/:id', (req, res) => {
    const tariff = tariffs.find(t => t.id === req.params.id)
    if (!tariff) {
        return res.status(404).json({ error: "Tariff not found" })
    }
    res.json(tariff)
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
