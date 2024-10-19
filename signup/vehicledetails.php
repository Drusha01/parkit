<!DOCTYPE html>
<html lang="en">
<?php
    $title = 'Vehicle Information';
    $dashboard_page = 'active';
    require_once('./include/head.php');
?>
<body style="height: 100vh; width: 100vw; display: flex; justify-content:center; align-items:center;"> Renter
    <div>
        <div class="text-center"><img src="../img/logobluee.png" height="100" width="100" alt=""></div>
        <div class="text-center">Fill out vehicle details</div><br>
        <form action="">
        <div class="mb-2" style="font-size: 12px;">
            <label for="vehicletype" class="form-label">Vehicle Type:</label>
            <select name="vehicletype" id="vehicletype" class="form-select mb-2" style="font-size: 10px;" >
                <option value="">Select Vehicle Type</option>
                <option value="ootorcycle">Motorcycle</option>
                <option value="tricycle">Tricycle</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
                <option value="bus">Bus</option>
                <option value="lightcommercialvehicle">Light Commercial Vehicle</option>
            </select>
        </div>
        <div class="mb-2" style="font-size: 12px;">
            <label for="plateno" class="form-label">Plate Number:</label>
            <input type="text" class="form-control" id="plateno" name="plateno" placeholder="Enter vehicle plate no." style="font-size: 10px;">
        </div>
        <div class="mb-2" style="font-size: 12px;">Vehicle description:
            <label for="model" class="form-label"  style="font-size: 10px;">Model</label>
            <input type="text" class="form-control mb-2" id="model" name="model" placeholder="Enter vehicle model" style="font-size: 10px;">
            <label for="engine" class="form-label"  style="font-size: 10px;">Engine</label>
            <input type="text" class="form-control" id="engine" name="engine" placeholder="Enter vehicle engine" style="font-size: 10px;">
            <label for="transmission" class="form-label"  style="font-size: 10px;">Transmission</label>
            <input type="text" class="form-control" id="transmission" name="transmission" placeholder="Enter vehicle transmission" style="font-size: 10px;">
        </div>    

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