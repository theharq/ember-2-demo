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
    assert.equal(find('.band-link').length, 2, "All band links are rendered");
    assert.equal(find('.band-link:contains("Band 0")').length, 1,"First band");
    assert.equal(find('.band-link:contains("Band 1")').length, 1, "Second band");
  });
});

test('Create a band', (assert) => {
  visit('/bands');
  fillIn('.new-band', 'Blind Guardian');
  click('.new-band-button');

  andThen(() => {
    assert.equal(find('.band-link').length, 1, 'All band links are rendered');
    assert.equal(find('.band-link:last').text().trim(), 'Blind Guardian', 'Created band appears at the end of the list');
    assert.equal(find('.nav a.active:contains("Songs")').length, 1, 'The Songs tab is active');
  });
});

test('Create a new song in two steps', (assert) => {
  server.create('band', {name: 'Blind Guardian', description: ''});
  visit('/');
  click('.band-link:contains("Blind Guardian")');
  click('a:contains("create one?")');
  fillIn('.new-song', 'Fly');
  triggerEvent('.new-song-form', 'submit');
  andThen(() => {
    assert.equal(find('.songs .song:contains("Fly")').length, 1, "Creates the song and displays it in the list");
  });
});