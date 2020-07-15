import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PostBadgeGroup from '../components/PostBadgeGroup';
import { GetAppreciation } from '../graphql/PostAppreciationQuery';
import { Query } from 'react-apollo';
import ErrorAction from '../actions/ErrorAction';
import SendAppreciation from '../function/SendAppreciation';
import PropTypes from 'prop-types';
import Filter from '../components/Filter';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SetUpdatingModeAction from '../actions/SetUpdatingModeAction';
import DeletePostAction from '../actions/DeletePostAction';
import MediaComponent from '../components/MediaComponent';

class Post extends PureComponent {
  setPostAppreciation = (like, dislike) => {
    const request = {
      UserId: this.props.UserId,
      PostId: this.props.post.id,
      like,
      dislike,
    };

    SendAppreciation(request)
      .then((respond) => {
        if (!respond) {
          this.props.ErrorAction(true, 'internal Server Error');
        }
      })
      .catch(() => {
        this.props.ErrorAction(true, 'internal Server Error');
      });
  };

  /**
   *
   * @param {String} file
   */

  generateFilterOption = () => {
    const post = this.props.post,
      open = true;
    const filters = [
      {
        name: 'update',
        func: this.props.SetUpdatingModeAction,
        funcParam: { post, open },
      },
      {
        name: 'delete',
        func: this.props.DeletePostAction,
        funcParam: parseInt(post.id),
      },
    ];

    return (
      <Filter filters={filters}>
        <MoreVertIcon />{' '}
      </Filter>
    );
  };

  generateTitle = () => {
    const { title } = this.props.post;
    if (typeof title === 'string') {
      if (title.length > 0)
        return (
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h2"
              className="card-title"
            >
              {title}
            </Typography>
          </CardContent>
        );
      else return null;
    } else return null;
  };

  render() {
    const {
      users,
      numLike,
      numDislike,
      id,
      content,
      description,
    } = this.props.post;
    const UserId = this.props.UserId,
      PostId = parseInt(id);
    return (
      <article>
        <Card className="card">
          <div className="card-header">
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className="card-avatar">
                  <img src={users.photo} alt="..." />
                </Avatar>
              }
              title={`${users.name} ${users.surname}`}
            />

            {users.id === UserId ? this.generateFilterOption() : null}
          </div>

          <MediaComponent post={this.props.post} />
          {this.generateTitle()}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${description.slice(0, 200)}${
                description.length > 200 ? '...' : null
              }`}
            </Typography>
          </CardContent>
          <Query query={GetAppreciation} variables={{ UserId, PostId }}>
            {({ loading, error, data }) => {
              if (!loading) {
                return (
                  <PostBadgeGroup
                    description={description}
                    likeNumber={{ numLike, numDislike }}
                    content={content}
                    appreciate={data.QueryGetUserAppreciationOfAnPost}
                    setPostAppreciation={this.setPostAppreciation}
                    PostId={PostId}
                  />
                );
              } else if (error) {
                this.props.ErrorAction(true, error.message);
              } else {
                return null;
              }
            }}
          </Query>
        </Card>
      </article>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  UserId: PropTypes.string,
  ErrorAction: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    UserId: state.Access.accessData.userInfo.id,
  };
};

const mapDispacthToProps = {
  ErrorAction,
  SetUpdatingModeAction,
  DeletePostAction,
};
export default connect(mapStateToProps, mapDispacthToProps)(Post);
