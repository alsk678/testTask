package core.testng;


import core.browser.BrowserManager;
import core.logger.TestLogger;
import core.pageobjects.ActivityPage;
import core.pageobjects.AddNewItemPage;
import core.pageobjects.HomePage;
import core.pageobjects.LoginPage;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;

import java.lang.reflect.Method;

import static core.properties.Properties.BASE_URL;

public class BaseTest {

    private static final TestLogger logger = TestLogger.getInstance();
    private static BrowserManager browser = BrowserManager.getInstance();
    Class<? extends BaseTest> currentClass = this.getClass();
    public static LoginPage loginPage;
    public static HomePage homePage;
    public static ActivityPage activityPage;
    public static AddNewItemPage addNewItemPage;

    @BeforeTest
    public void beforeTest() {
        logger.logClassName(currentClass.getName());
    }

    @BeforeMethod
    public void beforeMethod(Method method) {
        browser = BrowserManager.getInstance();
        browser.navigate(BASE_URL);
        initPages();
        logger.logTestName(method.getName());
    }

    @AfterTest
    public void afterTest() {
        logger.logClassEnd(currentClass.getName());
    }

    @AfterMethod
    public void afterMethod(Method method) {
        logger.logTestEnd(method.getName());
        browser.exit();
    }

    public void initPages() {
        loginPage = new LoginPage();
        homePage = new HomePage();
        activityPage = new ActivityPage();
        addNewItemPage = new AddNewItemPage();
    }
}
