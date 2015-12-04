import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('band');
  },

  actions: {
    createBand(){
      var name = this.get('controller').get('name');
      alert(name);
      this.get('controller').set('name', '');
    }
  }
});
