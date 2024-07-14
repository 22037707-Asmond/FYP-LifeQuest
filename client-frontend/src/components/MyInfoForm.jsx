import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SampleApplication = () => {
    const [formData, setFormData] = useState({});
    const [scrollToAppForm, setScrollToAppForm] = useState(false);

    useEffect(() => {
        axios.get('/getEnv')
            .then(result => {
                const data = result.data;
                setFormData({
                    clientId: data.clientId,
                    redirectUrl: data.redirectUrl,
                    scope: data.scope,
                    purpose_id: data.purpose_id,
                    environment: data.environment,
                    authApiUrl: data.authApiUrl
                });
            })
            .catch(error => {
                alert("ERROR:" + JSON.stringify(error.response.data.error));
            });
    }, []);

    useEffect(() => {
        if (window.location.href.includes("callback?code")) {
            setScrollToAppForm(true);
            callServerAPIs();
        } else if (window.location.href.includes("callback")) {
            setScrollToAppForm(true);
            alert("ERROR: Missing Auth Code");
        }
    }, []);

    useEffect(() => {
        if (scrollToAppForm) {
            document.getElementById('form').classList.toggle('hidden');
            window.scrollTo({ top: document.getElementById('form').offsetTop, behavior: 'smooth' });
        }
    }, [scrollToAppForm]);

    const callAuthorizeApi = () => {
        axios.post('/generateCodeChallenge')
            .then(result => {
                const authorizeUrl = `${formData.authApiUrl}?client_id=${formData.clientId}&scope=${formData.scope}&purpose_id=${formData.purpose_id}&code_challenge=${result.data}&code_challenge_method=S256&redirect_uri=${formData.redirectUrl}`;
                window.location = authorizeUrl;
            })
            .catch(error => {
                alert("ERROR:" + JSON.stringify(error.response.data.error));
            });
    };

    const callServerAPIs = () => {
        const authCode = new URLSearchParams(window.location.search).get('code');
        axios.post('/getPersonData', {
            authCode: authCode,
            codeVerifier: window.sessionStorage.getItem("codeVerifier")
        })
            .then(result => {
                prefillForm(result.data);
            })
            .catch(error => {
                alert("ERROR:" + JSON.stringify(error.response.data.error));
            });
    };

    const prefillForm = (data) => {
        const noaData = data["noa-basic"] ? formatMoney(data["noa-basic"].amount) : "";
        const address = data.regadd.type === "SG" ? `${data.regadd.block} ${data.regadd.building}\n#${data.regadd.floor}-${data.regadd.unit} ${data.regadd.street}\nSingapore ${data.regadd.postal}` :
            data.regadd.type === "Unformatted" ? `${data.regadd.line1}\n${data.regadd.line2}` : "";

        const formValues = {
            uinfin: data.uinfin,
            name: data.name,
            sex: data.sex,
            race: data.race,
            nationality: data.nationality,
            dob: data.dob,
            email: data.email,
            mobileno: `${data.mobileno.prefix}${data.mobileno.areacode} ${data.mobileno.nbr}`,
            regadd: address,
            housingtype: data.housingtype || data.hdbtype,
            marital: data.marital,
            edulevel: data.edulevel,
            assessableincome: noaData
        };

        populateForm(formValues);
    };

    const formatMoney = (n, c = 2, d = ".", t = ",") => {
        const s = n < 0 ? "-" : "";
        const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
        const j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    const populateForm = (data) => {
        Object.keys(data).forEach(key => {
            document.querySelector(`[name=${key}]`).value = data[key];
            document.querySelector(`[name=${key}]`).disabled = true;
        });
    };

    const handleSubmitAuthorize = (e) => {
        e.preventDefault();
        callAuthorizeApi();
    };

    const handleSubmitApplication = (e) => {
        e.preventDefault();
        // add code here to submit the application form back to server for processing
        document.getElementById('complete').classList.toggle('hidden');
    };

    return (
        <div className="myinfo">
            <section className="hero-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 d-flex align-items-center full-screen-height">
                            <div className="hero-content-div">
                                <div className="hero-content">
                                    <h1>MyInfo Demo Application</h1>
                                    <p>This demo is an example of how your application should integrate with MyInfo.</p>
                                    <hr />
                                    <p>To start the SingPass login and consent process, click on the "Retrieve MyInfo" button below.</p>
                                </div>
                                <form id="formAuthorize" onSubmit={handleSubmitAuthorize}>
                                    <button type="submit" className="btn2">Retrieve MyInfo</button>
                                </form>
                                <hr />
                                <small>Note: refer to the <a href="https://www.ndi-api.gov.sg/library/myinfo/resources-personas" target="_blank" rel="noopener noreferrer">Personas</a> on the NDI Developer and Partner Portal for the test accounts to be used.</small>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 d-flex align-items-center full-screen-height mobile-hidden">
                            <div className="right-img">
                                <div data-depth="0.40" className="layer">
                                    <div className="right-img-bg-1"></div>
                                </div>
                                <div data-depth="0.30" className="layer">
                                    <div className="right-img-bg-2"></div>
                                </div>
                                <div data-depth="0.40" className="layer">
                                    <img className="right-img-img" src="assets/images/banner-personal.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <a href="#form" className="form-link">
                <p>form below</p>
            </a>

            <section id="form" className="lone-about-us section-padding">
                <form id="formApplication" className="toggle_content" onSubmit={handleSubmitApplication}>
                    <div className="container">
                        <div className="single-heading">
                            <h2>Form</h2>
                            <h4>Application pre-filled with MyInfo!</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <p style={{ textAlign: 'center' }}>Confirm your details below and click "Submit Application".</p>
                            </div>
                        </div>
                        <div className="row justify-content-around">
                            <div className="col-md-12 col-lg-5 form-box mb-4">
                                <h3>Personal Information</h3>
                                <hr />
                                <div className="form-group">
                                    <label>NRIC</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="uinfin" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="name" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Sex</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="sex" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Race</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="race" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Nationality</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="nationality" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Date Of Birth</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="dob" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Mobile No</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="mobileno" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <div className="input-group">
                                        <input type="email" className="form-control" name="email" placeholder="" required />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-5 form-box mb-4">
                                <h3>Residential Address</h3>
                                <hr />
                                <div className="form-group">
                                    <label>Address</label>
                                    <div className="input-group">
                                        <textarea className="form-control" rows="5" name="regadd" placeholder="" required></textarea>
                                    </div>
                                </div>
                                <h3>Other Information</h3>
                                <hr />
                                <div className="form-group">
                                    <label>Housing Type</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="housingtype" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Marital Status</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="marital" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Education Level</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="edulevel" placeholder="" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Annual Income</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="assessableincome" placeholder="" required />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-10 form-box mb-4">
                                <div className="form-group">
                                    <div className="input-group">
                                        <button type="submit" className="btn2">Submit Application</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div id="complete" className="hidden">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <h2 style={{ textAlign: 'center' }}>Application Complete!</h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SampleApplication;
