# n-eager-fetch

Extension of fetch which supports passing a `retry` value in to `options`. `retry` should be an integer, `n`, and a fetch will be retried `n` times (i.e. `n + 1` fetches in total) before failing.

Fetches also have a `stopRetrying()` method which will fulfil the promise with the reult of the current in-flight fetch and not send any more requests
