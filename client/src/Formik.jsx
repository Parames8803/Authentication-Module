import { React, useEffect, useState } from "react";
// import { Outlet, Link } from "react-router-dom";
import "../src/Formik.css";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Axios from "axios";
// import Module from "./Module.jsx";

const Formic = () => {
    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);

        if (user !== null) {
            setFormPage(false);
            setHome(true);
        }
    }, []);

    const path = "http://localhost:5000";

    const [log, setLog] = useState("");
    const [form, setForm] = useState("");
    const [home, setHome] = useState(false);
    const [formpage, setFormPage] = useState(true);

    const SignIn = () => {
        const initialValuesSignIn = {
            username: "",
            email: "",
            password: "",
            cnfPassword: "",
        };

        const validateSchemaSignIn = yup.object().shape({
            username: yup.string().required("Username is Required"),
            email: yup.string().email().required("Email is Required"),
            password: yup.string().required("Password is Required"),
            cnfPassword: yup.string().required("Confirm Password is Required"),
        });

        const btnSignIn = async (values) => {
            let username = values.username;
            let email = values.email;
            let password = values.password;
            let cnfPassword = values.cnfPassword;
            // console.log(values);

            if (password === cnfPassword) {
                // console.log(username);
                const res = await Axios.post(path + "/api/signup", {
                    username: username,
                    email: email,
                    password: password,
                }).catch((error) => console.log(error.response.data))

                if (res.status == 200) {
                    console.log(res);
                    setForm("Login");
                }

            }else {
                console.log("please fill same password in both field");
            }
        };

        return (
            <div className="form-div">
                <div className="header">
                    <h2>Sign In</h2>
                </div>
                <div className="body">
                    <Formik
                        initialValues={initialValuesSignIn}
                        validationSchema={validateSchemaSignIn}
                        onSubmit={btnSignIn}>
                        {(props) => {
                            // console.log(props);
                            return (
                                <Form>
                                    <label htmlFor="username">Username *</label>
                                    {/* <input
                                type="text"
                                id="username"
                                name="username"
                                value={props.values.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                placeholder="Enter the your username"
                            /> */}
                                    <Field
                                        name="username"
                                        placeholder="Enter the your username"
                                    />
                                    {props.touched.username &&
                                    props.errors.username ? (
                                        <p className="error">{props.errors.username}</p>
                                    ) : null}
                                    <br />
                                    <label htmlFor="email">Email *</label>
                                    <Field
                                        name="email"
                                        placeholder="Enter the your email"
                                    />
                                    {props.touched.email &&
                                    props.errors.email ? (
                                        <p className="error">{props.errors.email}</p>
                                    ) : null}
                                    <br />
                                    <label htmlFor="password">Password *</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter the your Password"
                                    />
                                   {props.touched.password &&
                                    props.errors.password ? (
                                        <p className="error">{props.errors.password}</p>
                                    ) : null}
                                    <br />
                                    <label htmlFor="cnfPassword">
                                        Confirm Password *
                                    </label>
                                    <Field
                                        type="password"
                                        name="cnfPassword"
                                        placeholder="Enter the your Password"
                                    />
                                   {props.touched.cnfPassword &&
                                    props.errors.cnfPassword ? (
                                        <p className="error">{props.errors.cnfPassword}</p>
                                    ) : null}
                                    <br />
                                    <button type="submit">Sign In</button>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        );
    };

    const Login = () => {
        const initialValuesLogin = {
            username: "",
            // email: "",
            password: "",
        };

        const validateSchemaLogin = yup.object().shape({
            username: yup.string().required("Username is Required"),
            // email: yup.string().email().required("Email is Required"),
            password: yup.string().required("Password is Required"),
        });

        const btnLogin = async (values) => {
            let username = values.username;
            // let email = values.email;
            let password = values.password;

            const res = await Axios.post(path + "/api/login", {
                username: username,
                // email : email,
                password: password,
            }).catch((err) => console.log(err))
            console.log(res)

            if (res.status == 200) {
                let user = localStorage.setItem("user", username);
                // let email = localStorage.setItem("email", email);

                if (user !== null) {
                    console.log("logged in");
                    setFormPage(false);
                    setHome(true);
                } else {
                    console.log("Log in first...");
                }
            } else {
                console.log('invalid credentials')
            }
        };

        return (
            <div className="form-div">
                <div className="header">
                    <h2>Login</h2>
                </div>
                <div className="body">
                    <Formik
                        initialValues={initialValuesLogin}
                        validationSchema={validateSchemaLogin}
                        onSubmit={btnLogin}>
                        {(props) => {
                            // console.log(props);
                            return (
                                <Form>
                                    <label htmlFor="username">Username *</label>
                                    {/* <input
                                type="text"
                                id="username"
                                name="username"
                                value={props.values.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                placeholder="Enter the your username"
                            /> */}
                                    <Field
                                        name="username"
                                        placeholder="Enter the your username"
                                    />
                                    {props.touched.username &&
                                    props.errors.username ? (
                                        <p className="error">{props.errors.username}</p>
                                    ) : null}
                                    <br />
                                    <label htmlFor="password">Password *</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter the your Password"
                                    />
                                    {props.touched.password &&
                                    props.errors.password ? (
                                        <p className="error">{props.errors.password}</p>
                                    ) : null}
                                    <br />
                                    <button type="submit">Login</button>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        );
    };

    const Home = () => {
        // const [log, setLog] = useState('')

        let user = localStorage.getItem("user");

        if (user !== null) {
            setLog("Logout");
        } else {
            setLog("Login");
        }

        return (
            <div className="home">
                <div className="nav">
                    <div className="logo">
                        <h1>Formik</h1>
                    </div>
                    <div className="links">
                        <a
                            onClick={() => {
                                setForm("Login");
                                setFormPage(true);
                                setHome(false);
                                localStorage.removeItem("user");
                            }}>
                            {log}
                        </a>
                    </div>
                </div>
                <div className="intro">
                    <div className="img">
                        <i class="fa-regular fa-user fa-6x"></i>
                    </div>
                    <h1>Hello ! everyone . . .</h1>
                    <p>This is home page only accessed by Logged user.</p>
                    <h1>User : {user}</h1>
                </div>
            </div>
        );
    };

    return (
        <div>
            {formpage && (
                <>
                    <div className="title">
                        <h1>Formik</h1>
                        <a
                            onClick={() => {
                                setForm("Login");
                            }}>
                            Login
                        </a>
                        <a
                            onClick={() => {
                                setForm("Signin");
                            }}>
                            Sign In
                        </a>
                    </div>
                    <div className="formcontainer">
                        {form === "Login" ? <Login /> : <SignIn />}
                    </div>
                </>
            )}

            {home && <Home />}
            {/* <Module /> */}
        </div>
    );
};

export default Formic;
