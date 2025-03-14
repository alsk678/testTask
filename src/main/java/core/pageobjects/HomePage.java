package core.pageobjects;

import core.elements.Button;
import core.elements.Task;
import org.openqa.selenium.support.FindBy;

import java.util.List;

import static core.utils.waiter.Waiter.waitForVisibility;

public class HomePage extends BasePage {

    @FindBy(xpath = "//button[normalize-space(text())='Logout']")
    Button logoutButton;

    @FindBy(xpath = "//a[normalize-space(text())='Actions']")
    Button actionsButton;

    @FindBy(xpath = "//a[normalize-space(text())='Add']")
    Button addButton;

    @FindBy(xpath = "//a[normalize-space(text())='Activity']")
    Button activityButton;

    @FindBy(xpath = "//div[contains(@class, 'custom-card')]")
    List<Task> taskElement;

    @FindBy(xpath = "//button[normalize-space(text())='Done']")
    List<Button> doneButton;

    public HomePage() {
        super();
    }

    public void clickLogoutButton() {
        waitForVisibility(logoutButton);
        logoutButton.clickOnButton();
    }

    public void clickActionsButton() {
        waitForVisibility(actionsButton);
        actionsButton.clickOnButton();
    }

    public void clickAddButton() {
        addButton.clickOnButton();
    }

    public void clickActivityButton() {
        waitForVisibility(activityButton);
        activityButton.clickOnButton();
    }

    public int getTaskNumber() {
        waitForVisibility(logoutButton);
        return taskElement.size();
    }

    public void clickFirstDoneButton() {
        doneButton.get(0).clickOnButton();
    }
}
