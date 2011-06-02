BBN.Helper = BBN.Helper || {

	CastPlayerHelper: function(array) {
		var i;
		for (i = 0; i < array.length; i++) {
			if (array[i] instanceof this) {
				return array[i];
			}
		}
		return null;		
	}
	
}