import { browser, by, element, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToPage(uri: string): Promise<unknown> {
    return browser.get(uri) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root nav.navbar a.navbar-brand')).getText() as Promise<string>;
  }

  getPizzaList(): ElementArrayFinder {
    return element.all(by.css('app-root app-pizza-list div.card-deck'));
  }
}
