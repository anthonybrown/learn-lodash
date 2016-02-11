$(function () {
  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.row-offcanvas').toggleClass('active')
  });
	var Person = function Person(name,age, email, occupation) {
		this.id         = _.uniqueId();
		this.name       = name;
		this.age        = age;
		this.email      = email;
		this.occupation = occupation;
	};

	var data = [
		new Person( 'Bill Thompson' , 45,'bill@example.com'  , 'Math Teacher' ),
		new Person( 'Lori Segway'   , 22,'lori@example.com'  , 'Hair Stylist' ),
		new Person( 'Peggy Stiller' , 31, 'peg@example.com'  , 'Makeup Artist' ),
		new Person( 'Harry Lane'    , 62, 'harry@example.com', 'Company Ceo' ),
		new Person( 'Michael Lowney', 40, 'mike@example.com' , 'Gung Fu Instructor' ),
		new Person( 'Paul Byrant'   , 56, 'paul@example.com' , 'Web Developer' )
	];

	// Imperative approach
//	var output = document.querySelector('#people tbody');
//	data.forEach(function (person) {
//		var row = document.createElement('tr');
//		['id', 'name', 'age', 'email', 'occupation'].forEach(function (prop) {
//			var td = document.createElement('td');
//			td.appendChild(document.createTextNode(person[prop]));
//			row.appendChild(td);
//		});
//		output.appendChild(row);
//	});

	// Declarative / Functional lodash

	var output = document.querySelector('#people tbody');

	var propOf = function (obj) {
		return function (name) {
			return obj[name];
		};
	};

	var append = function (parent, child) {
		parent.appendChild(child);
		return parent;
	};

	var createTextNode = document.createTextNode.bind(document);

	var wrap = function (elementType) {
		return function (child) {
			var parent = document.createElement(elementType);
			parent.appendChild(child);
			return parent;
		};
	};

	// Actual implementation
	_(data).map(function (person) {
		return _(['id', 'name', 'age', 'email', 'occupation'])
		.map(propOf(person))
		.map(createTextNode)
		.map(wrap('td'))
		.reduce(append, document.createElement('tr'));
	}).reduce(append, output);

}());

