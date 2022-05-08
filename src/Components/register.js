import { useNavigate } from "react-router-dom";

const Register=(props)=>{
    var history = useNavigate();
    const {setLoggedIn,loggedIn} =  props;
    const submitHandler=async(event)=>{
        event.preventDefault();       
        setLoggedIn(true); 
        history('/quiz');
    }
 return(
        <div className="container">
            
            <form className="login-form border rounded">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" required="True"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required="True"/>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>
                </div>
            </form>
        </div>      

    )
}

export default Register;