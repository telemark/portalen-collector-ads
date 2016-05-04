'use strict'

var Seneca = require('seneca')
var Mesh = require('seneca-mesh')
var Ads = require('./lib/ads')
var envs = process.env

var options = {
  seneca: {
    tag: envs.PORTALEN_COLLECTOR_ADS_TAG || 'portalen-collector-ads-tag'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'cmd:collect-info, type:user', model: 'observe'}
    ]
  },
  ads: {
    url: envs.PORTALEN_COLLECTOR_ADS_URL || 'http://ads.no'
  },
  isolated: {
    host: envs.PORTALEN_COLLECTOR_ADS_HOST || 'localhost',
    port: envs.PORTALEN_COLLECTOR_ADS_PORT || 8000
  }
}

var Service = Seneca(options.seneca)

if (envs.PORTALEN_COLLECTOR_ADS_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Ads, options.ads)
