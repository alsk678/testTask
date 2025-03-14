package core.logger;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class TestLogger {

    private static final Logger LOGGER = LogManager.getLogger(TestLogger.class);
    private static TestLogger instance;

    public static synchronized TestLogger getInstance() {
        if (instance == null) {
            instance = new TestLogger();
        }
        return instance;
    }

    public void info(String message) {
        LOGGER.info(message);
    }

    public void logTestName(String testName) {
        logWithDelimiters(String.format("Test case: '%s'", testName), "=");
    }

    public void logClassName(String className) {
        logWithDelimiters(String.format("Test class: '%s'", className), "=");
    }

    public void logTestEnd(String testName) {
        logWithDelimiters(String.format("Test case: '%s' Passed", testName), "*");
    }

    public void logClassEnd(String className) {
        logWithDelimiters(String.format("Test class: '%s' Passed", className), "*");
    }

    private String repeatChar(String str, int count) {
        return new String(new char[count]).replace("\0", str);
    }

    private void logWithDelimiters(String message, String delimiterChar) {
        String delimiterPrefix = repeatChar(delimiterChar, 21);
        String formattedMessage = String.format("%s %s %s", delimiterPrefix, message, delimiterPrefix);
        String delimiterLine = repeatChar(delimiterChar, formattedMessage.length());

        info("");
        info(delimiterLine);
        info(formattedMessage);
        info(delimiterLine);
        info("");
    }

}
