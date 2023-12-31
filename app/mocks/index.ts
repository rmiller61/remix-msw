import {server} from "./server"

server.listen()

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})