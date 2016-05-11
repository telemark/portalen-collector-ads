###########################################################
#
# Dockerfile for portalen-collector-ads
#
###########################################################

# Setting the base to nodejs 4.4.4
FROM mhart/alpine-node:4.4.4

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV PORTALEN_COLLECTOR_ADS_TAG portalen-collector-ads
ENV PORTALEN_COLLECTOR_ADS_URL http://portalen.collector.ads.no
ENV PORTALEN_COLLECTOR_ADS_HOST localhost
ENV PORTALEN_COLLECTOR_ADS_PORT 8000
ENV ADS_FEED_HOST_URL http://portalen.collector.ads.no
ENV ADS_FEED_CHANNEL_ID ad

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]