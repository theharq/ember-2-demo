import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title(i) { return `Title ${i}`; },
  rating() { return faker.list.random(1, 2, 3, 4, 5)(); }
});