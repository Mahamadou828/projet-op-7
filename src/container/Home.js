import React from 'react';
import { connect } from 'react-redux';
import UserDescription from '../components/UserDescription';
import FunctionPanel from '../components/FunctionPanel';
import Post from './Post';
import Loader from '../components/Loader';
import PopUp from './PopUp';
import Filter from '../components/Filter';
import GetAllPost from '../actions/GetAllPost';
import PropTypes from 'prop-types';
import SearchInput from '../components/SearchInput';

class Home extends React.Component {
  state = {
    filter: false,
    filteredContent: null,
  };

  componentDidMount() {
    this.props.GetAllPost();
  }

  filteredArray = (array) => {
    console.log(array);
    this.setState({
      filter: true,
      filteredContent: array,
    });
  };

  closeFilter = () => {
    this.setState({
      filter: false,
      filteredContent: null,
    });
  };

  render() {
    const filters = [
      { name: 'Post you like', func: this.props.GetAllPost },
      { name: 'Refresh Screen', func: this.props.GetAllPost },
      { name: 'Most Popular', func: '' },
    ];

    const filterKey = ['description', 'title'];

    let posts = null;

    if (this.state.filter) {
      posts = this.state.filteredContent;
    } else {
      posts = this.props.posts;
    }

    return (
      <div className="container">
        <section className="block-md container-flex">
          <FunctionPanel />
          <Loader />
        </section>
        <section className="block-sm">
          <div className="container-flex container-center">
            <section className="container-row">
              <SearchInput
                placeHolder="Post Explorer"
                className="home-search"
                ArrayToFilter={this.props.posts}
                keyForFilter={filterKey}
                setFilteredArray={this.filteredArray}
                closeFilter={this.closeFilter}
              />
              <Filter filters={filters}>Filter</Filter>
            </section>
          </div>
          {posts.map((post) => (
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
