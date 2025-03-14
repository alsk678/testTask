package core.pageobjects;

import core.elements.Button;
import core.elements.Label;
import core.elements.TextField;
import org.openqa.selenium.support.FindBy;

import static core.utils.Variables.PASSWORD;
import static core.utils.Variables.USERNAME;
import static org.testng.AssertJUnit.assertTrue;

public class LoginPage extends BasePage {

    @FindBy(xpath = "//*[normalize-space(text())='Login']")
    Label loginPageLabel;

    @FindBy(xpath = "//*[@placeholder='Enter username']")
    TextField usernameTextField;

    @FindBy(xpath = "//*[@placeholder='Password']")
    TextField passwordTextField;

    @FindBy(xpath = "//button[normalize-space(text())='Login']")
    Button loginButton;

    public LoginPage() {
        super();
    }

    public void verifyPageIsUpload() {
        assertTrue(verifyElementsAreDisplayed(loginButton, usernameTextField, passwordTextField,
                loginPageLabel));
    }

    public void typeUsername(String input) {
        verifyPageIsUpload();
        usernameTextField.typeIntoField(input);
    }

    public void typePassword(String input) {
        passwordTextField.typeIntoField(input);
    }

    public void clickLoginButton() {
        loginButton.clickOnButton();
    }

    public void performLogin() {
        typeUsername(USERNAME);
        typePassword(PASSWORD);
        clickLoginButton();
    }
}
