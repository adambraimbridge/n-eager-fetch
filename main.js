/*jshint -W079*/
'use strict';

var catchNetworkErrors = require('./src/catch-network-errors');
require('isomorphic-fetch');

module.exports = function(url, opts) {
	var retriesLeft = opts.retry === undefined ? 3 : opts.retry;
	opts.retry = undefined;

	function fetchAttempt() {
		return fetch(url, opts)
			.catch(catchNetworkErrors)
			.then(function(response) {
				if (!response.ok && retriesLeft > 0) {
					retriesLeft--;
					return fetchAttempt();
				}
				return response;
			});
	}

	return fetchAttempt();
};
