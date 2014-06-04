NonMock - helps with function replacing in javascript specs and tests
=======
We don't need a mocks and stubs in javascript, just a little help with replacing existing functions and restoring them back.

```js
var monkey = {
  collectBananas: function() {
    console.log('Love Bananas!');
  }
}
module.exports = monkey;
```
```js
var nonmock = require('nonmock');
var monkey = require('./monkey');
var should = require('chai').should();

describe('monkey', function() {
  it('should love bananas', function(done) {
    nonmock.replace(console, 'log', function(message) {
      message.should.eql('Love Bananas!');
      done();
    });
    monkey.collectBananas();
  })
})

afterEach(function() {
  nonmock.restore();
})
```

Notice: `nonmock.restore()` will return back the original `console.log` once the test finishes

