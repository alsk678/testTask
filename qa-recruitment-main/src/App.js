import React, {useState, useMemo} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Header from "./components/navigation/Header";
import SideMenu from "./components/navigation/SideMenu";
import AddItemModal from "./components/modals/AddItemModal";
import TaskCard from "./components/card/TaskCard"
import Activity from "./components/Activity";
import {Container, Row, Col} from 'react-bootstrap';

import './App.css';

const initialTasks = [
    {
        id: 1,
        title: 'Chill space',
        description: 'Create chill space for myself. Please order some pillows and flowers.',
        estimate: 4,
        priority: 'High',
        imageUrl: '/activity1.jpeg',
        isCompleted: false
    },
    {
        id: 2,
        title: 'Plant flowers',
        description: 'Buy flowers, good ground and setup new place for new flowers. Water is needed.',
        estimate: 3,
        priority: 'Critical',
        imageUrl: '/activity2.jpeg',
        isCompleted: false
    },
    {
        id: 3,
        title: 'Buy seeds',
        description: 'Buy seeds for different vegetables. Share it also with your neighbour because you really like him.',
        estimate: 1,
        priority: 'Low',
        imageUrl: '/activity3.jpeg',
        isCompleted: false
    },
    {
        id: 4,
        title: 'Clean garden',
        description: 'Clean garden and cut the grass. Consider to cut some legs for fireplace. Clean table in the garden.',
        estimate: 5,
        priority: 'Medium',
        imageUrl: '/activity4.jpeg',
        isCompleted: false
    },
    {
        id: 5,
        title: 'Organize the Bookshelf',
        description: 'Sort and organize the books on the bookshelf by genre and author.',
        estimate: 2,
        priority: 'Medium',
        imageUrl: '/activity5.jpeg',
        isCompleted: false
    },
    {
        id: 6,
        title: 'Paint the Fence',
        description: 'Paint the garden fence with weather-resistant paint. Choose a color that matches the exterior.',
        estimate: 4,
        priority: 'High',
        imageUrl: '/activity6.jpeg',
        isCompleted: false
    },
    {
        id: 7,
        title: 'Prepare Guest Room',
        description: 'Prepare the guest room for visitors. Include fresh linens, towels, and some welcome snacks.',
        estimate: 2,
        priority: 'Low',
        imageUrl: '/activity7.jpeg',
        isCompleted: false
    },
];

function App() {

    const loadTasksFromLocalStorage = () => {
        const savedTasksString = localStorage.getItem('tasks');
        if (savedTasksString) {
            return JSON.parse(savedTasksString);
        } else {
            return initialTasks;
        }
    };

    const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

    const [isLoggedIn, setIsLoggedIn] = useState(
        () => JSON.parse(localStorage.getItem('isLoggedIn')) || false
    );

    const [showOnlyPending, setShowOnlyPending] = useState(() => {
        const storedValue = localStorage.getItem('showOnlyPending');
        return storedValue !== null ? JSON.parse(storedValue) : true;
    });

    const [sortOrder, setSortOrder] = useState('ascending');

    const handleFilterChange = (isChecked) => {
        setShowOnlyPending(isChecked);
        localStorage.setItem('showOnlyPending', JSON.stringify(isChecked));
    };

    const [showAddModal, setShowAddModal] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);

    const taskActions = {
        add: (newItem) => {
            const defaultImageUrl = process.env.PUBLIC_URL + '/plannister.png';
            const imageUrl = newItem.imageUrl.trim() ? newItem.imageUrl : defaultImageUrl;
            const newTask = {
                ...newItem,
                id: Date.now(),
                imageUrl,
                isCompleted: false
            };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            addActivity({
                date: new Date().toISOString(),
                title: newTask.title,
                action: 'Added new task'
            });
        },

        remove: (taskId) => {
            const taskToRemove = tasks.find(task => task.id === taskId);
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            if (taskToRemove) {
                addActivity({
                    date: new Date().toISOString(),
                    title: taskToRemove.title,
                    action: 'Removed task'
                });
            }
        },

        complete: (taskId) => {
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    addActivity({
                        date: new Date().toISOString(),
                        title: task.title,
                        action: 'Moved to done'
                    });
                    return { ...task, isCompleted: true };
                }
                return task;
            });
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        },
    };

    const activeTasksCount = tasks.filter(task => !task.isCompleted).length;
    const inactiveTasksCount = tasks.filter(task => task.isCompleted).length;
    const totalActiveEstimation = tasks
        .filter(task => !task.isCompleted)
        .reduce((total, task) => total + Number(task.estimate), 0);
    const totalInActiveEstimation = tasks
        .filter(task => task.isCompleted)
        .reduce((total, task) => total + Number(task.estimate), 0);

    const displayedTasks = useMemo(() => {
        let filteredTasks = showOnlyPending
            ? tasks.filter(task => !task.isCompleted)
            : tasks;
        filteredTasks.sort((a, b) => sortOrder === 'ascending' ? a.estimate - b.estimate : b.estimate - a.estimate);
        return filteredTasks;
    }, [tasks, showOnlyPending, sortOrder]);


    const handleLogin = (status) => {
        setIsLoggedIn(status);
        localStorage.setItem('isLoggedIn', JSON.stringify(status));
        if (status) {
            const loadedTasks = loadTasksFromLocalStorage();
            setTasks(loadedTasks);

            const savedActivities = localStorage.getItem('activities');
            if (savedActivities) {
                setActivities(JSON.parse(savedActivities));
            }
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        setTasks([]);
        setActivities([]);
    };

    const closeActionsDropdown = () => {
        setShowActionsDropdown(false);
    };

    const openAddModal = () => {
        setShowAddModal(true);
        closeActionsDropdown();
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const [activities, setActivities] = useState(() => {
        const savedActivities = localStorage.getItem('activities');
        return savedActivities ? JSON.parse(savedActivities) : [];
    });

    const addActivity = (activity) => {
        const updatedActivities = [...activities, activity];
        setActivities(updatedActivities);
        localStorage.setItem('activities', JSON.stringify(updatedActivities));
    };

    return (
        <Router>
            <div className="App">
                {!isLoggedIn ? (
                    <Login onLogin={handleLogin}/>
                ) : (
                    <>
                        <Header
                            onLogout={handleLogout}
                            onAddItem={openAddModal}
                            showActionsDropdown={showActionsDropdown}
                            setShowActionsDropdown={setShowActionsDropdown}
                            activeTasksCount={activeTasksCount}
                            inactiveTasksCount={inactiveTasksCount}
                            totalActiveEstimation={totalActiveEstimation}
                            totalInActiveEstimation={totalInActiveEstimation}
                        />
                        <div className="app-container">
                            <SideMenu
                                isChecked={showOnlyPending}
                                onFilterChange={handleFilterChange}
                                sortOrder={sortOrder}
                                onSortOrderChange={setSortOrder}
                            />
                            <Routes>
                                <Route path="/home" element={
                                    <Container fluid>
                                        <Row>
                                            {displayedTasks.map((task) => (
                                                <Col md={3} key={task.id}>
                                                    <TaskCard
                                                        task={task}
                                                        onComplete={() => taskActions.complete(task.id)}
                                                        onRemove={() => taskActions.remove(task.id)}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                }/>
                                <Route path="/activity" element={<Activity activities={activities} />} />
                            </Routes>
                            {showAddModal &&
                                <AddItemModal show={showAddModal} onHide={closeAddModal} onAdd={taskActions.add}/>}
                        </div>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
