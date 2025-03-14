package core.decorator;

import core.elements.*;
import core.elements.table.Cell;
import core.elements.table.Row;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.pagefactory.DefaultElementLocatorFactory;
import org.openqa.selenium.support.pagefactory.DefaultFieldDecorator;
import org.openqa.selenium.support.pagefactory.ElementLocator;
import org.openqa.selenium.support.pagefactory.ElementLocatorFactory;
import org.openqa.selenium.support.pagefactory.internal.LocatingElementListHandler;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Proxy;
import java.util.AbstractList;
import java.util.List;


public class CustomFieldDecorator extends DefaultFieldDecorator {

    public CustomFieldDecorator(WebDriver driver) {
        this(new DefaultElementLocatorFactory(driver));
    }

    public CustomFieldDecorator(ElementLocatorFactory factory) {
        super(factory);
    }

    public Object decorate(ClassLoader loader, Field field) {
        Class<?> fieldType = field.getType();
        ElementLocator locator = factory.createLocator(field);
        String fieldName = field.getName();

        if (List.class.isAssignableFrom(fieldType)) {
            return decorateList(loader, locator, field);
        } else {
            return decorateSingle(loader, locator, fieldType, fieldName);
        }
    }

    private Object decorateList(ClassLoader loader, ElementLocator locator, Field field) {
        ParameterizedType listType = (ParameterizedType) field.getGenericType();
        Class<?> genericType = (Class<?>) listType.getActualTypeArguments()[0];
        String fieldName = field.getName();

        InvocationHandler handler = new LocatingElementListHandler(locator);
        List<WebElement> proxyElements = (List<WebElement>) Proxy.newProxyInstance(loader, new Class[]{List.class}, handler);

        switch (genericType.getSimpleName()) {
            case "TextField":
                return new AbstractList<TextField>() {
                    @Override
                    public TextField get(int index) {
                        return new TextField(proxyElements.get(index), fieldName);
                    }

                    @Override
                    public int size() {
                        return proxyElements.size();
                    }
                };
            case "Button":
                return new AbstractList<Button>() {
                    @Override
                    public Button get(int index) {
                        return new Button(proxyElements.get(index), fieldName);
                    }

                    @Override
                    public int size() {
                        return proxyElements.size();
                    }
                };
            case "Label":
                return new AbstractList<Label>() {
                    @Override
                    public Label get(int index) {
                        return new Label(proxyElements.get(index), fieldName);
                    }

                    @Override
                    public int size() {
                        return proxyElements.size();
                    }
                };
            case "Dropdown":
                return new AbstractList<Dropdown>() {
                    @Override
                    public Dropdown get(int index) {
                        return new Dropdown(proxyElements.get(index), fieldName);
                    }

                    @Override
                    public int size() {
                        return proxyElements.size();
                    }
                };
            case "Row":
                return new AbstractList<Row>() {
                    @Override
                    public Row get(int index) {
                        return new Row(proxyElements.get(index), fieldName);
                    }

                    @Override
                    public int size() {
                        return proxyElements.size();
                    }
                };
            case "Cell":
                return new AbstractList<Cell>() {
                    @Override
                    public Cell get(int index) {
                        return new Cell(proxyElements.get(index), fieldName);
                    }

                    @Override
                    public int size() {
                        return proxyElements.size();
                    }
                };
            case "Task":
                return new AbstractList<Task>() {
                    @Override
                    public Task get(int index) {
                        return new Task(proxyElements.get(index), fieldName);
                    }

                    @Override
                    public int size() {
                        return proxyElements.size();
                    }
                };
            default:
                return null;
        }
    }

    private Object decorateSingle(ClassLoader loader, ElementLocator locator, Class<?> fieldType, String fieldName) {
        WebElement element = proxyForLocator(loader, locator);

        switch (fieldType.getSimpleName()) {
            case "TextField":
                return new TextField(element, fieldName);
            case "Button":
                return new Button(element, fieldName);
            case "Label":
                return new Label(element, fieldName);
            case "Dropdown":
                return new Dropdown(element, fieldName);
            case "Row":
                return new Row(element, fieldName);
            case "Cell":
                return new Cell(element, fieldName);
            case "Task":
                return new Task(element, fieldName);
            default:
                return null;
        }
    }

}