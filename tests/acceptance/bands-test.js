import { test } from 'qunit';
import moduleForAcceptance from 'ember-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bands');

test('visiting /bands', (assert) => {
  visit('/bands');

  andThen(() => {
    assert.equal(currentURL(), '/bands');
  });
});


test('List bands', (assert) => {
  server.createList('band', 2);
  visit('/bands');
  andThen(() => {
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertLength(assert, '.band-link:contains("Band 0")', 1, 'First band');
    assertLength(assert, '.band-link:contains("Band 1")', 1, 'Second band');
  });
});

test('Create a band', (assert) => {
  visit('/bands');
  fillIn('.new-band', 'Blind Guardian');
  click('.new-band-button');

  andThen(() => {
    assertLength(assert, '.band-link', 1, 'All band links are rendered');
    assertTrimmedText(assert, '.band-link:last', 'Blind Guardian', 'Created band appears at the end of the list');
    assertElement(assert, '.nav a.active:contains("Songs")', 'The Songs tab is active');
  });
});

test('Create a new song in two steps', (assert) => {
  server.create('band', {name: 'Blind Guardian', description: ''});

  selectBand('Blind Guardian');
  click('a:contains("create one?")');
  fillIn('.new-song', 'Fly');
  submit('.new-song-form');

  andThen(() => {
    assertElement(assert, '.songs .song:contains("Fly")', 'Creates the song and displays it in the list');
  });
});

test('Sort songs in varios ways', (assert) => {

  let band = server.create('band', {name: 'Helloween', description: ''});
  server.create('song', {band_id: band.id, title: 'Title 1', rating: 5});
  server.create('song', {band_id: band.id, title: 'Title 2', rating: 4});
  server.create('song', {band_id: band.id, title: 'Title 3', rating: 4});
  server.create('song', {band_id: band.id, title: 'Title 4', rating: 5});

  selectBand('Helloween');
  andThen(() => {
    assert.equal(currentURL(), '/bands/1/songs');
    assertTrimmedText(assert, '.song:first', 'Title 1', "The first song is the highest ranked, first in the alphabet");
    assertTrimmedText(assert, '.song:last', 'Title 3', "The last song is the lowest ranked, last in the alphabet");
  });

  click('button.sort-title-desc');
  andThen(() => {
    assert.equal(currentURL(), '/bands/1/songs?sort=titleDesc');
    assertTrimmedText(assert, '.song:first', 'Title 4', "The first song is the one that is the last in the alphabet");
    assertTrimmedText(assert, '.song:last', 'Title 1', "The last song is the one that is the first in the alphabet");
  });

  click('button.sort-rating-asc');
  andThen(() => {
    assert.equal(currentURL(), '/bands/1/songs?sort=ratingAsc');
    assertTrimmedText(assert, '.song:first', 'Title 2', "The first song is the lowest ranked, first in the alphabet");
    assertTrimmedText(assert, '.song:last', 'Title 4', "The last song is the highest ranked, last in the alphabet");
  });
});


test('Search songs', (assert) => {

  let band = server.create('band', {name: 'Helloween', description: ''});
  server.create('song', {band_id: band.id, title: 'Eagle fly free', rating: 5});
  server.create('song', {band_id: band.id, title: 'I want out', rating: 4});
  server.create('song', {band_id: band.id, title: 'If I could fly', rating: 4});
  server.create('song', {band_id: band.id, title: 'Dr. Stein', rating: 5});

  visit('/bands/1');
  fillIn('.search-field', 'fly');

  andThen(() => {
    assertLength(assert, '.song', 2, "The songs matching the search term are displayed");
  });

  click('button.sort-title-desc');
  andThen(() => {
    assertTrimmedText(assert, '.song:first', 'If I could fly', "A matching song that comes later in the alphahet appears on top");
    assertTrimmedText(assert, '.song:last', 'Eagle fly free', "A matching song that comes sooner in the alphahet appears at the bottom ");
  });
});