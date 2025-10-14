// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import bkash from '../../../public/Photo/bkash_payment_logo.png';
// const API_URL = "https://digiboxcafe-2-server.onrender.com";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Fade,
//   Backdrop,
//   LinearProgress,
// } from '@mui/material';

// export default function BuyModal({ open, onClose, product }) {
//   const TOTAL_TIME = 90; 
//   const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
//   const [loading, setLoading] = useState(false);

//   localStorage.setItem('selectedProductId', product?.product_id);

//   // Countdown timer logic
//   useEffect(() => {
//     let interval, timeout;

//     if (open && product?.availableProduct) {
//       setSecondsLeft(TOTAL_TIME);

//       interval = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       timeout = setTimeout(() => {
//         onClose(); 
//       }, TOTAL_TIME * 1000);
//     }

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timeout);
//     };
//   }, [open, product?.id]);

//   // Handle order confirmation
//   const handleConfirmOrder = async () => {
//     try {
//       const res = await axios.post(`${API_URL}/api/bkash/create-payment`, {
//         amount: product.price, product_Id: product.product_id, order_quantity: 3
//       }, { withCredentials: true });

//       window.location.href = res.data.bkashURL; // redirect to bKash gateway
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   if (!product) return null;

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{ timeout: 500 }}
//     >
//       <Fade in={open}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: {
//               xs: '90%',
//               sm: '80%',
//               md: 450,
//               lg: 550,
//             },
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 3,
//             textAlign: 'center',
//             border: '1px solid rgba(0, 0, 0, 0.2)',
//             boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
//           }}
//         >
//           {product.availableProduct ? (
//             <>
//               <Typography variant="h5" className="text-green-600 font-semibold">
//                 Confirm Purchase
//               </Typography>
//               <img
//                 className="m-auto w-48 md:py-3 py-1"
//                 src={product.image}
//                 alt="product"
//               />
//               <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
//                 <strong>{product.title}</strong>
//               </Typography>
//               <Typography
//                 className="text-green-600 md:py-3 pb-1"
//                 sx={{ mt: 1, fontSize: '2rem' }}
//               >
//                 <span className="font-bolder">
//                   <strong>৳</strong>{' '}
//                 </span>
//                 <strong>{product.price}</strong>
//               </Typography>

//               <img
//                 className="m-auto"
//                 width="70%"
//                 src={bkash}
//                 alt="qr code"
//               />

//               <Box mt={3} display="flex" justifyContent="space-between" flexDirection="column">
//                 <Button
//                   sx={{
//                     mb: 1,
//                     background: 'linear-gradient(90deg, #28a745 0%, #ff9800 100%)',
//                     '&:hover': {
//                       background: 'linear-gradient(90deg, #218838 0%, #e65100 100%)',
//                     },
//                   }}
//                   variant="contained"
//                   onClick={handleConfirmOrder}
//                   disabled={loading}
//                 >
//                   {loading ? 'Placing Order...' : 'Confirm'}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={onClose}
//                   sx={{ borderColor: '#f44336', color: '#f44336' }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <>
//               <Typography variant="h3" color="error" gutterBottom>
//                 Out of Stock
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 Sorry! This product is currently unavailable.
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={onClose}
//                 sx={{ borderColor: '#f44336', color: '#f44336' }}
//               >
//                 Close
//               </Button>
//             </>
//           )}

//           {/* Countdown display */}
//           <Typography sx={{ mt: 1, color: 'gray', fontSize: '0.9rem' }}>
//             Auto closing in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
//           </Typography>

//           <LinearProgress
//             variant="determinate"
//             value={((TOTAL_TIME - secondsLeft) / TOTAL_TIME) * 100}
//             sx={{ mt: 1, mb: 2 }}
//           />
//         </Box>
//       </Fade>
//     </Modal>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import bkash from '../../../public/Photo/bkash_payment_logo.png';
// const API_URL = "https://digiboxcafe-2-server.onrender.com";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Fade,
//   Backdrop,
//   LinearProgress,
//   TextField,
// } from '@mui/material';

// export default function BuyModal({ open, onClose, product }) {
//   const TOTAL_TIME = 90; 
//   const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
//   const [loading, setLoading] = useState(false);
//   const [orderQuantity, setOrderQuantity] = useState(1); // Default quantity is 1
//   const [totalPrice, setTotalPrice] = useState(product?.price); // Total price based on quantity

//   localStorage.setItem('selectedProductId', product?.product_id);

//   // Update total price when quantity changes
//   useEffect(() => {
//     if (product?.price) {
//       setTotalPrice(product.price * orderQuantity);
//     }
//   }, [orderQuantity, product?.price]);

//   // Countdown timer logic
//   useEffect(() => {
//     let interval, timeout;

//     if (open && product?.availableProduct) {
//       setSecondsLeft(TOTAL_TIME);

//       interval = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       timeout = setTimeout(() => {
//         onClose(); 
//       }, TOTAL_TIME * 1000);
//     }

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timeout);
//     };
//   }, [open, product?.id]);

//   // Handle order confirmation
//   const handleConfirmOrder = async () => {
//     try {
//       const res = await axios.post(`${API_URL}/api/bkash/create-payment`, {
//         amount: totalPrice, // Use total price
//         product_Id: product.product_id,
//         order_quantity: orderQuantity,
//       }, { withCredentials: true });

//       window.location.href = res.data.bkashURL; // redirect to bKash gateway
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   if (!product) return null;

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{ timeout: 500 }}
//     >
//       <Fade in={open}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: {
//               xs: '90%',
//               sm: '80%',
//               md: 450,
//               lg: 550,
//             },
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 3,
//             textAlign: 'center',
//             border: '1px solid rgba(0, 0, 0, 0.2)',
//             boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
//           }}
//         >
//           {product.availableProduct ? (
//             <>
//               <Typography variant="h5" className="text-green-600 font-semibold">
//                 Confirm Purchase
//               </Typography>
//               <img
//                 className="m-auto w-48 md:py-3 py-1"
//                 src={product.image}
//                 alt="product"
//               />
//               <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
//                 <strong>{product.title}</strong>
//               </Typography>
//               <Typography
//                 className="text-green-600 md:py-3 pb-1"
//                 sx={{ mt: 1, fontSize: '2rem' }}
//               >
//                 <span className="font-bolder">
//                   <strong>৳</strong>{' '}
//                 </span>
//                 <strong>{totalPrice}</strong> {/* Show updated total price */}
//               </Typography>

//               <img
//                 className="m-auto"
//                 width="70%"
//                 src={bkash}
//                 alt="qr code"
//               />

//               {/* Order Quantity Input */}
//               <Box mt={3}>
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                   Select Quantity:
//                 </Typography>
//                 <TextField
//                   type="number"
//                   value={orderQuantity}
//                   onChange={(e) => setOrderQuantity(Math.max(1, e.target.value))}
//                   sx={{ width: '100%', mb: 2 }}
//                   inputProps={{ min: 1 }}
//                 />
//               </Box>

//               <Box mt={3} display="flex" justifyContent="space-between" flexDirection="column">
//                 <Button
//                   sx={{
//                     mb: 1,
//                     background: 'linear-gradient(90deg, #28a745 0%, #ff9800 100%)',
//                     '&:hover': {
//                       background: 'linear-gradient(90deg, #218838 0%, #e65100 100%)',
//                     },
//                   }}
//                   variant="contained"
//                   onClick={handleConfirmOrder}
//                   disabled={loading}
//                 >
//                   {loading ? 'Placing Order...' : 'Confirm'}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={onClose}
//                   sx={{ borderColor: '#f44336', color: '#f44336' }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <>
//               <Typography variant="h3" color="error" gutterBottom>
//                 Out of Stock
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 Sorry! This product is currently unavailable.
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={onClose}
//                 sx={{ borderColor: '#f44336', color: '#f44336' }}
//               >
//                 Close
//               </Button>
//             </>
//           )}

//           {/* Countdown display */}
//           <Typography sx={{ mt: 1, color: 'gray', fontSize: '0.9rem' }}>
//             Auto closing in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
//           </Typography>

//           <LinearProgress
//             variant="determinate"
//             value={((TOTAL_TIME - secondsLeft) / TOTAL_TIME) * 100}
//             sx={{ mt: 1, mb: 2 }}
//           />
//         </Box>
//       </Fade>
//     </Modal>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import bkash from '../../../public/Photo/bkash_payment_logo.png';
// const API_URL = "https://digiboxcafe-2-server.onrender.com";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Fade,
//   Backdrop,
//   LinearProgress,
//   Slider,
// } from '@mui/material';

// export default function BuyModal({ open, onClose, product }) {
//   const TOTAL_TIME = 90; 
//   const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
//   const [loading, setLoading] = useState(false);
//   const [orderQuantity, setOrderQuantity] = useState(1); // Default quantity is 1
//   const [totalPrice, setTotalPrice] = useState(product?.price); // Total price based on quantity

//   localStorage.setItem('selectedProductId', product?.product_id);

//   // Update total price when quantity changes
//   useEffect(() => {
//     if (product?.price) {
//       setTotalPrice(product.price * orderQuantity);
//     }
//   }, [orderQuantity, product?.price]);

//   // Countdown timer logic
//   useEffect(() => {
//     let interval, timeout;

//     if (open && product?.availableProduct) {
//       setSecondsLeft(TOTAL_TIME);

//       interval = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       timeout = setTimeout(() => {
//         onClose(); 
//       }, TOTAL_TIME * 1000);
//     }

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timeout);
//     };
//   }, [open, product?.id]);

//   // Handle order confirmation
//   const handleConfirmOrder = async () => {
//     try {
//       const res = await axios.post(`${API_URL}/api/bkash/create-payment`, {
//         amount: totalPrice, // Use total price
//         product_Id: product.product_id,
//         order_quantity: orderQuantity,
//       }, { withCredentials: true });

//       window.location.href = res.data.bkashURL; // redirect to bKash gateway
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   if (!product) return null;

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{ timeout: 500 }}
//     >
//       <Fade in={open}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: {
//               xs: '90%',
//               sm: '80%',
//               md: 450,
//               lg: 550,
//             },
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 3,
//             textAlign: 'center',
//             border: '1px solid rgba(0, 0, 0, 0.2)',
//             boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
//           }}
//         >
//           {product.availableProduct ? (
//             <>
//               <Typography variant="h5" className="text-green-600 font-semibold">
//                 Confirm Purchase
//               </Typography>
//               <img
//                 className="m-auto w-48 md:py-3 py-1"
//                 src={product.image}
//                 alt="product"
//               />
//               <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
//                 <strong>{product.title}</strong>
//               </Typography>
//               <Typography
//                 className="text-green-600 md:py-3 pb-1"
//                 sx={{ mt: 1, fontSize: '2rem' }}
//               >
//                 <span className="font-bolder">
//                   <strong>৳</strong>{' '}
//                 </span>
//                 <strong>{totalPrice}</strong> {/* Show updated total price */}
//               </Typography>

//               <img
//                 className="m-auto"
//                 width="70%"
//                 src={bkash}
//                 alt="qr code"
//               />

//               {/* Order Quantity Slider */}
//               <Box mt={3}>
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                   Select Quantity:
//                 </Typography>
//                 <Slider
//                   value={orderQuantity}
//                   onChange={(e, newValue) => setOrderQuantity(newValue)}
//                   min={1}
//                   max={10} // Max quantity limit
//                   step={1}
//                   valueLabelDisplay="auto"
//                   valueLabelFormat={(value) => `Qty: ${value}`} // Display value on slider
//                   sx={{
//                     width: '100%',
//                     color: '#28a745', // Green color for the slider
//                   }}
//                 />
//               </Box>

//               <Box mt={3} display="flex" justifyContent="space-between" flexDirection="column">
//                 <Button
//                   sx={{
//                     mb: 1,
//                     background: 'linear-gradient(90deg, #28a745 0%, #ff9800 100%)',
//                     '&:hover': {
//                       background: 'linear-gradient(90deg, #218838 0%, #e65100 100%)',
//                     },
//                   }}
//                   variant="contained"
//                   onClick={handleConfirmOrder}
//                   disabled={loading}
//                 >
//                   {loading ? 'Placing Order...' : 'Confirm'}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={onClose}
//                   sx={{ borderColor: '#f44336', color: '#f44336' }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <>
//               <Typography variant="h3" color="error" gutterBottom>
//                 Out of Stock
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 Sorry! This product is currently unavailable.
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={onClose}
//                 sx={{ borderColor: '#f44336', color: '#f44336' }}
//               >
//                 Close
//               </Button>
//             </>
//           )}

//           {/* Countdown display */}
//           <Typography sx={{ mt: 1, color: 'gray', fontSize: '0.9rem' }}>
//             Auto closing in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
//           </Typography>

//           <LinearProgress
//             variant="determinate"
//             value={((TOTAL_TIME - secondsLeft) / TOTAL_TIME) * 100}
//             sx={{ mt: 1, mb: 2 }}
//           />
//         </Box>
//       </Fade>
//     </Modal>
//   );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bkash from '../../../public/Photo/bkash_payment_logo.png';
const API_URL = "https://digiboxcafe-2-server.onrender.com";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
  LinearProgress,
  TextField
} from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

// Quantity Selector Component
function QuantitySelector({ value, onChange, max = 10 }) {
  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value > 1) onChange(value - 1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 2,
        // p: 2,
        maxWidth: 300,
        mx: 'auto',
        // boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Left side label */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
        Select Quantity:
      </Typography>

      {/* Middle current quantity */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#28a745',
          fontSize: '1.5rem',
          mx: 2,
          minWidth: 30,
          textAlign: 'center',
        }}
      >
        {value}
      </Typography>

      {/* Right arrows */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          onClick={increment}
          sx={{
            minWidth: 20,
            height: 20,
            padding: 0,
            borderRadius: 1,
            backgroundColor: '#28a745',
            color: '#fff',
            '&:hover': { backgroundColor: '#218838' },
          }}
        >
          <ArrowDropUp />
        </Button>
        <Button
          onClick={decrement}
          sx={{
            minWidth: 15,
            height: 15,
            padding: 0,
            borderRadius: 1,
            backgroundColor: '#ff9800',
            color: '#fff',
            mt: 1,
            '&:hover': { backgroundColor: '#e65100' },
          }}
        >
          <ArrowDropDown />
        </Button>
      </Box>
    </Box>
  );
}

export default function BuyModal({ open, onClose, product }) {
  const TOTAL_TIME = 90; 
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1); // Default quantity is 1
  const [totalPrice, setTotalPrice] = useState(product?.price); // Total price based on quantity

  localStorage.setItem('selectedProductId', product?.product_id);

  // Update total price when quantity changes
  useEffect(() => {
    if (product?.price) {
      setTotalPrice(product.price * orderQuantity);
    }
  }, [orderQuantity, product?.price]);

  // Countdown timer logic
  useEffect(() => {
    let interval, timeout;

    if (open && product?.availableProduct) {
      setSecondsLeft(TOTAL_TIME);

      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeout = setTimeout(() => {
        onClose(); 
      }, TOTAL_TIME * 1000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open, product?.id]);

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/bkash/create-payment`, {
        amount: totalPrice, // Use total price
        product_Id: product.product_id,
        order_quantity: orderQuantity,
      }, { withCredentials: true });

      window.location.href = res.data.bkashURL; // redirect to bKash gateway
    } catch (error) {
      console.error(error.response.data);
    }
  };

  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '90%',
              sm: '80%',
              md: 450,
              lg: 550,
            },
             bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', // Keep this as the final box shadow
            p: 3,
            textAlign: 'center',
            border: '1px solid rgba(0, 0, 0, 0.2)',

          }}
        >
          {product.availableProduct ? (
            <>
              <Typography variant="h5" className="text-green-600 font-semibold">
                Confirm Purchase
              </Typography>
              <Typography
                className="text-green-600"
                sx={{ ml: 0, fontSize: '2rem' }}
              >
                <span className="font-bolder">
                  <strong>৳</strong>{' '}
                </span>
                <strong>{totalPrice}</strong> {/* Show updated total price */}
              </Typography>
              <img
                className="m-auto w-48 md:py-3 py-1"
                src={product.image}
                alt="product"
              />
             <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
                <strong>{product.title}</strong>
              </Typography>
             
               {/* Quantity Selector */}
              <Box my={2}>
                <QuantitySelector
                  value={orderQuantity}
                  onChange={setOrderQuantity}
                  max={10} // max quantity limit
                />
              </Box>

              <img
                className="m-auto"
                width="70%"
                src={bkash}
                alt="qr code"
              />

             

              <Box mt={3} display="flex" justifyContent="space-between" flexDirection="column">
                <Button
                  sx={{
                    mb: 1,
                    background: 'linear-gradient(90deg, #28a745 0%, #ff9800 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #218838 0%, #e65100 100%)',
                    },
                  }}
                  variant="contained"
                  onClick={handleConfirmOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Confirm'}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onClose}
                  sx={{ borderColor: '#f44336', color: '#f44336' }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h3" color="error" gutterBottom>
                Out of Stock
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Sorry! This product is currently unavailable.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={onClose}
                sx={{ borderColor: '#f44336', color: '#f44336' }}
              >
                Close
              </Button>
            </>
          )}

          {/* Countdown display */}
          <Typography sx={{ mt: 1, color: 'gray', fontSize: '0.9rem' }}>
            Auto closing in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
          </Typography>

          <LinearProgress
            variant="determinate"
            value={((TOTAL_TIME - secondsLeft) / TOTAL_TIME) * 100}
            sx={{ mt: 1, mb: 2 }}
          />
        </Box>
      </Fade>
    </Modal>
  );
}
