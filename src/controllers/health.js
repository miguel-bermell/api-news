const mongoose = require('mongoose')
const { readFileSync } = require('fs')
const { CONNECTION } = require('../utils/constants')

const pjson = JSON.parse(readFileSync('./package.json', 'utf8'))

exports.HealthStatus = (req, res) => {
  res.status(200).send({
    name: pjson.name,
    version: pjson.version,
    mongodb: {
      status: CONNECTION[mongoose.connection.readyState]
    }
  })
}
