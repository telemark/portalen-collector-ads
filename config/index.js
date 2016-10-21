'use strict'

var envs = process.env

var config = {
  feedHostUrl: envs.ADS_FEED_HOST_URL || 'https://info.portalen.no/artikler.json',
  channelId: envs.ADS_FEED_CHANNEL_ID || 'ad'
}

module.exports = config
