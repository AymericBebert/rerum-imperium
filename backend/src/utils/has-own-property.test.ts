import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {hasOwnProperty} from './has-own-property.ts';

describe('hasOwnProperty', () => {
  it('recognizes own properties even when their value is undefined', () => {
    assert.equal(hasOwnProperty({value: undefined}, 'value'), true);
  });

  it('rejects inherited or missing properties and non-objects', () => {
    const object: object = Object.create({inherited: true}) as object;
    assert.equal(hasOwnProperty(object, 'inherited'), false);
    assert.equal(hasOwnProperty(object, 'missing'), false);
    assert.equal(hasOwnProperty(null, 'value'), false);
    assert.equal(hasOwnProperty('value', 'length'), false);
  });

  it('supports objects without a prototype and symbol keys', () => {
    const key = Symbol('key');
    const object: object = Object.assign(Object.create(null) as object, {[key]: true});
    assert.equal(hasOwnProperty(object, key), true);
  });
});
