express = require 'express'
router = express.Router()
daumauth = require '../lib/daumauth'
config = require 'config'
apibookClient = require '../lib/apibook-client'

homeUrl = config.get 'developers.homeUrl'

router.get '/', (req, res) ->
  # 로그인 체크
  prof = daumauth.checkLogin req, res
  return unless prof

  apibookClient.getAppsByUser prof['USERID'], (err, apps) ->
    currentAppId = apps[0].id

    apibookClient.getAppById currentAppId, (err, currentApp) ->

      res.render 'console-info', {
        title: res.__('콘솔')
        prof
        homeUrl
        apps
        currentApp
      }

router.get '/:appId', (req, res) ->
  # 로그인 체크
  prof = daumauth.checkLogin req, res
  return unless prof

  currentAppId = req.params.appId

  apibookClient.getAppsByUser prof['USERID'], (err, apps) ->
    apibookClient.getAppById currentAppId, (err, currentApp) ->

      currentApp.level = 'Silver';

      currentApp.users.forEach (user) ->
        if user.userId is prof['USERID']
          prof['PERMISSION'] = res.__('소유자')
          return

      currentApp.beholders.forEach (beholder) ->
        if beholder.userId is prof['USERID']
          prof['PERMISSION'] = res.__('개발자')
          return          

      res.render 'console-info', {
        title: res.__('콘솔')
        prof
        homeUrl
        apps
        currentApp
      }

module.exports = router
