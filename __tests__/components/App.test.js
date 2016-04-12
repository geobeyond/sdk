/* global afterEach, beforeEach, describe, it */

var React = require('react');
var ReactDOM = require('react-dom');
var assert = require('chai').assert;
var raf = require('raf');
raf.polyfill();
var ol = require('openlayers');

var App = require('../../js/components/App.js');

class MyApp extends App {
  render() {
    return (<div id='map' ref='map'></div>);
  }
}

describe('App', function() {
  var map, layer;

  beforeEach(function(done) {
    layer = new ol.layer.Vector({
      source: new ol.source.Vector({})
    });
    map = new ol.Map({
      layers: [layer],
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    });
    map.once('postrender', function() {
      done();
    });
  });

  afterEach(function() {
  });

  it('sets the target for the map', function() {
    var container = document.createElement('div');
    ReactDOM.render((
      <MyApp map={map} />
    ), container);
    assert.equal(map.getTarget().getAttribute('id'), 'map');
    ReactDOM.unmountComponentAtNode(container);
  });

});
