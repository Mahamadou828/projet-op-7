import React from 'react';
import { connect } from 'react-redux';
import UserDescription from '../components/UserDescription';
import FunctionPanel from '../components/FunctionPanel';
import Post from './Post';
import Loader from '../components/Loader';
import PopUp from './PopUp';
import TextField from '@material-ui/core/TextField';
import FilterMenu from '../components/FilterMenu';

class Home extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="container">
        <section className="block-md container-flex">
          <FunctionPanel />
          <Loader />
        </section>
        <section className="block-sm">
          <div className="container-flex">
            <section className="container-row">
              <TextField
                label="Post explorer"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                placeholder="Search"
              />
              <FilterMenu />
            </section>
            <section className="container-flex"></section>
          </div>
          <Post />
        </section>
        <section className="block-md container-flex">
          <UserDescription />
        </section>
        <PopUp />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
