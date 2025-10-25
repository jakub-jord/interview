import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'default-secret-change-this',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Custom routes can be added here
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })

  app.listen(PORT, () => {
    payload.logger.info(`Server listening on port ${PORT}`)
  })
}

start()

