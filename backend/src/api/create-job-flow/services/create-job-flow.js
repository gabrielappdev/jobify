'use strict';

/**
 * create-job-flow service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::create-job-flow.create-job-flow');
