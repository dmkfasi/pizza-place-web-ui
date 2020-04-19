import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Pizza Place Web UI', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('The best Pizza in Town!');
  });

  it('should display non empty Pizza list', () => {
    page.navigateToPage('/pizza');
    let pizzaList = page.getPizzaList();
    expect(pizzaList.count()).toBeGreaterThan(0);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
