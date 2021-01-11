import { element, by, ElementFinder } from 'protractor';

export class MyEventComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-my-event div table .btn-danger'));
  title = element.all(by.css('jhi-my-event div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class MyEventUpdatePage {
  pageTitle = element(by.id('jhi-my-event-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('field_description'));
  fullDayInput = element(by.id('field_fullDay'));
  eventStartInput = element(by.id('field_eventStart'));
  eventEndInput = element(by.id('field_eventEnd'));
  locationInput = element(by.id('field_location'));
  eventImageInput = element(by.id('file_eventImage'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  getFullDayInput(): ElementFinder {
    return this.fullDayInput;
  }

  async setEventStartInput(eventStart: string): Promise<void> {
    await this.eventStartInput.sendKeys(eventStart);
  }

  async getEventStartInput(): Promise<string> {
    return await this.eventStartInput.getAttribute('value');
  }

  async setEventEndInput(eventEnd: string): Promise<void> {
    await this.eventEndInput.sendKeys(eventEnd);
  }

  async getEventEndInput(): Promise<string> {
    return await this.eventEndInput.getAttribute('value');
  }

  async setLocationInput(location: string): Promise<void> {
    await this.locationInput.sendKeys(location);
  }

  async getLocationInput(): Promise<string> {
    return await this.locationInput.getAttribute('value');
  }

  async setEventImageInput(eventImage: string): Promise<void> {
    await this.eventImageInput.sendKeys(eventImage);
  }

  async getEventImageInput(): Promise<string> {
    return await this.eventImageInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MyEventDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-myEvent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-myEvent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
