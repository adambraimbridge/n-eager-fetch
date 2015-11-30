/*jshint -W079*/
'use strict';

const catchNetworkErrors = require('./src/catch-network-errors');
require('isomorphic-fetch');

module.exports = function(url, opts) {
	let retriesLeft = opts.retry === undefined ? 3 : opts.retry;
	opts.retry = undefined;

	function fetchAttempt() {
		const fetchCall = fetch(url, opts)
			.catch(catchNetworkErrors)
			.then(function(response) {
				if (!response.ok && retriesLeft > 0) {
					retriesLeft--;
					return fetchAttempt();
				}
				return response;
			});

		fetchCall.stopRetrying = function () {
			retriesLeft = 0;
		}

		return fetchCall;
	}

	return fetchAttempt();
};
