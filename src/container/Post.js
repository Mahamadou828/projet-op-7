import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PostBadgeGroup from '../components/PostBadgeGroup';
import PropsType from 'prop-types';
import { GetAppreciation } from '../graphql/PostAppreciationQuery';
import { Query } from 'react-apollo';
import ErrorAction from '../actions/ErrorAction';

class Post extends PureComponent {
  setPostAppreciation() {}

  render() {
    const {
      title,
      users,
      numLike,
      numDislike,
      image,
      id,
      content,
      description,
    } = this.props.post;
    const UserId = this.props.UserId,
      PostId = parseInt(id);

    return (
      <article>
        <Card className="card">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className="card-avatar">
                <img src={users.photo} alt="..." />
              </Avatar>
            }
            title={`${users.name} ${users.surname}`}
          />
          <CardMedia className="card-media" image="../image/banner-small.jpg" />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="h3">
              {title}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${description.slice(0, 75)}${
                description.length > 75 ? '...' : null
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
                  />
                );
              } else if (error) {
                this.props.ErrorAction(true, 'internal Serve Error');
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
  post: PropsType.object,
};
const mapStateToProps = (state) => {
  return {
    UserId: state.Access.accessData.userInfo.id,
  };
};

const mapDispacthToProps = {
  ErrorAction,
};
export default connect(mapStateToProps, null)(Post);
