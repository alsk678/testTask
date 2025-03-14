import core.testng.BaseTest;
import org.testng.annotations.Test;

import static core.utils.Variables.*;
import static org.testng.Assert.assertEquals;
import static org.testng.AssertJUnit.assertTrue;

public class AddActionTests extends BaseTest {

    @Test
    public void testAddAction() {
        loginPage.performLogin();
        homePage.clickActivityButton();
        int rowCountBefore = activityPage.getRowsNumber();
        activityPage.clickHomeButton();
        homePage.clickActionsButton();
        homePage.clickAddButton();
        addNewItemPage.typeIntoTitle(TITLE);
        addNewItemPage.typeIntoDescription(DESCRIPTION);
        addNewItemPage.typeIntoEstimate(ESTIMATION);
        addNewItemPage.chooseMediumDropdownOption();
        addNewItemPage.typeIntoImageUrl(URL);
        addNewItemPage.clickAddItemButton();
        homePage.clickActivityButton();
        assertEquals(rowCountBefore + 1, activityPage.getRowsNumber(), "Rows count didn't change");
        assertTrue("'Added New Task' cell isn't displayed", activityPage.isAddedNewTaskCellDisplayed());
        assertTrue("Cell with required title isn't displayed", activityPage.isCellWithTextExist(TITLE));
    }
}
