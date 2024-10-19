<!DOCTYPE html>
<html lang="en">
<?php
    $title = 'Sign Up';
    $dashboard_page = 'active';
    require_once('./include/head.php');
?>
<body style="height: 100vh; width: 100vw; display: flex; justify-content:center; align-items:center;">
    <div>
        <div class="text-center"><img src="../img/logobluee.png" height="100" width="100" alt=""></div>
        <div class="text-center">Sign in to your account</div><br>
        <form action="">
            <div class="mb-2 " style="font-size: 12px;">
                <label for="firstname" class="form-label">First name</label>
                <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Enter firstname" style="font-size: 10px;">
            </div>
            <div class="mtb-2" style="font-size: 12px;">
                <label for="middlename" class="form-label">Middle name <i>(Optional)</i></label>
                <input type="text" class="form-control" id="middlename" name="middlename" placeholder="Enter middlename" style="font-size: 10px;">
            </div>
            <div class="mb-2" style="font-size: 12px;">
                <label for="suffix" class="form-label">Suffix <i>(Optional)</i></label>
                <input type="text" class="form-control" id="suffix" name="suffix" placeholder="Enter suffix" style="font-size: 10px;">
            </div>
            <div class="mb-2" style="font-size: 12px;">
                <label for="lastname" class="form-label">Last name</label>
                <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Enter lastname" style="font-size: 10px;">
            </div>
            <div class="mb-2" style="font-size: 12px;">
                <label for="bday"  class="form-label">Birth Date:</label>
                <input type="date" class="form-control" id="bday" name="bday" style="font-size: 10px;">
            </div>
            <div class="form-group mb-2" style="font-size: 12px;">
                <label class="form-label">Sex:</label>
                <div class="d-flex justify-content-center">
                    <div class="form-check px-3 ms-3">
                        <input type="radio" class="form-check-input" id="male" name="sex" value="male">
                        <label class="form-check-label" for="male" style="font-size: 10px;">Male</label>
                    </div>
                    <div class="form-check px-3 ms-3">
                        <input type="radio" class="form-check-input" id="female" name="sex" value="female">
                        <label class="form-check-label" for="female" style="font-size: 10px;">Female</label>
                    </div>
                </div>
            </div>

            <div class="mb-2" style="font-size: 12px;">
                <label for="address" class="form-label">Address</label>
                <select name="province" id="province" class="form-select mb-2" style="font-size: 10px;">
                    <option value="">Select Province</option>
                    <option value="delsur">Zamboanga Del Sur</option>
                    <option value="delnorte">Zamboanga Del Norte</option>
                    <option value="sibugay">Zamboanga Sibugay</option>
                </select>
                <select name="city" id="city" class="form-select mb-2" style="font-size: 10px;">
                    <option value="">Select City</option>
                    <option value="zambocity">Zamboanga City</option>
                    <option value="pagadiancity">Pagadian City</option>
                </select>
                <select name="barangay" id="barangay" class="form-select mb-2" style="font-size: 10px;">
                    <option value="">Select Barangay</option>
                    <option value="ayala">Ayala</option>
                    <option value="baliwasan">Baliwasan</option>
                </select>
                <input type="text" class="form-control" id="address" name="address" placeholder="Enter Zip code" style="font-size: 10px;">
            </div>
            <div class="mb-2" style="font-size: 12px;">
                <label for="contact" class="form-label">Contact</label>
                <input type="text" class="form-control" id="contact" name="contact" placeholder="Enter contact no." style="font-size: 10px;">
            </div>
            <div class="mb-2" style="font-size: 12px;">
                <label for="email" class="form-label">Email <i>(Optional)</i></label>
                <input type="text" class="form-control" id="email" name="email" placeholder="Enter email" style="font-size: 10px;">
            </div>
            <div class="mb-2" style="font-size: 12px;">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Enter password" style="font-size: 10px;">
            </div>
            <div class="mb-2" style="font-size: 12px;">
                <label for="confirmpassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmpassword" name="confirmpassword" placeholder="Reconfirm password" style="font-size: 10px;">
            </div><br>

            <button style="background-color: #1363DF;color: White; font-size: 12px; border: none; border-radius: 3px; margin-bottom: 5px; padding: 10px 0; text-align: center; width: 200px;" type="submit">Sign up</button>
            <div><button style="background-color: #E8E8E8; color: grey; font-size: 12px; border: none; border-radius: 3px; padding: 10px 0; text-align: center; width: 200px;" type="submit">Cancel</button></div>
        </form>
        <br><div class="text-center" style="font-size: 12px;">Or sign up with</div><br>
        <div class="text-center" style="font-size: 12px; border: 0.1px groove; padding: 3px; margin-bottom: 10px;"><img src="../img/googleicon.jpg" height="25" width="25" alt=""> Sign in with google</div>
        <div class="text-center" style="font-size: 12px; border: 0.1px groove; padding: 3px;"><img src="../img/fbicon.png" height="25" width="25" alt=""> Sign in with Facebook</div><br>
        <div class="text-center" style="font-size: 12px;">Already have an account? <a href="#" style="font-size: 10px; color: black;">Sign In</a></div>
    </div>
</body>
</html>