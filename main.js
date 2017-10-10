const catchNetworkErrors = require('./src/catch-network-errors');
require('isomorphic-fetch');

module.exports = function (url, opts) {
	let retriesLeft = opts.retry === undefined ? 3 : opts.retry;
	const allowedStatusCodes = opts.allowedStatusCodes;
	opts.retry = undefined;
	opts.allowedStatusCodes = undefined;

	const isNotWhiteListed = (status) => {
		return allowedStatusCodes && allowedStatusCodes.indexOf(status) === -1;
	}

	function fetchAttempt () {
		const fetchCall = fetch(url, opts)
			.catch(catchNetworkErrors)
			.then(function (response) {
				if (!response.ok && retriesLeft > 0 && isNotWhiteListed(response.status)) {
					retriesLeft--;
					return fetchAttempt();
				}
				return response;
			});

		fetchCall.stopRetrying = function () {
			retriesLeft = 0;
		};

		return fetchCall;
	}

	return fetchAttempt();
};
