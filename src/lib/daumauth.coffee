path = require 'path'
qs = require 'qs'

DaumAuth = require 'node-daumauth'
da = new DaumAuth(path.join(__dirname, '../secret/'))

checkLogin = (req, res) ->
  cookies = req.cookies
  data = {
      "TS" : cookies["TS"],
      "HTS" : cookies["HTS"],
      "HM_CU" : cookies["HM_CU"],
      "PROF" : cookies["PROF"],
      "REMOTE_ADDR" : cookies["REMOTE_ADDR"],
      "X-Daum-IP" : cookies["X-Daum-IP"],
      "LON" : cookies["LON"],
  }
  
  prof = {}
  result = da.is_login_valid data, prof, 1

  protocol = (if (req.connection.encrypted) then "https" else "http")
  redirectUrl = "#{protocol}://#{req.headers.host}#{req.originalUrl}"

  if result isnt 1
      res.redirect 'https://logins.daum.net/accounts/loginform.do?url=' + encodeURIComponent(redirectUrl)
      return null
  else
    return prof

module.exports = {
  checkLogin
}