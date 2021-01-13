import { browser, ExpectedConditions as ec, promise, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MyEventComponentsPage, MyEventDeleteDialog, MyEventUpdatePage } from './my-event.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('MyEvent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let myEventComponentsPage: MyEventComponentsPage;
  let myEventUpdatePage: MyEventUpdatePage;
  let myEventDeleteDialog: MyEventDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MyEvents', async () => {
    await navBarPage.goToEntity('my-event');
    myEventComponentsPage = new MyEventComponentsPage();
    await browser.wait(ec.visibilityOf(myEventComponentsPage.title), 5000);
    expect(await myEventComponentsPage.getTitle()).to.eq('eventAdminApp.myEvent.home.title');
    await browser.wait(ec.or(ec.visibilityOf(myEventComponentsPage.entities), ec.visibilityOf(myEventComponentsPage.noResult)), 1000);
  });

  it('should load create MyEvent page', async () => {
    await myEventComponentsPage.clickOnCreateButton();
    myEventUpdatePage = new MyEventUpdatePage();
    expect(await myEventUpdatePage.getPageTitle()).to.eq('eventAdminApp.myEvent.home.createOrEditLabel');
    await myEventUpdatePage.cancel();
  });

  it('should create and save MyEvents', async () => {
    const nbButtonsBeforeCreate = await myEventComponentsPage.countDeleteButtons();

    await myEventComponentsPage.clickOnCreateButton();

    await promise.all([
      myEventUpdatePage.setTitleInput('title'),
      myEventUpdatePage.setDescriptionInput('description'),
      myEventUpdatePage.setEventStartInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      myEventUpdatePage.setEventEndInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      myEventUpdatePage.setLocationInput('location')
    ]);

    expect(await myEventUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await myEventUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    const selectedFullDay = myEventUpdatePage.getFullDayInput();
    if (await selectedFullDay.isSelected()) {
      await myEventUpdatePage.getFullDayInput().click();
      expect(await myEventUpdatePage.getFullDayInput().isSelected(), 'Expected fullDay not to be selected').to.be.false;
    } else {
      await myEventUpdatePage.getFullDayInput().click();
      expect(await myEventUpdatePage.getFullDayInput().isSelected(), 'Expected fullDay to be selected').to.be.true;
    }
    expect(await myEventUpdatePage.getEventStartInput()).to.contain(
      '2001-01-01T02:30',
      'Expected eventStart value to be equals to 2000-12-31'
    );
    expect(await myEventUpdatePage.getEventEndInput()).to.contain('2001-01-01T02:30', 'Expected eventEnd value to be equals to 2000-12-31');
    expect(await myEventUpdatePage.getLocationInput()).to.eq('location', 'Expected Location value to be equals to location');

    await myEventUpdatePage.save();
    expect(await myEventUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await myEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MyEvent', async () => {
    const nbButtonsBeforeDelete = await myEventComponentsPage.countDeleteButtons();
    await myEventComponentsPage.clickOnLastDeleteButton();

    myEventDeleteDialog = new MyEventDeleteDialog();
    expect(await myEventDeleteDialog.getDialogTitle()).to.eq('eventAdminApp.myEvent.delete.question');
    await myEventDeleteDialog.clickOnConfirmButton();

    expect(await myEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
