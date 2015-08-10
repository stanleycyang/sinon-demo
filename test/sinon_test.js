var code = require('../lib/code'),
    sinon = require('sinon'),
    mocha = require('mocha'),
    expect = require('chai').expect,
    assert = require('chai').assert;

describe('once', function(){

    it('calls the original function', function(){
        var spy = sinon.spy();
        var proxy = code.once(spy);

        proxy();

        expect(spy.called).to.be.true;
    });

    it('returns the return value from the original function', function(){
        var stub = sinon.stub().returns(42);
        var proxy = code.once(stub);

        expect(proxy()).to.equal(42);
    });

    it('returns the return value from the original function', function(){
        var myAPI = {method: function(){}};
        var mock = sinon.mock(myAPI);
        mock.expects('method').once().returns(42);

        var proxy = code.once(myAPI.method);

        expect(proxy()).to.equal(42);
        mock.verify();
    });
    
});

describe('throttle', function(){
    var clock;
    before(function(){
        clock = sinon.useFakeTimers();
    });

    after(function(){
        clock.restore();
    });

    it('calls callback after 100ms', function(){
        var callback = sinon.spy();
        var throttled = code.throttle(callback);

        throttled();

        clock.tick(99);
        assert(callback.notCalled);

        clock.tick(1);
        assert(callback.calledOnce);
    });
});

/*describe('getTodos', function(){*/
    //var xhr, requests;

    //before(function(){
        //xhr = sinon.useFakeXMLHttpRequest();
        //requests = [];
        //xhr.onCreate = function(request){requests.push(request);}
    //});

    //after(function(){
        //// clean up when tampering with globals
        //xhr.restore();
    //});

    //it('makes a GET request for todo items', function(){
        //code.getTodos(42, sinon.spy());
        //expect(requests.length).to.equal(1);
        //expect(requests[0].url).to.equal('/todo/42/items');
    //});
//});










