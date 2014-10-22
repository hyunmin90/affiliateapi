express = require 'express'
router = express.Router()

router.get '/', (req, res) ->
  res.render 'community-index', { title: res.__('커뮤니티') }

module.exports = router
