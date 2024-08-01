const handleTokenError = (error:any, mode:string) => {
    console.log("Handling token error...");

    if (mode === "User") {
        if (error.response && (error.response.data.message === 'Token has expired' || error.response.data.message === 'Invalid token'||error.response.status === 401)) {
          
            localStorage.removeItem('Usertoken');
            window.location.href = '/signin'; // This works for redirecting
        }
    } else if (mode === "Company") {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('Companytoken');
            window.location.href = '/company/signin'; 
        }
    } else {
        throw error; 
    }
};

export default handleTokenError;
