package core.pageobjects;

import core.browser.BrowserManager;
import core.decorator.CustomFieldDecorator;
import core.elements.BaseElement;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

import java.util.stream.Stream;

abstract class BasePage {

    WebDriver driver = BrowserManager.getInstance().getDriver();

    public BasePage() {
        PageFactory.initElements(new CustomFieldDecorator(driver), this);
    }

    public static boolean verifyElementsAreDisplayed(BaseElement... elements) {
        return Stream.of(elements).allMatch(BaseElement::isDisplayed);
    }
}
