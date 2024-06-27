import React, { useEffect, useState } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/main.css"; // Adjust the path according to your directory structure

const MyInfoForm = () => {
  const [clientId, setClientId] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [scope, setScope] = useState("");
  const [purposeId, setPurposeId] = useState("");
  const [authApiUrl, setAuthApiUrl] = useState("");
  const [method] = useState("S256");
  const [scrollToAppForm, setScrollToAppForm] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    $.ajax({
      url: "/getEnv",
      type: "GET",
      success: (result) => {
        setClientId(result.clientId);
        setRedirectUrl(result.redirectUrl);
        setScope(result.scope);
        setAuthApiUrl(result.authApiUrl);
      },
      error: (result) => {
        alert("ERROR:" + JSON.stringify(result.responseJSON.error));
      },
    });

    if (window.location.href.indexOf("callback?code") > -1) {
      setScrollToAppForm(true);
      callServerAPIs();
    } else if (window.location.href.indexOf("callback") > -1) {
      setScrollToAppForm(true);
      alert("ERROR: Missing Auth Code");
    }
  }, []);

  const callAuthorizeApi = () => {
    $.ajax({
      url: "/generateCodeChallenge",
      type: "POST",
      success: (result) => {
        const authorizeUrl = `${authApiUrl}?client_id=${clientId}&scope=${scope}&purpose_id=${purposeId}&code_challenge=${result}&code_challenge_method=${method}&redirect_uri=${redirectUrl}`;
        window.location = authorizeUrl;
      },
      error: (result) => {
        alert("ERROR:" + JSON.stringify(result.responseJSON.error));
      },
    });
  };

  const callServerAPIs = () => {
    const authCode = $.url(window.location.href).param("code");

    $.ajax({
      url: "/getPersonData",
      data: {
        authCode: authCode,
        codeVerifier: window.sessionStorage.getItem("codeVerifier"),
      },
      type: "POST",
      success: (result) => {
        prefillForm(result);
      },
      error: (result) => {
        alert("ERROR:" + JSON.stringify(result.responseJSON.error));
      },
    });
  };

  const prefillForm = (data) => {
    let noaData = "";
    let address = "";
    if (data["noa-basic"]) {
      noaData = str(data["noa-basic"].amount)
        ? formatMoney(str(data["noa-basic"].amount), 2, ".", ",")
        : "";
    }
    if (data.regadd.type === "SG") {
      address = str(data.regadd.country)
        ? ""
        : `${str(data.regadd.block)} ${str(data.regadd.building)} \n #${str(
            data.regadd.floor
          )}-${str(data.regadd.unit)} ${str(data.regadd.street)} \n Singapore ${str(
            data.regadd.postal
          )}`;
    } else if (data.regadd.type === "Unformatted") {
      address = `${str(data.regadd.line1)}\n${str(data.regadd.line2)}`;
    }

    setFormValues({
      uinfin: str(data.uinfin),
      name: str(data.name),
      sex: str(data.sex),
      race: str(data.race),
      nationality: str(data.nationality),
      dob: str(data.dob),
      email: str(data.email),
      mobileno: `${str(data.mobileno.prefix)}${str(data.mobileno.areacode)} ${str(data.mobileno.nbr)}`,
      regadd: address,
      housingtype: str(data.housingtype) === "" ? str(data.hdbtype) : str(data.housingtype),
      marital: str(data.marital),
      edulevel: str(data.edulevel),
      assessableincome: noaData,
    });
  };

  const formatMoney = (n, c, d, t) => {
    c = isNaN((c = Math.abs(c))) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;
    const s = n < 0 ? "-" : "";
    const i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)), 10));
    const j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      s +
      (j ? i.substr(0, j) + t : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
      (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")
    );
  };

  const str = (data) => {
    if (!data) return null;
    if (data.value) return data.value;
    if (data.desc) return data.desc;
    if (typeof data === "string") return data;
    return "";
  };

  const handleAuthorizeSubmit = (e) => {
    e.preventDefault();
    callAuthorizeApi();
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Add code here to submit the application form back to server for processing
    // For demo purpose, just toggle the visibility of a complete message
    $('#complete').toggleClass('hidden');
  };

  return (
    <div>
      <section className="hero-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 d-flex align-items-center full-screen-height">
              <div className="hero-content-div">
                <div className="hero-content">
                  <h1>MyInfo Demo Application</h1>
                  <p>This demo is an example of how your application should integrate with MyInfo.</p>
                  <hr />
                  <p>
                    To start the SingPass login and consent process, click on the "Retrieve MyInfo" button below.
                  </p>
                </div>
                <form id="formAuthorize" onSubmit={handleAuthorizeSubmit}>
                  <button type="submit" className="btn2">
                    Retrieve MyInfo
                  </button>
                </form>
                <hr />
                <small>
                  Note: refer to the{" "}
                  <a
                    href="https://www.ndi-api.gov.sg/library/myinfo/resources-personas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Personas
                  </a>{" "}
                  on the NDI Developer and Partner Portal for the test accounts to be used.
                </small>
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
        <form id="formApplication" className="toggle_content" onSubmit={handleApplicationSubmit}>
          <div className="container">
            <div className="single-heading">
              <h2>Form</h2>
              <h4>Application pre-filled with MyInfo!</h4>
            </div>
            <div className="row">
              <div className="col-md-12 mb-4">
                <p style={{ textAlign: "center" }}>
                  Confirm your details below and click "Submit Application".
                </p>
              </div>
            </div>
            <div className="row justify-content-around">
              <div className="col-md-12 col-lg-5 form-box mb-4">
                <h3>Personal Information</h3>
                <div className="form-group">
                  <label htmlFor="uinfin">UIN/FIN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="uinfin"
                    id="uinfin"
                    value={formValues.uinfin || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={formValues.name || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sex">Sex</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sex"
                    id="sex"
                    value={formValues.sex || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="race">Race</label>
                  <input
                    type="text"
                    className="form-control"
                    name="race"
                    id="race"
                    value={formValues.race || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nationality">Nationality</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nationality"
                    id="nationality"
                    value={formValues.nationality || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="text"
                    className="form-control"
                    name="dob"
                    id="dob"
                    value={formValues.dob || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobileno">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobileno"
                    id="mobileno"
                    value={formValues.mobileno || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-5 form-box mb-4">
                <h3>Residential Information</h3>
                <div className="form-group">
                  <label htmlFor="regadd">Residential Address</label>
                  <textarea
                    className="form-control"
                    name="regadd"
                    id="regadd"
                    rows="5"
                    value={formValues.regadd || ""}
                    disabled
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="housingtype">Housing Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="housingtype"
                    id="housingtype"
                    value={formValues.housingtype || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="marital">Marital Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="marital"
                    id="marital"
                    value={formValues.marital || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edulevel">Education Level</label>
                  <input
                    type="text"
                    className="form-control"
                    name="edulevel"
                    id="edulevel"
                    value={formValues.edulevel || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="assessableincome">Assessable Income</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assessableincome"
                    id="assessableincome"
                    value={formValues.assessableincome || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4 col-lg-3">
                <button type="submit" className="btn2">
                  Submit Application
                </button>
              </div>
            </div>
            <div className="row justify-content-center hidden" id="complete">
              <div className="col-md-12 text-center">
                <h3>Application Submitted Successfully!</h3>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MyInfoForm;
[]