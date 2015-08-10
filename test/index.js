var sinon = require('sinon'),
    mocha = require('mocha'),
    assert = require('chai').assert,
    expect = require('chai').expect;

var Person = {
    sayHi: function(saying){
        return "hey, " + saying;
    }
}

describe('No sinon - just how it works normally', function(){
    it('just printing', function(){
        expect(Person.sayHi('Stanley')).to.equal('hey, Stanley');
    });
});

describe('Replace existing method', function(){
    describe('by stub', function(){
        var newHi = function(say){
            return say + ' from new method';
        };

        it('replaces method with newHi', sinon.test(function(){
            this.stub(Person, 'sayHi', newHi);
            expect(Person.sayHi('Call')).to.equal('Call from new method');
        })); 
    });
});

describe('Replace return', function(){
    describe('From Person.sayHi', function(){
        // Stubbing
        it('says hola', sinon.test(function(){
           this.stub(Person, 'sayHi').returns('hola'); 
           expect(Person.sayHi('Stanley')).to.equal('hola');
        }));

        // Stubbing since behaviors are replaced
        it('says bonjour', sinon.test(function(){
            this.stub(Person, 'sayHi').returns('bonjour');
            expect(Person.sayHi()).to.equal('bonjour');
        }));
    });
});

describe('Spy on existing method', function(){
    it('shall check argument', sinon.test(function(){
      // Mocking since we are testing the expected behavior
      sinon.spy(Person, 'sayHi');
      var said = Person.sayHi('again'); 

      assert(Person.sayHi.called);
      assert(Person.sayHi.calledOnce);
      expect(Person.sayHi.calledTwice).to.be.false;
      expect(Person.sayHi.callCount).to.equal(1);

      Person.sayHi('Stanley');

      expect(Person.sayHi.getCall(0).args[0]).to.equal('again');
      expect(Person.sayHi.getCall(1).args[0]).to.equal('Stanley');

      // Remove spy

      Person.sayHi.restore();


    }));
});
