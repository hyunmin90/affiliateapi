express = require 'express'
router = express.Router()

router.get '/', (req, res) ->
  res.render 'services-index', { title: res.__('서비스') }

module.exports = router
