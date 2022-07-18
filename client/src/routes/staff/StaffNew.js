import { Link } from 'react-router-dom';

function StaffNew() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/staff">{"<-"} Staff</Link>
                <h1>Staff Registration</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit} >
                    <p>Staff ID: 3</p>
                    <fieldset> <legend>Demographics</legend>
                        <p>
                            <label htmlFor="fname">First name
                                <input type="text" id="fname" name="first_name" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="fname">Last name
                                <input type="text" id="lname" name="last_name" />
                            </label>
                        </p>
                    </fieldset>
                    <fieldset> <legend>Contact Info</legend>
                        <p>
                            <label htmlFor="phone">
                                Phone number
                                <input type="tel" name="phone_number" id="phone" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="email">
                                Email
                                <input type="email" id="email" name="email" />
                            </label>
                        </p>
                        <fieldset> <legend>Address</legend>
                            <p>
                                <label htmlFor="addr1">
                                    Address Field 1
                                    <input type="text" id="addr1" autoComplete="address-line1" name="address_1" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="addr2">
                                    Address Field 2
                                    <input type="text" id="addr2" autoComplete="address-line2" name="address_2" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="city">
                                    City
                                    <input type="text" id="city" autoComplete="address-level2" name="city" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="state">
                                    State/Province
                                    <input type="text" id="state" autoComplete="address-level1" name="state" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="post">
                                    Postal Code
                                    <input type="text" id="post" autoComplete="postal-code" name="postal_code" />
                                </label>
                            </p>
                        </fieldset>
                    </fieldset>
                    <input type="submit" />
                </form>
            </main>
        </>
    )
}

export default StaffNew;