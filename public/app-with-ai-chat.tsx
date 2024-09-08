import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import SocialNetworkPage from './pages/SocialNetworkPage';
import PersonalSpacePage from './pages/PersonalSpacePage';
import StudyGroupsPage from './pages/StudyGroupsPage';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/dashboard" component={DashboardPage} />
                  <Route path="/cours" component={CoursesPage} />
                  <Route path="/reseau-social" component={SocialNetworkPage} />
                  <Route path="/espace-personnel" component={PersonalSpacePage} />
                  <Route path="/groupes-etude" component={StudyGroupsPage} />
                </Switch>