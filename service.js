'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Ads = require('tfk-seneca-collect-content')
const envs = process.env
const config = require('./config')
const pkg = require('./package.json')

const options = {
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
    type: 'ads',
    system: pkg.name,
    channelId: config.channelId,
    feedHostUrl: config.feedHostUrl
  },
  isolated: {
    host: envs.PORTALEN_COLLECTOR_ADS_HOST || 'localhost',
    port: envs.PORTALEN_COLLECTOR_ADS_PORT || 8000
  }
}

const Service = Seneca(options.seneca)

if (envs.PORTALEN_COLLECTOR_ADS_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Ads, options.ads)
