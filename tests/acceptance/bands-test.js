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
  visit('/');
  click('.band-link:contains("Blind Guardian")');
  click('a:contains("create one?")');
  fillIn('.new-song', 'Fly');
  triggerEvent('.new-song-form', 'submit');
  andThen(() => {
    assertElement(assert, '.songs .song:contains("Fly")', 'Creates the song and displays it in the list');
  });
});