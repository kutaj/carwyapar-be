module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/site-map-carwyapar', 
        handler: 'custom.carwyapar',
      },
      { 
        method: 'GET',
        path: '/site-map-newcars', 
        handler: 'custom.newcars',
      },
      { 
        method: 'GET',
        path: '/site-map-carnews', 
        handler: 'custom.carnews',
      },
      { 
        method: 'GET',
        path: '/site-map-comparecars', 
        handler: 'custom.comparecars',
      },
      // { 
      //   method: 'GET',
      //   path: '/site-map-comparecars-variant', 
      //   handler: 'custom.comparecarsvariant',
      // }
      { 
        method: 'GET',
        path: '/site-map-tools', 
        handler: 'custom.tools',
      },
      { 
        method: 'GET',
        path: '/site-map-info', 
        handler: 'custom.info',
      },
    ]
  }