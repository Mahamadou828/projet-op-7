import React from 'react';
import { connect } from 'react-redux';
import UserDescription from '../components/UserDescription';
import FunctionPanel from '../components/FunctionPanel';
import Post from './Post';
import Loader from '../components/Loader';
import PopUp from './PopUp';
import TextField from '@material-ui/core/TextField';
import Filter from '../components/Filter';
import GetAllPost from '../actions/GetAllPost';
import PropTypes from 'prop-types';

class Home extends React.Component {
  componentDidMount() {
    this.props.GetAllPost();
  }

  render() {
    const filters = [
      { name: 'Post you like', func: '' },
      { name: 'Refresh Screen', func: '' },
      { name: 'Most Popular', func: '' },
    ];
    return (
      <div className="container">
        <section className="block-md container-flex">
          <FunctionPanel />
          <Loader />
        </section>
        <section className="block-sm">
          <div className="container-flex container-center">
            <section className="container-row">
              <TextField
                label="Post explorer"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                placeholder="Search"
                className="dark-input"
              />
              <Filter filters={filters}>Filter</Filter>
            </section>
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
  posts: PropTypes.array,
  GetAllPost: PropTypes.func,
  socket: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
