import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('band');
  },

  actions: {
    createBand(){
      let bandName = this.get('controller').get('name');
      this.store.createRecord('band',{name: bandName}).save().then((band) => {
        this.set('controller.name', '');
        this.transitionTo('bands.band.songs', band);
      });
    }
  }
});
