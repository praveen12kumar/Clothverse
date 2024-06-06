import React, { useEffect, useState } from 'react'
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearOrdersError, getMyOrders } from '../../features/order/orderSlice';
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";


const Order = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoadingOrder, orders, totalOrderCount, orderPerPage, orderError} = useSelector((state) => state.orders);
    const [page, setPage] = useState(1);
    console.log(orders);
    useEffect(()=>{
        dispatch(getMyOrders(page));
        window.scrollTo({top:0,behavior:"smooth"});
    },[page, dispatch]);


    useEffect(()=>{
        if(orderError){
            toast.error(orderError);
            dispatch(clearOrdersError());
        }
    },[orderError, dispatch]);
    
  return (
    <div>
      <MetaData title="My Orders" />
      <h1 className="page-header">My Orders</h1>
      {isLoadingOrder ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.paymentInfo.status}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/order/${order._id}`)} 
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order