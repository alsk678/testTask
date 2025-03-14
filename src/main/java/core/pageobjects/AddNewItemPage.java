package core.pageobjects;

import core.elements.Button;
import core.elements.Dropdown;
import core.elements.TextField;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;

public class AddNewItemPage extends BasePage {

    @FindBy(xpath = "//*[@placeholder='Enter title']")
    TextField titleTextField;

    @FindBy(xpath = "//*[@placeholder='Enter description']")
    TextField descriptionField;

    @FindBy(xpath = "//*[@placeholder='Enter estimate']")
    TextField estimateField;

    @FindBy(xpath = "//*[option[normalize-space(text())='Select Priority']]")
    Dropdown priorityDropdown;

    @FindBy(xpath = "//*[@placeholder='Enter image URL']")
    TextField imageUrlTextField;

    @FindBy(xpath = "//*[normalize-space(text())='Add Item']")
    Button addItemButton;

    public AddNewItemPage() {
        super();
    }

    public void typeIntoTitle(String input) {
        titleTextField.typeIntoField(input);
    }

    public void typeIntoDescription(String input) {
        descriptionField.typeIntoField(input);
    }

    public void typeIntoEstimate(Object input) {
        estimateField.typeIntoField(input);
    }

    public void chooseMediumDropdownOption() {
        new Select(priorityDropdown.element).selectByValue("Medium");
    }

    public void typeIntoImageUrl(String input) {
        imageUrlTextField.typeIntoField(input);
    }

    public void clickAddItemButton() {
        addItemButton.clickOnButton();
    }
}
