const { UPDATE_POST } = require('../constant');

const initialState = {
  open: false,
  post: {},
};

export default function UpdatePostReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_POST:
      const { title, description, image, id } = action.payload.post;

      return {
        open: action.payload.open,
        post: {
          description: description === null ? '' : description,
          image: image === null ? '' : image,
          title: title === null ? '' : title,
          id,
        },
      };
    default:
      return state;
  }
}
