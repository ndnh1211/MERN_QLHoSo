
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalEditAccount.css'
import { toast } from 'react-toastify';
import useAccountStore from '../store/accountStore';

const ModalEditAccount = ({ showModalEditAccount, setShowModalEditAccount, account, getAllAccount }) => {
    const [firstName, setFirstName] = useState(account?.first_name)
    const [lastName, setLastName] = useState(account?.last_name)
    const [ngaySinh, setNgaysinh] = useState(new Date(account?.ngaySinh).toLocaleDateString("en-CA"))
    const [phoneNumber, setPhoneNumber] = useState(account?.phoneNumber)
    const { updateAccount } = useAccountStore()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await updateAccount(account?._id, firstName, lastName, ngaySinh, phoneNumber)
        if (res.success) {
            toast.success(res.message)
            await getAllAccount()
        }
        if (res.error) {
            toast.error(res.message)
        }
        setShowModalEditAccount(false)
    }

    return (
        <Modal size='lg' show={showModalEditAccount} onHide={() => setShowModalEditAccount(false)}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-item'>
                        <div className='row form-group'>
                            <div className="col-6">
                                <label >ID</label>
                                <input type="text"
                                    value={account?._id}
                                    disabled className="form-control" />
                            </div>
                            <div className="col-6">
                                <label >Email address</label>
                                <input type="email"
                                    value={account?.email}
                                    disabled className="form-control" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label >First Name</label>
                            <input type="text" className="form-control"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label >Last Name</label>
                            <input type="text" className="form-control"
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label >Birthday</label>
                            <input type="date" className="form-control"
                                value={ngaySinh}
                                onChange={(e) => { setNgaysinh(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label >Phone Number</label>
                            <input type="number" className="form-control"
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type='submit'>
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal >

    )
}

export default ModalEditAccount