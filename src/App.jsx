import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { getUserInfo } from './store/actions/user-actions';

const App = ({ id, getUserInfo }) => { 

  useEffect(() => {
    getUserInfo(id);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const mapStateToProps = ({ user: { account: { id } } }) => ({
  id
});

const mapDispatchToProps = {
  getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
