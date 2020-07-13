import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import CardMedia from '@material-ui/core/CardMedia';

function MediaComponent(props) {
  const determinateFileType = (file) => {
    const IMAGE_TYPE = ['jpg', 'jpeg', 'png'];
    const VIDEO_TYPE = ['mov', 'mp4'];

    for (let i = 0; i < IMAGE_TYPE.length; i++) {
      if (file.includes(IMAGE_TYPE[i])) {
        return 'image';
      }
    }

    for (let i = 0; i < VIDEO_TYPE.length; i++) {
      if (file.includes(VIDEO_TYPE[i])) {
        return 'video';
      }
    }

    return null;
  };
  const { image } = props.post;
  if (typeof image === 'string') {
    if (image.length > 0) {
      const fileType = determinateFileType(image);

      switch (fileType) {
        case 'image': {
          return (
            <CardMedia
              className="card-media"
              image={image}
              title="Post image"
            />
          );
          break;
        }
        case 'video': {
          return (
            <ReactPlayer className="card-video" url={image} controls={true} />
          );
          return null;
          break;
        }
        default: {
          return null;
        }
      }
    } else return null;
  } else return null;
}

MediaComponent.propTypes = {
  post: PropTypes.object,
};

export default MediaComponent;
