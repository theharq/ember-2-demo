import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
  },
  sortBy: 'ratingDesc',
  searchTerm: '',
  songsCount: computed.alias('model.length'),
  noSongs: computed.equal('songsCount', 0),
  songCreationStarted: false,
  canCreateSong: computed.or('songCreationStarted', 'songsCount'),
  isAddButtonDisabled: computed.empty('title'),
  sortedSongs: computed.sort('matchingSongs', 'sortProperties'),

  sortProperties: computed('sortBy', function(){
    const options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  matchingSongs: computed('model.@each.title', 'searchTerm', function() {
    let searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model').filter((song) => {
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  actions: {

    updateRating(params) {
      let { item: song, rating } = params;

      if (song.get('rating') === rating) {
        rating = 0; // Resetting rating if value is the same
      }

      song.set('rating', rating);
      song.save();
    },

    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    setSorting(option) {
      this.set('sortBy', option);
    }
  }
});
