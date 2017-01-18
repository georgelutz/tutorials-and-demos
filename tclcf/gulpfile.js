const gulp = require('gulp')
const portalCore = require('portal-core')
const config = portalCore.getConfig()
portalCore.importTasks(gulp, config, true)
