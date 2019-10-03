'use strict';
const hookStd = require('hook-std');
const stripAnsi = require('strip-ansi');

exports.testOutput = (t, expected) => {
	t.plan(t._test.planCount || expected.length);
	let i = 0;

	const promise = hookStd(actual => {
		t.is(stripAnsi(actual), `${expected[i++]}`);

		if (i === expected.length) {
			promise.unhook();
		}
	});
};
