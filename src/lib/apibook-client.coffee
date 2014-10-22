request = require 'request'
cache = require 'memory-cache'
config = require 'config'

baseUrl = config.get 'apibook.apiBaseUrl'

_getFromApibook = (path, opt, callback) ->
  requestUrl = baseUrl + path
  opt = {} unless opt
  
  if cache.get(requestUrl)
      callback cache.get(requestUrl)
  else
    request.get requestUrl, (error, response, body) ->
      if not error and response.statusCode is 200
        opt.cacheTime = 60000 if opt.cacheTime <= 0
        cache.put requestUrl, body, opt.cacheTime
        callback null, body
      else
        callback error

getAppsByUser = (userId, callback) ->
  opt = { cacheTime: 500 }

  _getFromApibook "/apps/findByDaumUser?userId=#{userId}", opt, (err, apps) ->
    return callback err if err?
    try
      callback null, JSON.parse(apps)
    catch e
      callback e


getAppById = (appId, callback) ->
  opt = { cacheTime: 500 }

  _getFromApibook "/apps/#{appId}", opt, (err, app) ->
    return callback err if err?
    try
      callback null, JSON.parse(app)
    catch e
      callback e

module.exports = {
  getAppsByUser
  getAppById
}