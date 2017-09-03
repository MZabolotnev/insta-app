import { InstaAppPage } from './app.po';

describe('insta-app App', () => {
  let page: InstaAppPage;

  beforeEach(() => {
    page = new InstaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
