const mongoose = require("mongoose")

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      console.log(error);

      // Add the error into the database for later analysis
      var errorModel = mongoose.model.recentErrors
      // if model is not defined, define it
      if (!mongoose.models.recentErrors) {


       errorModel = mongoose.model('recentErrors', new mongoose.Schema({
        method: String,
        date: Date,
        status: Number,
        endpoint: String,
        user: String
        }))
      }

      if (req.method && req.originalUrl && error.pokeErrCode && error.pokeErrCode >= 400) {
        errorModel.create({ method: req.method, date: new Date(), status: error.pokeErrCode, endpoint: req.originalUrl, user: req.user ? req.user.username : "user" })
      }

      next(error)
    }
  }
}

module.exports = { asyncWrapper }