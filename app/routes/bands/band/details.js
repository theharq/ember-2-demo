import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('bands.band');
  },

  actions: {
    willTransition(transition) {
      if (this.get('controller.isEditing')) {
        let leave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
        if (leave) {
          this.set('controller.isEditing', false);
        } else {
          transition.abort();
        }
      }
    },

    save() {
      this.get('controller.model').save();
    }
  }
});
