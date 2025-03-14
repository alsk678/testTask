package core.elements;

import org.openqa.selenium.WebElement;


public class TextField extends BaseElement {

    public TextField(WebElement element, String name) {
        super(element, name);
    }

    public void typeIntoField(Object value) {
        String textValue = String.valueOf(value);
        logger.info(String.format("Type into '%s' with value: %s", getName(), textValue));
        element.sendKeys(textValue);
    }
}

