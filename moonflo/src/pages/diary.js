import React from "react";
import NavBar from "../components/NavBar";
import DiaryEntry from "../components/DiaryEntry";
import QuoteDisplay from "../components/QuoteDisplay";

const diary = () =>{

    return(<div>
        <QuoteDisplay apiUrl="https://type.fit/api/quotes" className="custom-quote-card-style"/>
        <DiaryEntry/>
        <NavBar/>
    </div>);
};
export default diary;

