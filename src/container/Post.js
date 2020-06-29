import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Post extends PureComponent {
  render() {
    return <p>je</p>;
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, null)(Post);
