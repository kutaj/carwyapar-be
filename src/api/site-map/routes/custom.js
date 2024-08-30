module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/site-map-newcars', 
        handler: 'custom.newcars',
      },
      { 
        method: 'GET',
        path: '/site-map-carnews', 
        handler: 'custom.carnews',
      }
    ]
  }