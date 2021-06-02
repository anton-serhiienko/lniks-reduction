import React from 'react'
import {useState, useEffect, useContext} from 'react'
import {useHTTP} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message =  useMessage()
    const {loading, error, request, clearError} = useHTTP()
    const [form, setForm] = useState({
        email:'', password:''
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    const handleFormChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleRegister = async () =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch(e){}
    }

    const handleLogin = async () =>{
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch(e){}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Links Reduction</h1>
                <div className="card grey darken-3">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input id="email"
                                       type="email"
                                       name="email"
                                       onChange={handleFormChange}
                                       className="validate"/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input id="password"
                                       type="password"
                                       name="password"
                                       onChange={handleFormChange}
                                       className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                    </div>
                    <div className="card-action">
                        <button className='btn yellow darken-4'
                                style={{marginRight: 10}}
                                onClick={handleLogin}
                                disabled={loading}>
                            Log In
                        </button>
                        <button className='btn grey lighten-1'
                                onClick={handleRegister}
                                disabled={loading}>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}