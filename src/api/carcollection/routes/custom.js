module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/custom-carcollections', 
        handler: 'custom.find',
      },
      { 
        method: 'GET',
        path: '/test-cars', 
        handler: 'custom.comparecars',
      }
    ]
  }