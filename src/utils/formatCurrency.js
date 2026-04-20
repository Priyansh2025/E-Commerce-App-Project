const CONVERSION_RATE = 83; // 1 USD = 83 INR

export const formatINR = (usdAmount) => {
  const inrAmount = usdAmount * CONVERSION_RATE;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // Keeps it clean (e.g., ₹4,500 instead of ₹4,500.00)
  }).format(inrAmount);
};