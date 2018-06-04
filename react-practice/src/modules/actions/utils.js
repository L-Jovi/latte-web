import _ from 'lodash';

export default {
  bindActions: (self, actions) => {
    const binding = (self, actions, binding) => {
      if (_.isArray(actions) === true) {
        return _.map(actions, (action) => {
          return binding(self, action, binding);
        });
      }

      if (_.isPlainObject(actions) === true) {
        return _.mapValues(actions, (action) => {
          return binding(self, action, binding);
        });
      }

      if (_.isFunction(actions) === true) {
        return actions.bind(self);
      }
    };

    return binding(self, actions, binding);
  },
};
