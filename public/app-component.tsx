import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth-context';
import { CourseProvider } from './course-context';
import { UserProvider } from './user-context';
import Header from './header-component';
import Footer from './footer-component';
import SearchBar from './search-bar-component';
import AIChat from './ai-chat-component';
import HomePage from './home-page-component';
import SignupPage from './signup-page-component';
import StudentDashboardPage from './student-dashboard-component';
import TeacherDashboardPage from './teacher-dashboard-component';
import InstitutionDashboardPage from './institution-dashboard-component';
import CoursePage from './course-page-component';
import SocialNetworkPage from './social-network-page';
import StudyGroupsPage from './study-groups-page';
import SubscriptionsPage from './subscriptions-page-component';
import LiveSessionsPage from './live-session-page';

const PrivateRoute = ({ component: Component, allowedTypes, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        user && allowedTypes.includes(user.userType) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      <SearchBar />
      {children}
    </main>
    <Footer />
    <AIChat />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={SignupPage} />
                <PrivateRoute path="/dashboard" component={StudentDashboardPage} allowedTypes={['student']} />
                <PrivateRoute path="/teacher-dashboard" component={TeacherDashboardPage} allowedTypes={['teacher']} />
                <PrivateRoute path="/institution-dashboard" component={InstitutionDashboardPage} allowedTypes={['institution']} />
                <PrivateRoute path="/cours" exact component={CoursesPage} allowedTypes={['student', 'teacher', 'institution']} />
                <PrivateRoute path="/cours/:courseId" component={CoursePage} allowedTypes={['student', 'teacher', 'institution']} />
                <PrivateRoute path="/reseau-social" component={SocialNetworkPage} allowedTypes={['student', 'teacher', 'institution']} />
                <PrivateRoute path="/groupes-etude" component={StudyGroupsPage} allowedTypes={['student']} />
                <PrivateRoute path="/abonnements" component={SubscriptionsPage} allowedTypes={['student', 'teacher', 'institution']} />
                <PrivateRoute path="/live-sessions" component={LiveSessionsPage} allowedTypes={['student', 'teacher', 'institution']} />
              </Switch>
            </Layout>
          </Router>
        </CourseProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
