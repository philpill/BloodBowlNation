(function(req) {

	var _ = req('underscore');

	module.exports = {

		'block': {
			'label' : 'block',
			'category': 'general'
		},
		'dodge': {
			'label' : 'dodge',
			'category': 'agility'
		},
		'catch': {
			'label' : 'catch',
			'category': 'agility'
		},
		'throw': {
			'label' : 'throw',
			'category': 'passing'
		},
		'sureHands': {
			'label' : 'sure hands',
			'category': 'general'
		}
	};

})(require);