import axios from "axios";
import comp from "../Redux_store/Comp";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faCalendarXmark} from "@fortawesome/free-solid-svg-icons";
import Fiill from "./Fill";

    const Attendance = () => {
    const component = useSelector((state) => state.comp.comp);

    const [subject, setsub] = useState();
    const [reload, setload] = useState(false);
    const [att, setatt] = useState();
    const [fdata, setfdata] = useState([]);

    // This Function Fetch All attendence
    const atd = async () => {
        try {
        const adnc = await axios.post(
            "http://localhost:5000/api/allAttendance",
            {},
            {
            withCredentials: true,
            },
        );
        if (adnc.status === 200) {
            setatt(adnc.data);
        }
        } catch (error) {
        console.log(error.message);
        }
    };

    // This Function Fetch All subject
    const sub = async () => {
        try {
            const sbj = await axios.post( "http://localhost:5000/api/allsubject",
            {},
            {
            withCredentials: true,
            },
        );

        if (sbj.status === 200) {
            setsub(sbj.data);
        }

        } 
        catch (error) {
            console.log("Something Went Wrong : ", error.message);
        }
    };

    useEffect(() => {
        sub();
        atd();
    }, [reload]);

    useEffect(() => {
        if (att && subject) {
            const data = [];
            console.log(att);
            for (let i = 0; i < att.length; i++) {
                data.push({ ...subject[i], ...att[i] });
            }
            setfdata(data);
            // console.log(data)
        }
    }, [att, subject]);

    // This function Can Update Attendance
    const updateAttendance = async (a, scode, pday, aday, tday) => {
        try {
            let present = false;
            let absent = false;
            if (a === "present") {
                present = true;
                absent = false;
        } 
        else {
            present = false;
            absent = true;
        }

        await axios.post( "http://localhost:5000/api/Attendance",
            {
                scode,
                present,
                absent,
            },
            {
                withCredentials: true,
            },
        );

        // console.log(response)
        if (reload) {
            setload(false);
        } else {
            setload(true);
        }
        } catch (error) {
            console.log("Something Went Wrong : ", error.message);
        }
    };

    return (
        <>
        {component === "Attendance" && (
            <div className="attendance">
            <div className="pannel_title">My Attendance</div>

            <pre className="line" style={{ marginTop: "24px" }}></pre>

            {fdata &&
                fdata.map((item) => (
                <div key={item._id} className="AttCard">

                    <div className="dtatt">
                        <div className="sname">{item.sname}</div>
                        <div className="fname">{item.facultyname}</div>
                    </div>

                    <Fiill content={((item.pday/item.tday)*100).toFixed(2)} />

                    <div className="bbox">
                        <div className="btn5">
                            <button onClick={() =>
                                updateAttendance("present",item.scode,item.pday,item.aday,item.tday)}><FontAwesomeIcon icon={faCalendarCheck} /> Present </button>
                        </div>

                        <div className="btn5">
                            <button onClick={() => {updateAttendance("absent",item.scode,item.pday,item.aday,item.tday);}}><FontAwesomeIcon icon={faCalendarXmark} /> Absent</button>
                        </div>

                    </div>
                </div>
                ))}
            </div>
        )}
        </>
    );
    };

    export default Attendance;
