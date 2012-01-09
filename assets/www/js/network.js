function network() {
	var currentXhr = null;

	function makeRequest(options) {
		currentXhr = $.ajax({
			url: options.url,
			dataType: 'text',
			headers: {
				"Application-Version": "Wikipedia Mobile (Android)/1.0.0"
			},
			success: function(data, xhr) {
				if(data == '') {
					// Sometimes we get an empty response. Why? Not sure.
					options.error(xhr);
				} else {
					options.success(data, xhr);
				}
				currentXhr = null;
			},
			error: function(data) {
				options.error(xhr);
				currentXhr = null;
			}
		});
	}

	function stopCurrentRequest() {
		if(currentXhr) {
			currentXhr.abort();
			currentXhr = null
		}
	}

	return {
		makeRequest: makeRequest,
		stopCurrentRequest: stopCurrentRequest
	};

}