import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import TopBarAlert from '../components/TopBarAlert';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function AuthPage() {
  const { authType } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between py-4">
      {error && <TopBarAlert message={error} />}
      {authType === 'signin' ? (
        <SignIn setLoading={setLoading} setError={setError} />
      ) : (
        <SignUp setLoading={setLoading} setError={setError} />
      )}
    </div>
  );
}

export default AuthPage;
