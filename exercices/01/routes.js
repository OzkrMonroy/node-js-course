const userRegisterd = ["<li>Frederick Starks</li>", "<li>Danny Torrance</li>", "<li>Jack Sawyer</li>"]

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method

  if(url === '/') {
    res.setHeader('Content-Type', 'text-html')
    res.write('<html>')
    res.write('<head><title>First Challenge</title></head>')
    res.write('<body><h1>Challenge #1</h1><p>This is my first challenge of the NodeJs course.</p><p>Enter your name and something magic will happen</p><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>')
    res.write('</html>')
    return res.end()
  }
  if(url === '/users') {
    const userList = userRegisterd.toString()
    res.setHeader('Content-Type', 'text-html')
    res.write('<html>')
    res.write('<head><title>First Challenge</title></head>')
    res.write(`<body><h1>Lis of users</h1><p>This is my list of users.</p><div><ul>${userList.replace(/[,]/g,'')}</ul></div></body>`)
    res.write('</html>')
    return res.end()
  }
  if(url === '/create-user' && method === 'POST'){
    const bodyRequest = []
    
    req.on('data', (chunk) => {
      bodyRequest.push(chunk)
    })
    return req.on('end', () => {
      const parseBody = Buffer.concat(bodyRequest).toString()
      const userName = parseBody.split('=')[1].replace(/[+]/g, ' ')
      const userItemName = `<li>${userName}</li>`

      userRegisterd.push(userItemName)
      console.log(userName)
      res.statusCode = 302
      res.setHeader('Location', '/users')
      return res.end()
    })

  }
}

module.exports = requestHandler