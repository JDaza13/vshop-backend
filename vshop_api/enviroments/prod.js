const appVars = {
    'host': '0.0.0.0',
    'port': 8080,
    'DBSettings': {
        'mongodburl': 'mongodb://vshopuser:vshoppass1@ds033196.mlab.com:33196/vshop',
        'dbName': 'vshop',
        'categoriesCol': 'categories',
        'productsCol': 'products',
        'cartCol': 'shopcart'
    }
}

module.exports = appVars;
