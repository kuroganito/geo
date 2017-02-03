import { GeoPage } from './app.po';

describe('geo App', function() {
  let page: GeoPage;

  beforeEach(() => {
    page = new GeoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
