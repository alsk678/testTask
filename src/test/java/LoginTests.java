import core.testng.BaseTest;
import org.testng.annotations.Test;

import static core.utils.Variables.PASSWORD;
import static core.utils.Variables.USERNAME;

public class LoginTests extends BaseTest {

    @Test
    public void testLoginAndLogoutFlow() {
        loginPage.typeUsername(USERNAME);
        loginPage.typePassword(PASSWORD);
        loginPage.clickLoginButton();
        homePage.clickLogoutButton();
        loginPage.verifyPageIsUpload();
    }
}
