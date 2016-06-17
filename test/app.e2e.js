describe('app', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('has a title', () => {
    expect(browser.getTitle()).toEqual('Build Angular 2 app with Babel');
  });

  it('shows a link to the GitHub repo', () => {
    element(by.linkText('GitHub')).click();

    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl())
      .toEqual('https://github.com/shuhei/babel-angular2-app');
    browser.ignoreSynchronization = false;
  });

  it('switches contents by routing', () => {
    expect(element(by.css('hello')).getText()).toEqual('Hello, Angular 2!');
    expect(browser.getCurrentUrl()).toMatch(/\/#\/$/);

    element(by.linkText('Ciao')).click();
    expect(element(by.css('ciao')).getText()).toEqual('Ciao, ng2!');
    expect(browser.getCurrentUrl()).toMatch(/\/#\/ciao\/ng2$/);

    element(by.linkText('Hello')).click();
    expect(element(by.css('hello')).getText()).toEqual('Hello, Angular 2!');
    expect(browser.getCurrentUrl()).toMatch(/\/#\/$/);
  });
});
