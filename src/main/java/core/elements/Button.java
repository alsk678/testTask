package core.elements;

import org.openqa.selenium.WebElement;


public class Button extends BaseElement {

    public Button(WebElement element, String name) {
        super(element, name);
    }

    public void clickOnButton() {
        logger.info(String.format("Click on '%s' button", getName()));
        element.click();
    }
}
