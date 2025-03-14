package core.browser;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;

import static core.properties.Properties.CLIENT;
import static core.properties.Properties.DRIVER;
import static core.properties.Properties.DRIVER_PATH;
import static core.properties.Properties.FACTORY;


public class BrowserManager {

    private static BrowserManager instance;
    private static RemoteWebDriver driver;

    private BrowserManager() {}

    public static BrowserManager getInstance() {
        if (instance == null) {
            System.setProperty(FACTORY, CLIENT);
            System.setProperty(DRIVER, DRIVER_PATH);
            driver = new ChromeDriver();
            driver.manage().window().maximize();
            instance = new BrowserManager();
        }
        return instance;
    }

    public RemoteWebDriver getDriver() {
        return driver;
    }

    public void navigate(String url) {
        driver.get(url);
    }

    public void exit() {
        driver.quit();
        instance = null;
    }
}
