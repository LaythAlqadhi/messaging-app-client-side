import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import TopBarAlert from '../components/TopBarAlert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const AuthPage = () => {
  const { authType } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    loading ? <Loading /> :
    <div className="flex h-screen w-full flex-col items-center justify-between py-4">
      {error && <TopBarAlert message={error} />}
      {authType === 'signin' ? (
        <>
          <Header content="Sign In to get started." />
          <SignIn setLoading={setLoading} setError={setError} />
        </>
      ) : (
        <>
          <Header content="Sign Up to get started." />
          <SignUp setLoading={setLoading} setError={setError} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default AuthPage;
