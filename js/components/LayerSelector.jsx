import React from 'react';
import ol from 'openlayers';
import LayerStore from '../stores/LayerStore.js';
import LayerActions from '../actions/LayerActions.js';

/**
 * A combobox to select a layer.
 */
export default class LayerSelector extends React.Component {
  constructor(props) {
    super(props);
    LayerStore.bindMap(this.props.map);
  }
  componentWillMount() {
    LayerStore.addChangeListener(this._onChange.bind(this));
    this._onChange();
  }
  componentDidMount() {
    var select = React.findDOMNode(this.refs.layerSelect);
    var layer = LayerStore.findLayer(select.value);
    LayerActions.selectLayer(layer, this);
  }
  getLayer() {
    var select = React.findDOMNode(this.refs.layerSelect);
    return LayerStore.findLayer(select.value);
  }
  _onChange() {
    this.setState(LayerStore.getState());
  }
  _onItemChange(evt) {
    var layer = LayerStore.findLayer(evt.target.value);
    LayerActions.selectLayer(layer, this);
  }
  render() {
    var me = this;
    var selectItems = this.state.layers.map(function(lyr, idx) {
      var title = lyr.get('title'), id = lyr.get('id');
      if (!me.props.filter || me.props.filter(lyr) === true) {
        return (
          <option value={id} key={idx}>{title}</option>
        );
      }
    });
    return (
      <select ref='layerSelect' defaultValue={this.props.value} className='form-control' onChange={this._onItemChange.bind(this)}>
        {selectItems}
      </select>
    );
  }
}

LayerSelector.propTypes = {
  /**
   * The map from which to extract the layers.
   */
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  /**
   * A filter function to filter out some of the layers by returning false.
   */
  filter: React.PropTypes.func,
  /**
   * The default value of the layer selector, i.e. the layer to select by default.
   */
  value: React.PropTypes.string
};
