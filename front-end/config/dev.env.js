'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_CHANGE: '"localhost:8080"',
  VUE_APP_API_BASE: '"/api"'
})
