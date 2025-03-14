package core.pageobjects;

import core.browser.BrowserManager;
import core.elements.Button;
import core.elements.table.Row;
import org.openqa.selenium.By;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public class ActivityPage extends BasePage {

    @FindBy(xpath = "//tbody/tr")
    List<Row> rows;

    @FindBy(xpath = "//a[contains(normalize-space(.), 'Home')]")
    Button homeButton;

    String cellXpath = "//td[normalize-space(text())='%s']";

    public ActivityPage() {
        super();
    }

    public int getRowsNumber() {
        return rows.size();
    }

    public boolean isAddedNewTaskCellDisplayed() {
        return driver.findElement(By.xpath(
                String.format(cellXpath, "Added new task"))).isDisplayed();
    }

    public boolean isCellWithTextExist(String input) {
        return driver.findElement(By.xpath(
                String.format(cellXpath, input))).isDisplayed();
    }

    public void clickHomeButton() {
        homeButton.clickOnButton();
    }
}
