import Store from '../store/notifications';

export const initialState = Store;

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'NOTIFICATIONS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'NOTIFICATIONS_REPLACE': {
      let notifications = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        notifications = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        notifications,
      };
    }
    default:
      return state;
  }
}
