import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React, {useState} from "react";

export default function Dashboard({auth, init, people}) {
    const [contributors, setContributors] = useState(JSON.parse(people));
    const [data, setData] = useState(changeData(JSON.parse(init)));

    window.Echo.channel('demo').listen('WebsocketDemoEvent', (e) => {
        let data = JSON.parse(e.data);
        setData(changeData(data.contributions));
        setContributors(data.people);
    });

    function changeData(dt){
        let needed = 200000000;
        let m = dt.cash;
        dt.cash = parseInt(dt.cash).toLocaleString()
        dt.pledge = parseInt(dt.pledge).toLocaleString()
        // let k = dt.totalAmount;
        dt.totalAmount = parseInt(dt.totalAmount).toLocaleString()
        dt.percentage = ((parseInt(m)/needed)*100).toFixed(2)
        dt.remaining = (needed-m).toLocaleString()
        return dt
    }

    // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">SDA Church Bukasa Land
    //     Fundraising</h2>}

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Bukasa Land"/>

            <div className="py-8">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-6">
                        <h1 style={{fontSize:"35px"}} className="font-bold">GOAL: UGX: 200,000,000</h1>
                        <h1 style={{fontSize:"35px"}} className="font-bold">Mobile Money (RAYMOND KABUUKA) <br/> 0703017187 (AIRTEL) 0785842406 (MTN)</h1>
                        <br/>
                        <br/>
                        <table className="px-6 py-8" width="100%">
                            <tbody>
                            <tr className="p-6 text-gray-900 font-bold" style={{fontSize: "30px"}}>
                                <td>Cash:</td>
                                <td style={{textAlign: "right"}}>UGX {data['cash']}</td>
                            </tr>
                            <tr className="p-6 text-gray-900 font-bold" style={{fontSize: "30px"}}>
                                <td>Pledge:</td>
                                <td style={{textAlign: "right"}}>UGX {data['pledge']}</td>
                            </tr>
                            <tr className="p-6 text-gray-900 font-bold" style={{fontSize: "30px"}}>
                                <td>Total Amount:</td>
                                <td style={{textAlign: "right"}}>UGX {data['totalAmount']}</td>
                            </tr>
                            <tr className="p-6 text-gray-900 font-bold" style={{fontSize: "30px"}}>
                                <td>Percentage (Out of Cash):</td>
                                <td style={{textAlign: "right"}}>{data['percentage']}%</td>
                            </tr>
                            <tr className="p-6 text-gray-900 font-bold" style={{fontSize: "30px"}}>
                                <td>Remaining:</td>
                                <td style={{textAlign: "right"}}>UGX {data['remaining']}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <br/>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-6" >
                        {/*<p  style={{fontSize: "40px"}}>Contributors</p>*/}
                        <table className="px-6 py-8 border" width="100%"  style={{fontSize: "25px"}}>
                            <thead>
                                <th style={{textAlign: "left"}} className="border">Name</th>
                                <th style={{textAlign: "right"}} className="border">Amount</th>
                                <th style={{textAlign: "right"}} className="border">Pledge</th>
                                <th style={{textAlign: "right"}} className="border">Total</th>
                            </thead>
                            <tbody>
                            {contributors.map((person)=><tr className="p-6 text-gray-900 font-bold">
                                <td className="border px-2">{person.name}</td>
                                <td style={{textAlign: "right"}}  className="border px-2">{parseInt(person.amount).toLocaleString()}</td>
                                <td style={{textAlign: "right"}}  className="border px-2">{parseInt(person.pledge).toLocaleString()}</td>
                                <td style={{textAlign: "right"}} className="border px-2">{parseInt(person.pledge+person.amount).toLocaleString()}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>

                <br/>
                <br/>
                <br/>
            </div>
        </AuthenticatedLayout>
    );
}
