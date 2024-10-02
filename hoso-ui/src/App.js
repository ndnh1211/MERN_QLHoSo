import './App.css';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useAuthStore from './store/authStore';
import { useCallback, useEffect, useState } from 'react';
import Loading from './page/Loading';
import ModalTaskNew from './components/ModalTaskNew';
import useTaskStore from './store/taskStore';

function App() {
  const { verify, isCheckingAuth, account } = useAuthStore()
  const { getTaskNew } = useTaskStore()
  const [taskNew, setTaskNew] = useState([])
  const [openModalTaskNew, setOpenModalTaskNew] = useState(false)

  const getAllTaskNew = useCallback(async () => {
    const res = await getTaskNew()
    if (res.success && res.data) {
      setTaskNew(res.data)
      setOpenModalTaskNew(true)
    }
    if (res.error) {
      toast.error(res.message)
    }
  }, [getTaskNew])
  useEffect(() => {
    if (account) {
      getAllTaskNew();
    }
  }, [getAllTaskNew, account])
  useEffect(() => {
    verify()
  }, [verify])
  if (isCheckingAuth) {
    return <Loading />
  }
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {
        openModalTaskNew && <ModalTaskNew
          taskNew={taskNew}
          openModalTaskNew={openModalTaskNew}
          setOpenModalTaskNew={setOpenModalTaskNew}
        />
      }
    </>
  );
}

export default App;
