package core.elements;

import core.logger.TestLogger;
import org.openqa.selenium.WebElement;


public class BaseElement {
    public static final TestLogger logger = TestLogger.getInstance();
    public WebElement element;
    String name;

    public BaseElement(WebElement element, String name) {
        this.element = element;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public boolean isDisplayed() {
        return element.isDisplayed();
    }
}
