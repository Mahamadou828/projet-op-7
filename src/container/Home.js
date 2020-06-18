import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor() {
    super();
  }
  render() {
    return;
  }
}
function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
