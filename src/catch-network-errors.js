'use strict';

const logger = require('@financial-times/n-logger').default;

module.exports = function (err) {
	if (err.message.indexOf('network timeout at') > -1) {
		logger.warn('Fetch network error occurred', { message: err.message });
		return { ok: false };
	} else {
		throw err;
	}
};
