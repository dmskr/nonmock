NonMock ![CircleCI Build Status](https://circleci.com/gh/dmskr/nonmock.png?circle-token=a278c180ad14288c9dbb41df4da32a673257422f)
=======
We don't need a mocks and stubs in javascript, just a little help with replacing existing functions and restoring them back.
NonMock helps with function replacing in javascript specs and tests

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

