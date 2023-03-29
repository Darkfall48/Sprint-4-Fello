//? Libraries
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
//? Middleware
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
//? Services
const { setupSocketAPI } = require('./services/socket.service')
const logger = require('./services/logger.service')
//? Routes
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const boardRoutes = require('./api/board/board.routes')
//? Server Config
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const SERVER_PORT = process.env.PORT || 3030

//* Express App Config
app.use(cookieParser())
app.use(express.json())
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3003',
      'https://api.cloudinary.com/v1_1/cloud/image/upload'
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

//* Routes
app.all('*', setupAsyncLocalStorage)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)

setupSocketAPI(http)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
//* Cloud Config
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//* Start the server on port: SERVER_PORT (3030)
http.listen(SERVER_PORT, () => {
  logger.info('Server is running on port:', SERVER_PORT)
})
