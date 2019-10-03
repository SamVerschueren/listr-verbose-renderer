import {serial as test} from 'ava';
import Listr from 'listr';
import format from 'date-fns/format';
import {testOutput} from './fixtures/utils';
import renderer from '..';

const date = format(new Date(), 'dd/MM/yyyy');

test('task succeeds', async t => {
	const list = new Listr([
		{
			title: 'foo',
			task: () => Promise.resolve()
		}
	], {
		renderer,
		dateFormat: 'dd/MM/yyyy'
	});

	testOutput(t, [
		`[${date}] foo [started]\n`,
		`[${date}] foo [completed]\n`
	]);

	await list.run();
});

test('task fails', async t => {
	t.plan(4);

	const list = new Listr([
		{
			title: 'foo',
			task: () => Promise.reject(new Error('Hello World'))
		}
	], {
		renderer,
		dateFormat: 'dd/MM/yyyy'
	});

	testOutput(t, [
		`[${date}] foo [started]\n`,
		`[${date}] foo [failed]\n`,
		`[${date}] → Hello World\n`
	]);

	try {
		await list.run();
	} catch (error) {
		t.is(error.message, 'Hello World');
	}
});

test('hide timestamp by setting dateFormat to false', async t => {
	const list = new Listr([
		{
			title: 'foo',
			task: () => Promise.resolve()
		}
	], {
		renderer,
		dateFormat: false
	});

	testOutput(t, [
		'foo [started]\n',
		'foo [completed]\n'
	]);

	await list.run();
});
