package core.utils.waiter;

import core.browser.BrowserManager;
import core.elements.BaseElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static core.properties.Properties.DEFAULT_TIMEOUT;

public class Waiter {

    public static void waitForVisibility(BaseElement element) {
        new WebDriverWait(BrowserManager.getInstance().getDriver(), Duration.ofSeconds(DEFAULT_TIMEOUT))
                .until(ExpectedConditions.visibilityOf(element.element));
    }
}
