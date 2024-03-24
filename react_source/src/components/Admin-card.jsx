import React, { useState, useEffect } from 'react';
import './card.css'; // Import CSS file

export const Admincards = () => {
    const [userArray, setUserArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin', { mode: 'cors' });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                console.log('Data fetched successfully:', jsonData);
                setUserArray(jsonData); // Set fetched data to state
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData(); // Fetch data on component mount
    }, []);

    return (
        <div>
            {userArray.map(user => (
                user.resolved ? (
                    <div class="container-wrapper">
                        <div class="container container-green">
                            <div class="container1">
                                <div class="div div1 input">
                                    <p>{user.userName}</p>
                                </div>
                                <div class="div div2 input">
                                    <p>{user.phoneNumber}</p>
                                </div>
                                <div class="div div3 input">
                                    <p>{user.query}</p>
                                </div>
                                <div class="div div4 input">
                                    <p>{user.timePreferred}</p>
                                </div>
                                <div class="div div5 clickable"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div class="container-wrapper">
                        <div class="container container-red">
                            <div class="container1">
                                <div class="div div1 input">
                                    <p>{user.userName}</p>
                                </div>
                                <div class="div div2 input">
                                    <p>{user.phoneNumber}</p>
                                </div>
                                <div class="div div3 input">
                                    <p>{user.query}</p>
                                </div>
                                <div class="div div4 input">
                                    <p>{user.timePreferred}</p>
                                </div>
                                <div class="div div5 clickable"></div>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};
