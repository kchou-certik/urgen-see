import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

function StaffUpdate() {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <h1>Update Staff</h1>
                <section>
                    <p>
                        <h2>Doolittle, John, MD</h2>
                        <em>Last Name, First Name, Title</em>
                    </p>
                    <p>
                        <strong>Staff ID: 1</strong>
                    </p>
                    <p>
                        <h2><em>[SAMPLE DATA]</em></h2>
                    </p>
                </section>
            </header>
            <main>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Demographics</legend>
                        <p>
                            <label htmlFor="fname">First name
                                <input type="text" id="fname" name="first_name" placeholder="John" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="fname">Last name
                                <input type="text" id="lname" name="last_name" placeholder="Doolittle" />
                            </label>
                        </p>
                    </fieldset>
                    <fieldset> <legend>Contact Info</legend>
                        <p>
                            <label htmlFor="phone">
                                Phone number
                                <input type="tel" name="phone_number" id="phone" placeholder="123-456-7890" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="email">
                                Email
                                <input type="email" id="email" name="email" placeholder='john@john.com' />
                            </label>
                        </p>
                        <fieldset> <legend>Address</legend>
                            <p>
                                <label htmlFor="addr1">
                                    Address Field 1
                                    <input type="text" id="addr1" autoComplete="address-line1" name="address_1" placeholder='111 1st Ave' />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="addr2">
                                    Address Field 2
                                    <input type="text" id="addr2" autoComplete="address-line2" name="address_2" placeholder='Apt 1A' />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="city">
                                    City
                                    <input type="text" id="city" autoComplete="address-level2" name="city" placeholder='New York City' />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="state">
                                    State/Province
                                    <input type="text" id="state" autoComplete="address-level1" name="state" placeholder='NY' />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="post">
                                    Postal Code
                                    <input type="text" id="post" autoComplete="postal-code" name="postal_code" placeholder='10013' />
                                </label>
                            </p>
                        </fieldset>
                    </fieldset>
                    <input type="submit" />
                </form>
                <p>
                    <Button variant="outlined" color="warning" component={Link} to="#">Delete Staff</Button>
                </p>
            </main>
        </>
    )
}

export default StaffUpdate;