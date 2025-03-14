import core.testng.BaseTest;
import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;


public class TaskNumberChangingTests extends BaseTest {

    @Test
    public void taskNumberChangeByDoneButtonClick() {
        loginPage.performLogin();
        int taskNumberBefore = homePage.getTaskNumber();
        homePage.clickFirstDoneButton();
        assertEquals(taskNumberBefore - 1, homePage.getTaskNumber(), "Task number didn't change");
    }
}
