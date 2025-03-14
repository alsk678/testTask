package core.properties;

public class Properties {
    public static int DEFAULT_TIMEOUT = Integer.parseInt(PropertyReader.findProperty("DEFAULT_TIMEOUT"));
    public static String BASE_URL = PropertyReader.findProperty("BASE_URL");
    public static String FACTORY = PropertyReader.findProperty("FACTORY");
    public static String CLIENT = PropertyReader.findProperty("CLIENT");
    public static String DRIVER = PropertyReader.findProperty("DRIVER");
    public static String DRIVER_PATH = PropertyReader.findProperty("DRIVER_PATH");
}

