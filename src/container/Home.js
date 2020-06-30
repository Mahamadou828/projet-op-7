import React from 'react';
import { connect } from 'react-redux';
import UserDescription from '../components/UserDescription';
import FunctionPanel from '../components/FunctionPanel';
import Post from './Post';
import Loader from '../components/Loader';
import PopUp from './PopUp';
import TextField from '@material-ui/core/TextField';
import FilterMenu from '../components/FilterMenu';
import GetAllPost from '../actions/GetAllPost';
import PropsTypes from 'prop-types';

class Home extends React.Component {
  componentDidMount() {
    this.props.GetAllPost();
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
          {this.props.posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
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
  return {
    posts: state.Posts.posts,
  };
}

const mapDispatchToProps = {
  GetAllPost,
};

Home.propTypes = {
  posts: PropsTypes.array,
  GetAllPost: PropsTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
