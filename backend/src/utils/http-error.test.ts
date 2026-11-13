import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {HttpError} from './http-error.ts';

describe('HttpError', () => {
  it('retains the status, message and optional details', () => {
    const error = new HttpError(404, 'Not Found', 'Missing room');
    assert.ok(error instanceof Error);
    assert.equal(error.code, 404);
    assert.equal(error.message, 'Not Found');
    assert.equal(error.customDetails, 'Missing room');
  });

  it('defaults details to an empty string', () => {
    assert.equal(new HttpError(500, 'Error').customDetails, '');
  });
});
