import React, { Component } from 'react';

export default ChildComponent => {
  class ComposedComponent extends Component {

    

    render() {
      return <ChildComponent {...this.props}/>
    }
  }

  return ComposedComponent;
}